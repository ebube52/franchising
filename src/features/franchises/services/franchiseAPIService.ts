import { Franchise, FranchiseMatchRequest } from '../types/franchise';
import { franchiseAPIEndpoints } from '../franchiseData';

// API Response interfaces for different providers
interface CFAFranchise {
  id: string;
  franchiseName: string;
  category: string;
  minInvestment: number;
  maxInvestment: number;
  regions: string[];
  description: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  established: number;
  territories: number;
  franchiseFee: number;
  royaltyRate: string;
  logoUrl?: string;
}

interface BeTheBossFranchise {
  franchiseId: string;
  name: string;
  industry: string;
  investmentRange: {
    min: number;
    max: number;
  };
  availableRegions: string[];
  summary: string;
  contactInfo: {
    website: string;
    email: string;
    phone: string;
  };
  businessDetails: {
    established: number;
    locations: number;
    franchiseFee: number;
    royalty: string;
  };
  imageUrl?: string;
}

interface FranchiseDirectOpportunity {
  id: string;
  brandName: string;
  sector: string;
  capitalRequired: {
    minimum: number;
    maximum: number;
  };
  territories: string[];
  overview: string;
  webUrl: string;
  contact: {
    email: string;
    telephone: string;
  };
  companyInfo: {
    yearEstablished: number;
    unitCount: number;
    initialFee: number;
    ongoingFee: string;
  };
  brandLogo?: string;
}

// Normalization functions to convert API responses to our Franchise interface
const normalizeCFAFranchise = (cfaFranchise: CFAFranchise): Franchise => {
  return {
    id: `cfa-${cfaFranchise.id}`,
    name: cfaFranchise.franchiseName,
    brand: cfaFranchise.franchiseName,
    industry: mapIndustryFromCFA(cfaFranchise.category),
    investmentMin: cfaFranchise.minInvestment,
    investmentMax: cfaFranchise.maxInvestment,
    region: cfaFranchise.regions,
    description: cfaFranchise.description,
    image: cfaFranchise.logoUrl || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    businessModel: 'Franchise',
    supportProvided: ['Training', 'Marketing', 'Operations'],
    franchiseFee: cfaFranchise.franchiseFee,
    royaltyFee: cfaFranchise.royaltyRate,
    territories: cfaFranchise.territories,
    established: cfaFranchise.established,
    website: cfaFranchise.website,
    contactInfo: {
      phone: cfaFranchise.contactPhone,
      email: cfaFranchise.contactEmail
    },
    requirements: {
      liquidCapital: Math.round(cfaFranchise.minInvestment * 0.6),
      netWorth: Math.round(cfaFranchise.minInvestment * 1.5),
      experience: 'Business experience preferred'
    }
  };
};

const normalizeBeTheBossFranchise = (btbFranchise: BeTheBossFranchise): Franchise => {
  return {
    id: `btb-${btbFranchise.franchiseId}`,
    name: btbFranchise.name,
    brand: btbFranchise.name,
    industry: mapIndustryFromBeTheBoss(btbFranchise.industry),
    investmentMin: btbFranchise.investmentRange.min,
    investmentMax: btbFranchise.investmentRange.max,
    region: btbFranchise.availableRegions,
    description: btbFranchise.summary,
    image: btbFranchise.imageUrl || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    businessModel: 'Franchise',
    supportProvided: ['Training', 'Marketing', 'Operations'],
    franchiseFee: btbFranchise.businessDetails.franchiseFee,
    royaltyFee: btbFranchise.businessDetails.royalty,
    territories: btbFranchise.businessDetails.locations,
    established: btbFranchise.businessDetails.established,
    website: btbFranchise.contactInfo.website,
    contactInfo: {
      phone: btbFranchise.contactInfo.phone,
      email: btbFranchise.contactInfo.email
    },
    requirements: {
      liquidCapital: Math.round(btbFranchise.investmentRange.min * 0.6),
      netWorth: Math.round(btbFranchise.investmentRange.min * 1.5),
      experience: 'Business experience preferred'
    }
  };
};

