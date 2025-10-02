// Canadian Franchise API Integration Service
import { Franchise } from '../types/franchise';

// API Configuration for Canadian Franchise Providers
export const canadianFranchiseAPIs = {
  // Canadian Franchise Association - Official API
  cfa: {
    name: 'Canadian Franchise Association',
    baseUrl: 'https://api.cfa.ca/v1',
    apiKey: import.meta.env.VITE_CFA_API_KEY,
    endpoints: {
      search: '/franchises/search',
      details: '/franchises/{id}',
      categories: '/categories',
      provinces: '/locations/provinces'
    },
    rateLimit: 100, // requests per hour
    documentation: 'https://www.cfa.ca/api-docs'
  },

  // Franchise Canada Directory
  franchiseCanada: {
    name: 'Franchise Canada Directory',
    baseUrl: 'https://api.franchisecanada.online/v1',
    apiKey: import.meta.env.VITE_FRANCHISE_CANADA_API_KEY,
    endpoints: {
      opportunities: '/opportunities',
      search: '/search',
      provinces: '/locations/provinces',
      industries: '/industries'
    },
    rateLimit: 200,
    documentation: 'https://franchisecanada.online/api'
  },

  // BeTheBoss.ca - Canadian Franchise Portal
  beTheBoss: {
    name: 'BeTheBoss.ca',
    baseUrl: 'https://api.betheboss.ca/v2',
    apiKey: import.meta.env.VITE_BETHEBOSS_API_KEY,
    endpoints: {
      franchises: '/franchises',
      search: '/search',
      categories: '/categories',
      locations: '/locations'
    },
    rateLimit: 150,
    documentation: 'https://www.betheboss.ca/api-docs'
  },

  // FranchiseDirect Canada
  franchiseDirect: {
    name: 'FranchiseDirect Canada',
    baseUrl: 'https://api.franchisedirect.ca/v1',
    apiKey: import.meta.env.VITE_FRANCHISEDIRECT_API_KEY,
    endpoints: {
      opportunities: '/opportunities',
      search: '/search',
      details: '/opportunities/{id}',
      provinces: '/provinces'
    },
    rateLimit: 100,
    documentation: 'https://www.franchisedirect.ca/api'
  },

  // FranchiseGlobal Canada Section
  franchiseGlobal: {
    name: 'FranchiseGlobal Canada',
    baseUrl: 'https://api.franchiseglobal.com/canada/v1',
    apiKey: import.meta.env.VITE_FRANCHISEGLOBAL_API_KEY,
    endpoints: {
      franchises: '/franchises',
      search: '/search',
      industries: '/industries',
      regions: '/regions'
    },
    rateLimit: 120,
    documentation: 'https://www.franchiseglobal.com/api'
  },

  // BizBuySell Canada - Franchise Section
  bizBuySell: {
    name: 'BizBuySell Canada',
    baseUrl: 'https://api.bizbuysell.ca/v1',
    apiKey: import.meta.env.VITE_BIZBUYSELL_API_KEY,
    endpoints: {
      franchises: '/franchises',
      search: '/search',
      categories: '/categories',
      locations: '/locations'
    },
    rateLimit: 80,
    documentation: 'https://www.bizbuysell.ca/api'
  }
};

// API Response Interfaces
interface CFAFranchiseResponse {
  id: string;
  franchiseName: string;
  brandName: string;
  category: string;
  minInvestment: number;
  maxInvestment: number;
  franchiseFee: number;
  royaltyRate: string;
  regions: string[];
  description: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  established: number;
  territories: number;
  logoUrl?: string;
  imageUrl?: string;
  supportProvided: string[];
  businessModel: string;
  requirements: {
    liquidCapital: number;
    netWorth: number;
    experience: string;
  };
}

interface BeTheBossResponse {
  franchiseId: string;
  name: string;
  brand: string;
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
  supportOffered: string[];
}

interface FranchiseCanadaResponse {
  id: string;
  title: string;
  company: string;
  sector: string;
  capitalRequired: {
    minimum: number;
    maximum: number;
  };
  provinces: string[];
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
  gallery?: string[];
}

// Data Normalization Functions
export const normalizeCFAFranchise = (data: CFAFranchiseResponse): Franchise => ({
  id: `cfa-${data.id}`,
  name: data.franchiseName,
  brand: data.brandName,
  industry: mapIndustryCategory(data.category),
  investmentMin: data.minInvestment,
  investmentMax: data.maxInvestment,
  region: data.regions,
  description: data.description,
  image: data.imageUrl || data.logoUrl || getDefaultFranchiseImage(data.category),
  businessModel: data.businessModel,
  supportProvided: data.supportProvided,
  franchiseFee: data.franchiseFee,
  royaltyFee: data.royaltyRate,
  territories: data.territories,
  established: data.established,
  website: data.website,
  contactInfo: {
    phone: data.contactPhone,
    email: data.contactEmail
  },
  requirements: data.requirements
});

