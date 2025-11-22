import { Franchise, FranchiseMatchRequest } from '../types/franchise';
import { franchiseCacheService } from './franchiseCacheService';
import { canadianFranchiseAPI } from './canadianFranchiseAPI';
import { allCanadianFranchises } from '../franchiseData';

export class FranchiseDataService {
  private static instance: FranchiseDataService;
  private isInitialized = false;

  public static getInstance(): FranchiseDataService {
    if (!FranchiseDataService.instance) {
      FranchiseDataService.instance = new FranchiseDataService();
    }
    return FranchiseDataService.instance;
  }

  async getMatchingFranchises(criteria: FranchiseMatchRequest): Promise<Franchise[]> {
    const investmentRange = this.parseInvestmentRange(criteria.investmentRange);

    try {
      console.log('🔍 Searching for franchises with criteria:', criteria);

      let franchises: Franchise[] = [];

      const cachedFranchises = await franchiseCacheService.getFranchises({
        industry: criteria.industry !== 'Any Industry' ? criteria.industry : undefined,
        investmentMin: investmentRange.min,
        investmentMax: investmentRange.max,
        region: criteria.region !== 'Canada-Wide' ? criteria.region : undefined,
        limit: 20
      });

      if (cachedFranchises.length > 0) {
        console.log(`✅ Found ${cachedFranchises.length} franchises from cache`);
        franchises = cachedFranchises;
      } else {
        console.log('⚠️ No cached data, trying APIs...');

        const apiFranchises = await canadianFranchiseAPI.searchAllAPIs({
          industry: criteria.industry !== 'Any Industry' ? criteria.industry : undefined,
          investmentMin: investmentRange.min,
          investmentMax: investmentRange.max,
          region: criteria.region !== 'Canada-Wide' ? criteria.region : undefined,
          limit: 20
        });

        if (apiFranchises.length > 0) {
          console.log(`✅ Found ${apiFranchises.length} franchises from APIs`);
          franchises = apiFranchises;

          await franchiseCacheService.saveFranchises(franchises, 'api').catch(err => {
            console.warn('Failed to cache API results:', err);
          });
        } else {
          console.log('⚠️ No API data, using local fallback...');
          franchises = this.filterLocalFranchises(criteria);
          console.log(`✅ Using ${franchises.length} franchises from local data`);
        }
      }

      const sortedFranchises = this.sortByRelevance(franchises, criteria);
      return sortedFranchises.slice(0, 9);
    } catch (error) {
      console.error('Error fetching franchises, falling back to local data:', error);
      return this.filterLocalFranchises(criteria);
    }
  }

  async initializeCache(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      const cachedFranchises = await franchiseCacheService.getFranchises({ limit: 1 });

      if (cachedFranchises.length === 0) {
        console.log('🔄 Cache is empty, syncing local data...');
        await franchiseCacheService.saveFranchises(allCanadianFranchises, 'local');
        console.log('✅ Local data synced to cache');
      } else {
        console.log('✅ Cache already initialized with data');
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize cache:', error);
    }
  }

  private filterLocalFranchises(criteria: FranchiseMatchRequest): Franchise[] {
    let matches = [...allCanadianFranchises];

    if (criteria.industry && criteria.industry !== 'Any Industry') {
      matches = matches.filter(franchise =>
        franchise.industry === criteria.industry ||
        franchise.industry.toLowerCase().includes(criteria.industry.toLowerCase())
      );
    }

    if (criteria.investmentRange) {
      const { min, max } = this.parseInvestmentRange(criteria.investmentRange);
      matches = matches.filter(franchise =>
        franchise.investmentMax >= min && franchise.investmentMin <= max
      );
    }

    if (criteria.region && criteria.region !== 'Canada-Wide') {
      matches = matches.filter(franchise =>
        franchise.region.includes(criteria.region) || franchise.region.includes('Canada-Wide')
      );
    }

    if (criteria.lifestyle) {
      matches = matches.filter(franchise => {
        const businessModel = franchise.businessModel.toLowerCase();
        switch (criteria.lifestyle) {
          case 'Work from Home':
            return businessModel.includes('service') ||
                   businessModel.includes('mobile') ||
                   franchise.industry === 'Business Services' ||
                   franchise.industry === 'Education';
          case 'Retail Storefront':
            return businessModel.includes('retail') ||
                   businessModel.includes('restaurant') ||
                   businessModel.includes('store');
          case 'Service-Based':
            return businessModel.includes('service');
          case 'B2B Operations':
            return businessModel.includes('b2b') ||
                   franchise.industry.includes('Business Services');
          default:
            return true;
        }
      });
    }

    if (matches.length === 0) {
      if (criteria.industry === 'Education') {
        matches = allCanadianFranchises.filter(f => f.industry === 'Education');
      } else if (criteria.industry === 'Business Services') {
        matches = allCanadianFranchises.filter(f => f.industry === 'Business Services');
      } else {
        matches = allCanadianFranchises.slice(0, 6);
      }
    }

    const sortedMatches = this.sortByRelevance(matches, criteria);
    return sortedMatches.slice(0, 9);
  }

  private parseInvestmentRange(range: string): { min: number; max: number } {
    switch (range) {
      case '$5k - $25k':
        return { min: 5000, max: 25000 };
      case '$25k - $100k':
        return { min: 25000, max: 100000 };
      case '$100k - $500k':
        return { min: 100000, max: 500000 };
      case '$100k+':
        return { min: 100000, max: 10000000 };
      case '$500k+':
        return { min: 500000, max: 10000000 };
      default:
        return { min: 0, max: 10000000 };
    }
  }

  private sortByRelevance(franchises: Franchise[], criteria: FranchiseMatchRequest): Franchise[] {
    return franchises.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (criteria.industry && criteria.industry !== 'Any Industry') {
        if (a.industry.toLowerCase().includes(criteria.industry.toLowerCase())) scoreA += 40;
        if (b.industry.toLowerCase().includes(criteria.industry.toLowerCase())) scoreB += 40;
      }

      if (criteria.investmentRange) {
        const { min, max } = this.parseInvestmentRange(criteria.investmentRange);
        const aInRange = a.investmentMax >= min && a.investmentMin <= max;
        const bInRange = b.investmentMax >= min && b.investmentMin <= max;
        if (aInRange) scoreA += 30;
        if (bInRange) scoreB += 30;
      }

      if (criteria.region) {
        if (a.region.includes(criteria.region)) {
          scoreA += 20;
          if (criteria.region === 'Ontario') scoreA += 5;
        } else if (a.region.includes('Canada-Wide')) {
          scoreA += 15;
        }

        if (b.region.includes(criteria.region)) {
          scoreB += 20;
          if (criteria.region === 'Ontario') scoreB += 5;
        } else if (b.region.includes('Canada-Wide')) {
          scoreB += 15;
        }
      }

      return scoreB - scoreA;
    });
  }
}

export const franchiseDataService = FranchiseDataService.getInstance();

export const getMatchingFranchises = async (criteria: FranchiseMatchRequest): Promise<Franchise[]> => {
  return await franchiseDataService.getMatchingFranchises(criteria);
};