const normalizeFranchiseDirectOpportunity = (fdOpportunity: FranchiseDirectOpportunity): Franchise => {
  return {
    id: `fd-${fdOpportunity.id}`,
    name: fdOpportunity.brandName,
    brand: fdOpportunity.brandName,
    industry: mapIndustryFromFranchiseDirect(fdOpportunity.sector),
    investmentMin: fdOpportunity.capitalRequired.minimum,
    investmentMax: fdOpportunity.capitalRequired.maximum,
    region: fdOpportunity.territories,
    description: fdOpportunity.overview,
    image: fdOpportunity.brandLogo || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    businessModel: 'Franchise',
    supportProvided: ['Training', 'Marketing', 'Operations'],
    franchiseFee: fdOpportunity.companyInfo.initialFee,
    royaltyFee: fdOpportunity.companyInfo.ongoingFee,
    territories: fdOpportunity.companyInfo.unitCount,
    established: fdOpportunity.companyInfo.yearEstablished,
    website: fdOpportunity.webUrl,
    contactInfo: {
      phone: fdOpportunity.contact.telephone,
      email: fdOpportunity.contact.email
    },
    requirements: {
      liquidCapital: Math.round(fdOpportunity.capitalRequired.minimum * 0.6),
      netWorth: Math.round(fdOpportunity.capitalRequired.minimum * 1.5),
      experience: 'Business experience preferred'
    }
  };
};

// Industry mapping functions
const mapIndustryFromCFA = (cfaCategory: string): string => {
  const industryMap: Record<string, string> = {
    'food-beverage': 'Food & Beverage',
    'business-services': 'Business Services',
    'health-senior-care': 'Health & Senior Care',
    'real-estate': 'Real Estate',
    'education': 'Education',
    'retail': 'Retail',
    'automotive': 'Automotive'
  };
  return industryMap[cfaCategory] || 'Business Services';
};

const mapIndustryFromBeTheBoss = (btbIndustry: string): string => {
  const industryMap: Record<string, string> = {
    'Food and Beverage': 'Food & Beverage',
    'Business Services': 'Business Services',
    'Healthcare': 'Health & Senior Care',
    'Real Estate': 'Real Estate',
    'Education and Training': 'Education',
    'Retail': 'Retail',
    'Automotive': 'Automotive'
  };
  return industryMap[btbIndustry] || 'Business Services';
};

const mapIndustryFromFranchiseDirect = (fdSector: string): string => {
  const industryMap: Record<string, string> = {
    'food-service': 'Food & Beverage',
    'business-services': 'Business Services',
    'health-care': 'Health & Senior Care',
    'property': 'Real Estate',
    'education': 'Education',
    'retail-sales': 'Retail',
    'automotive': 'Automotive'
  };
  return industryMap[fdSector] || 'Business Services';
};

// Main API service class
export class FranchiseAPIService {
  private static instance: FranchiseAPIService;
  
  public static getInstance(): FranchiseAPIService {
    if (!FranchiseAPIService.instance) {
      FranchiseAPIService.instance = new FranchiseAPIService();
    }
    return FranchiseAPIService.instance;
  }

  // Fetch franchises from Canadian Franchise Association
  async fetchFromCFA(criteria: FranchiseMatchRequest): Promise<Franchise[]> {
    try {
      if (!franchiseAPIEndpoints.cfa.apiKey) {
        console.warn('CFA API key not configured');
        return [];
      }

      const response = await fetch(`${franchiseAPIEndpoints.cfa.baseUrl}${franchiseAPIEndpoints.cfa.endpoints.search}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${franchiseAPIEndpoints.cfa.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          category: this.mapIndustryToCFA(criteria.industry),
          minInvestment: this.getInvestmentMin(criteria.investmentRange),
          maxInvestment: this.getInvestmentMax(criteria.investmentRange),
          regions: [criteria.region],
          limit: 10
        })
      });

      if (!response.ok) {
        throw new Error(`CFA API error: ${response.status}`);
      }

      const data = await response.json();
      return data.franchises?.map(normalizeCFAFranchise) || [];
    } catch (error) {
      console.error('Error fetching from CFA API:', error);
      return [];
    }
  }

  // Fetch franchises from BeTheBoss.ca
  async fetchFromBeTheBoss(criteria: FranchiseMatchRequest): Promise<Franchise[]> {
    try {
      if (!franchiseAPIEndpoints.beTheBoss.apiKey) {
        console.warn('BeTheBoss API key not configured');
        return [];
      }

      const response = await fetch(`${franchiseAPIEndpoints.beTheBoss.baseUrl}${franchiseAPIEndpoints.beTheBoss.endpoints.search}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${franchiseAPIEndpoints.beTheBoss.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          industry: criteria.industry,
          investmentMin: this.getInvestmentMin(criteria.investmentRange),
          investmentMax: this.getInvestmentMax(criteria.investmentRange),
          region: criteria.region,
          businessModel: criteria.lifestyle,
          limit: 10
        })
      });

      if (!response.ok) {
        throw new Error(`BeTheBoss API error: ${response.status}`);
      }