export const normalizeBeTheBoss = (data: BeTheBossResponse): Franchise => ({
  id: `btb-${data.franchiseId}`,
  name: data.name,
  brand: data.brand,
  industry: mapIndustryCategory(data.industry),
  investmentMin: data.investmentRange.min,
  investmentMax: data.investmentRange.max,
  region: data.availableRegions,
  description: data.summary,
  image: data.imageUrl || getDefaultFranchiseImage(data.industry),
  businessModel: 'Franchise',
  supportProvided: data.supportOffered,
  franchiseFee: data.businessDetails.franchiseFee,
  royaltyFee: data.businessDetails.royalty,
  territories: data.businessDetails.locations,
  established: data.businessDetails.established,
  website: data.contactInfo.website,
  contactInfo: {
    phone: data.contactInfo.phone,
    email: data.contactInfo.email
  },
  requirements: {
    liquidCapital: Math.round(data.investmentRange.min * 0.6),
    netWorth: Math.round(data.investmentRange.min * 1.5),
    experience: 'Business experience preferred'
  }
});

export const normalizeFranchiseCanada = (data: FranchiseCanadaResponse): Franchise => ({
  id: `fc-${data.id}`,
  name: data.title,
  brand: data.company,
  industry: mapIndustryCategory(data.sector),
  investmentMin: data.capitalRequired.minimum,
  investmentMax: data.capitalRequired.maximum,
  region: data.provinces,
  description: data.overview,
  image: data.brandLogo || (data.gallery && data.gallery[0]) || getDefaultFranchiseImage(data.sector),
  businessModel: 'Franchise',
  supportProvided: ['Training', 'Marketing', 'Operations'],
  franchiseFee: data.companyInfo.initialFee,
  royaltyFee: data.companyInfo.ongoingFee,
  territories: data.companyInfo.unitCount,
  established: data.companyInfo.yearEstablished,
  website: data.webUrl,
  contactInfo: {
    phone: data.contact.telephone,
    email: data.contact.email
  },
  requirements: {
    liquidCapital: Math.round(data.capitalRequired.minimum * 0.6),
    netWorth: Math.round(data.capitalRequired.minimum * 1.5),
    experience: 'Business experience helpful'
  }
});

// Industry Category Mapping
const mapIndustryCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    // Food & Beverage
    'food-service': 'Food & Beverage',
    'restaurant': 'Food & Beverage',
    'food-beverage': 'Food & Beverage',
    'quick-service': 'Food & Beverage',
    'coffee': 'Food & Beverage',
    
    // Business Services
    'business-services': 'Business Services',
    'cleaning': 'Business Services',
    'consulting': 'Business Services',
    'printing': 'Business Services',
    'shipping': 'Business Services',
    
    // Health & Senior Care
    'healthcare': 'Health & Senior Care',
    'senior-care': 'Health & Senior Care',
    'medical': 'Health & Senior Care',
    'wellness': 'Health & Senior Care',
    
    // Real Estate
    'real-estate': 'Real Estate',
    'property': 'Real Estate',
    'property-management': 'Real Estate',
    
    // Education
    'education': 'Education',
    'tutoring': 'Education',
    'training': 'Education',
    'childcare': 'Education',
    
    // Retail
    'retail': 'Retail',
    'convenience': 'Retail',
    'specialty-retail': 'Retail',
    
    // Automotive
    'automotive': 'Automotive',
    'auto-services': 'Automotive',
    'car-care': 'Automotive'
  };
  
  const normalized = category.toLowerCase().replace(/\s+/g, '-');
  return categoryMap[normalized] || 'Business Services';
};

// Default Images by Category
const getDefaultFranchiseImage = (category: string): string => {
  const imageMap: Record<string, string> = {
    'food-beverage': 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    'business-services': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    'healthcare': 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
    'real-estate': 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    'education': 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    'retail': 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg',
    'automotive': 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg'
  };
  
  const normalized = category.toLowerCase().replace(/\s+/g, '-');
  return imageMap[normalized] || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg';
};

// Main API Service Class
export class CanadianFranchiseAPIService {
  private static instance: CanadianFranchiseAPIService;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  public static getInstance(): CanadianFranchiseAPIService {
    if (!CanadianFranchiseAPIService.instance) {
      CanadianFranchiseAPIService.instance = new CanadianFranchiseAPIService();
    }
    return CanadianFranchiseAPIService.instance;
  }