      const data = await response.json();
      return data.results?.map(normalizeBeTheBossFranchise) || [];
    } catch (error) {
      console.error('Error fetching from BeTheBoss API:', error);
      return [];
    }
  }

  // Fetch franchises from FranchiseDirect Canada
  async fetchFromFranchiseDirect(criteria: FranchiseMatchRequest): Promise<Franchise[]> {
    try {
      if (!franchiseAPIEndpoints.franchiseDirect.apiKey) {
        console.warn('FranchiseDirect API key not configured');
        return [];
      }

      const response = await fetch(`${franchiseAPIEndpoints.franchiseDirect.baseUrl}${franchiseAPIEndpoints.franchiseDirect.endpoints.search}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${franchiseAPIEndpoints.franchiseDirect.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sector: this.mapIndustryToFranchiseDirect(criteria.industry),
          capitalMin: this.getInvestmentMin(criteria.investmentRange),
          capitalMax: this.getInvestmentMax(criteria.investmentRange),
          territories: [criteria.region],
          limit: 10
        })
      });

      if (!response.ok) {
        throw new Error(`FranchiseDirect API error: ${response.status}`);
      }

      const data = await response.json();
      return data.opportunities?.map(normalizeFranchiseDirectOpportunity) || [];
    } catch (error) {
      console.error('Error fetching from FranchiseDirect API:', error);
      return [];
    }
  }

  // Aggregate search across all APIs
  async searchAllAPIs(criteria: FranchiseMatchRequest): Promise<Franchise[]> {
    const promises = [
      this.fetchFromCFA(criteria),
      this.fetchFromBeTheBoss(criteria),
      this.fetchFromFranchiseDirect(criteria)
    ];

    try {
      const results = await Promise.allSettled(promises);
      const allFranchises: Franchise[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allFranchises.push(...result.value);
        } else {
          console.error(`API ${index} failed:`, result.reason);
        }
      });

      // Remove duplicates based on name and website
      const uniqueFranchises = this.removeDuplicates(allFranchises);
      
      // Sort by relevance (you can implement scoring here)
      return this.sortByRelevance(uniqueFranchises, criteria);
    } catch (error) {
      console.error('Error in searchAllAPIs:', error);
      return [];
    }
  }

  // Helper methods
  private mapIndustryToCFA(industry: string): string {
    const industryMap: Record<string, string> = {
      'Food & Beverage': 'food-beverage',
      'Business Services': 'business-services',
      'Health & Senior Care': 'health-senior-care',
      'Real Estate': 'real-estate',
      'Education': 'education',
      'Retail': 'retail',
      'Automotive': 'automotive'
    };
    return industryMap[industry] || 'business-services';
  }

  private mapIndustryToFranchiseDirect(industry: string): string {
    const industryMap: Record<string, string> = {
      'Food & Beverage': 'food-service',
      'Business Services': 'business-services',
      'Health & Senior Care': 'health-care',
      'Real Estate': 'property',
      'Education': 'education',
      'Retail': 'retail-sales',
      'Automotive': 'automotive'
    };
    return industryMap[industry] || 'business-services';
  }

  private getInvestmentMin(range: string): number {
    const ranges: Record<string, number> = {
      '$5k - $25k': 5000,
      '$25k - $100k': 25000,
      '$100k+': 100000
    };
    return ranges[range] || 0;
  }

  private getInvestmentMax(range: string): number {
    const ranges: Record<string, number> = {
      '$5k - $25k': 25000,
      '$25k - $100k': 100000,
      '$100k+': 10000000
    };
    return ranges[range] || 10000000;
  }

  private removeDuplicates(franchises: Franchise[]): Franchise[] {
    const seen = new Set<string>();
    return franchises.filter(franchise => {
      const key = `${franchise.name.toLowerCase()}-${franchise.website}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private sortByRelevance(franchises: Franchise[], criteria: FranchiseMatchRequest): Franchise[] {
    return franchises.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Industry match (40% weight)
      if (criteria.industry === 'Any Industry' || a.industry === criteria.industry) scoreA += 40;
      if (criteria.industry === 'Any Industry' || b.industry === criteria.industry) scoreB += 40;

      // Region match (30% weight) - Ontario priority
      if (a.region.includes(criteria.region)) {
        scoreA += 30;
        if (criteria.region === 'Ontario') scoreA += 5;
      } else if (a.region.includes('Canada-Wide')) {
        scoreA += 25;
      }

      if (b.region.includes(criteria.region)) {
        scoreB += 30;
        if (criteria.region === 'Ontario') scoreB += 5;
      } else if (b.region.includes('Canada-Wide')) {
        scoreB += 25;
      }

      return scoreB - scoreA;
    });
  }
}

// Export singleton instance
export const franchiseAPIService = FranchiseAPIService.getInstance();