  // Fetch from Canadian Franchise Association
  async fetchFromCFA(searchParams: {
    category?: string;
    minInvestment?: number;
    maxInvestment?: number;
    provinces?: string[];
    limit?: number;
  } = {}): Promise<Franchise[]> {
    const cacheKey = `cfa-${JSON.stringify(searchParams)}`;
    
    try {
      // Check cache first
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      if (!canadianFranchiseAPIs.cfa.apiKey) {
        console.warn('CFA API key not configured, using fallback data');
        return this.getFallbackFranchises('cfa');
      }

      const response = await fetch(`${canadianFranchiseAPIs.cfa.baseUrl}${canadianFranchiseAPIs.cfa.endpoints.search}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${canadianFranchiseAPIs.cfa.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          category: searchParams.category,
          minInvestment: searchParams.minInvestment || 0,
          maxInvestment: searchParams.maxInvestment || 10000000,
          provinces: searchParams.provinces || [],
          limit: searchParams.limit || 20
        })
      });

      if (!response.ok) {
        throw new Error(`CFA API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const franchises = data.franchises?.map(normalizeCFAFranchise) || [];
      
      this.setCache(cacheKey, franchises);
      return franchises;
    } catch (error) {
      console.error('Error fetching from CFA API:', error);
      return this.getFallbackFranchises('cfa');
    }
  }

  // Fetch from BeTheBoss.ca
  async fetchFromBeTheBoss(searchParams: {
    industry?: string;
    investmentMin?: number;
    investmentMax?: number;
    region?: string;
    limit?: number;
  } = {}): Promise<Franchise[]> {
    const cacheKey = `btb-${JSON.stringify(searchParams)}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      if (!canadianFranchiseAPIs.beTheBoss.apiKey) {
        console.warn('BeTheBoss API key not configured, using fallback data');
        return this.getFallbackFranchises('betheboss');
      }

      const response = await fetch(`${canadianFranchiseAPIs.beTheBoss.baseUrl}${canadianFranchiseAPIs.beTheBoss.endpoints.search}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${canadianFranchiseAPIs.beTheBoss.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          industry: searchParams.industry,
          investmentMin: searchParams.investmentMin || 0,
          investmentMax: searchParams.investmentMax || 10000000,
          region: searchParams.region,
          limit: searchParams.limit || 20
        })
      });

      if (!response.ok) {
        throw new Error(`BeTheBoss API error: ${response.status}`);
      }

      const data = await response.json();
      const franchises = data.results?.map(normalizeBeTheBoss) || [];
      
      this.setCache(cacheKey, franchises);
      return franchises;
    } catch (error) {
      console.error('Error fetching from BeTheBoss API:', error);
      return this.getFallbackFranchises('betheboss');
    }
  }

  // Fetch from Franchise Canada
  async fetchFromFranchiseCanada(searchParams: {
    sector?: string;
    minCapital?: number;
    maxCapital?: number;
    provinces?: string[];
    limit?: number;
  } = {}): Promise<Franchise[]> {
    const cacheKey = `fc-${JSON.stringify(searchParams)}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      if (!canadianFranchiseAPIs.franchiseCanada.apiKey) {
        console.warn('Franchise Canada API key not configured, using fallback data');
        return this.getFallbackFranchises('franchisecanada');
      }

      const queryParams = new URLSearchParams({
        sector: searchParams.sector || '',
        minCapital: (searchParams.minCapital || 0).toString(),
        maxCapital: (searchParams.maxCapital || 10000000).toString(),
        provinces: searchParams.provinces?.join(',') || '',
        limit: (searchParams.limit || 20).toString()
      });

      const response = await fetch(
        `${canadianFranchiseAPIs.franchiseCanada.baseUrl}${canadianFranchiseAPIs.franchiseCanada.endpoints.opportunities}?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${canadianFranchiseAPIs.franchiseCanada.apiKey}`,
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Franchise Canada API error: ${response.status}`);
      }

      const data = await response.json();
      const franchises = data.opportunities?.map(normalizeFranchiseCanada) || [];
      
      this.setCache(cacheKey, franchises);
      return franchises;
    } catch (error) {
      console.error('Error fetching from Franchise Canada API:', error);
      return this.getFallbackFranchises('franchisecanada');
    }
  }

  // Aggregate search across all APIs
  async searchAllAPIs(criteria: {
    industry?: string;
    investmentMin?: number;
    investmentMax?: number;
    region?: string;
    limit?: number;
  } = {}): Promise<Franchise[]> {
    console.log('🔍 Searching Canadian franchise APIs with criteria:', criteria);
    
    const promises = [
      this.fetchFromCFA({
        category: criteria.industry,
        minInvestment: criteria.investmentMin,
        maxInvestment: criteria.investmentMax,
        provinces: criteria.region ? [criteria.region] : undefined,
        limit: Math.ceil((criteria.limit || 20) / 3)
      }),
      this.fetchFromBeTheBoss({
        industry: criteria.industry,
        investmentMin: criteria.investmentMin,
        investmentMax: criteria.investmentMax,
        region: criteria.region,
        limit: Math.ceil((criteria.limit || 20) / 3)
      }),
      this.fetchFromFranchiseCanada({
        sector: criteria.industry,
        minCapital: criteria.investmentMin,
        maxCapital: criteria.investmentMax,
        provinces: criteria.region ? [criteria.region] : undefined,
        limit: Math.ceil((criteria.limit || 20) / 3)
      })
    ];

    try {
      const results = await Promise.allSettled(promises);
      const allFranchises: Franchise[] = [];

      results.forEach((result, index) => {
        const apiNames = ['CFA', 'BeTheBoss', 'Franchise Canada'];
        if (result.status === 'fulfilled') {
          console.log(`✅ ${apiNames[index]} API returned ${result.value.length} franchises`);
          allFranchises.push(...result.value);
        } else {
          console.error(`❌ ${apiNames[index]} API failed:`, result.reason);
        }
      });

      // Remove duplicates and sort by relevance
      const uniqueFranchises = this.removeDuplicates(allFranchises);
      const sortedFranchises = this.sortByRelevance(uniqueFranchises, criteria);
      
      console.log(`🎯 Total unique franchises found: ${sortedFranchises.length}`);
      return sortedFranchises.slice(0, criteria.limit || 20);
    } catch (error) {
      console.error('Error in searchAllAPIs:', error);
      return this.getFallbackFranchises('all');
    }
  }

  // Cache management
  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Remove duplicates based on name and website
  private removeDuplicates(franchises: Franchise[]): Franchise[] {
    const seen = new Set<string>();
    return franchises.filter(franchise => {
      const key = `${franchise.name.toLowerCase()}-${franchise.website || ''}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Sort by relevance to search criteria
  private sortByRelevance(franchises: Franchise[], criteria: any): Franchise[] {
    return franchises.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Industry match (40% weight)
      if (criteria.industry) {
        if (a.industry.toLowerCase().includes(criteria.industry.toLowerCase())) scoreA += 40;
        if (b.industry.toLowerCase().includes(criteria.industry.toLowerCase())) scoreB += 40;
      }

      // Investment range match (30% weight)
      if (criteria.investmentMin && criteria.investmentMax) {
        const aInRange = a.investmentMax >= criteria.investmentMin && a.investmentMin <= criteria.investmentMax;
        const bInRange = b.investmentMax >= criteria.investmentMin && b.investmentMin <= criteria.investmentMax;
        if (aInRange) scoreA += 30;
        if (bInRange) scoreB += 30;
      }

      // Region match (20% weight) - Ontario priority
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

      // Established date (10% weight) - newer franchises get slight preference
      const currentYear = new Date().getFullYear();
      const aAge = currentYear - a.established;
      const bAge = currentYear - b.established;
      if (aAge < bAge) scoreA += 10;
      if (bAge < aAge) scoreB += 10;

      return scoreB - scoreA;
    });
  }

  // Fallback data when APIs are unavailable
  private getFallbackFranchises(source: string): Franchise[] {
    // Import local franchise data as fallback
    const { allCanadianFranchises } = require('../data/franchiseData');
    
    console.log(`🔄 Using fallback data for ${source} (${allCanadianFranchises.length} franchises)`);
    
    // Add source identifier to fallback data
    return allCanadianFranchises.map((franchise: Franchise) => ({
      ...franchise,
      id: `fallback-${franchise.id}`,
      description: `${franchise.description} (Local data - API integration ready)`
    }));
  }
}

// Export singleton instance
export const canadianFranchiseAPI = CanadianFranchiseAPIService.getInstance();

// Utility functions for external use
export const searchCanadianFranchises = async (criteria: {
  industry?: string;
  investmentRange?: string;
  region?: string;
  lifestyle?: string;
}) => {
  const investmentMin = getInvestmentMin(criteria.investmentRange || '');
  const investmentMax = getInvestmentMax(criteria.investmentRange || '');
  
  return await canadianFranchiseAPI.searchAllAPIs({
    industry: criteria.industry === 'Any Industry' ? undefined : criteria.industry,
    investmentMin,
    investmentMax,
    region: criteria.region === 'Canada-Wide' ? undefined : criteria.region,
    limit: 20
  });
};

const getInvestmentMin = (range: string): number => {
  const ranges: Record<string, number> = {
    '$5k - $25k': 5000,
    '$25k - $100k': 25000,
    '$100k - $500k': 100000,
    '$500k+': 500000
  };
  return ranges[range] || 0;
};

const getInvestmentMax = (range: string): number => {
  const ranges: Record<string, number> = {
    '$5k - $25k': 25000,
    '$25k - $100k': 100000,
    '$100k - $500k': 500000,
    '$500k+': 10000000
  };
  return ranges[range] || 10000000;
};