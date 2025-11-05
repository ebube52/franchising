import axios from 'axios';

export interface RealEstateListing {
  title: string;
  description: string;
  price_min: number;
  price_max: number;
  image: string;
  location: string;
  province?: string;
  type: string;
  category: string;
  metadata?: any;
}

export class RealEstateAPIService {
  private static instance: RealEstateAPIService;
  private apiKey: string | undefined;
  private baseUrl: string;

  private constructor() {
    this.apiKey = import.meta.env.VITE_REAL_ESTATE_API_KEY;
    this.baseUrl = import.meta.env.VITE_REAL_ESTATE_API_URL || '';
  }

  public static getInstance(): RealEstateAPIService {
    if (!RealEstateAPIService.instance) {
      RealEstateAPIService.instance = new RealEstateAPIService();
    }
    return RealEstateAPIService.instance;
  }

  async fetchListings(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: string;
  }): Promise<RealEstateListing[]> {
    console.log('🏢 Fetching real estate listings...');

    if (!this.apiKey) {
      console.log('⚠️  No Real Estate API key configured');
      console.log('📝 To enable real-time listings:');
      console.log('   1. Sign up for a real estate API service (e.g., Realtor.ca API, CREA DDF)');
      console.log('   2. Add VITE_REAL_ESTATE_API_KEY to your .env file');
      console.log('   3. Add VITE_REAL_ESTATE_API_URL to your .env file');
      return this.getMockListings();
    }

    try {
      const response = await axios.get(`${this.baseUrl}/listings`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: filters
      });

      return this.transformAPIResponse(response.data);
    } catch (error) {
      console.error('❌ Error fetching real estate listings:', error);
      return this.getMockListings();
    }
  }

  private transformAPIResponse(data: any): RealEstateListing[] {
    if (!data || !Array.isArray(data.listings)) {
      return [];
    }

    return data.listings.map((listing: any) => ({
      title: listing.title || listing.address,
      description: listing.description || listing.details,
      price_min: listing.price || listing.price_min || 0,
      price_max: listing.price || listing.price_max || 0,
      image: listing.image || listing.photo_url || listing.images?.[0] ||
             'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      location: listing.location || listing.city,
      province: listing.province || listing.state,
      type: 'real_estate',
      category: this.categorizeProperty(listing.property_type),
      metadata: {
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        sqft: listing.sqft,
        lot_size: listing.lot_size,
        year_built: listing.year_built,
        property_type: listing.property_type
      }
    }));
  }

  private categorizeProperty(propertyType: string): string {
    if (!propertyType) return 'Commercial';

    const type = propertyType.toLowerCase();
    if (type.includes('condo') || type.includes('apartment') || type.includes('residential')) {
      return 'Residential';
    }
    if (type.includes('commercial') || type.includes('retail') || type.includes('office')) {
      return 'Commercial';
    }
    if (type.includes('industrial') || type.includes('warehouse')) {
      return 'Industrial';
    }
    if (type.includes('land') || type.includes('lot')) {
      return 'Land';
    }
    if (type.includes('mixed')) {
      return 'Mixed Use';
    }
    return 'Commercial';
  }

  private getMockListings(): RealEstateListing[] {
    console.log('�� Using mock real estate listings');

    return [
      {
        title: 'Downtown Commercial Building - Toronto',
        description: 'Prime location commercial building with retail and office space. Excellent rental income potential.',
        price_min: 4500000,
        price_max: 5200000,
        image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        location: 'Toronto',
        province: 'Ontario',
        type: 'real_estate',
        category: 'Commercial',
        metadata: { sqft: 15000, floors: 4 }
      },
      {
        title: 'Luxury Waterfront Condo Development',
        description: 'Exclusive waterfront development with stunning views and premium amenities.',
        price_min: 3800000,
        price_max: 6500000,
        image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
        location: 'Vancouver',
        province: 'British Columbia',
        type: 'real_estate',
        category: 'Residential',
        metadata: { units: 120, floors: 25 }
      }
    ];
  }

  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      console.log('❌ No API key configured');
      return false;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        timeout: 5000
      });

      console.log('✅ Real Estate API connection successful');
      return response.status === 200;
    } catch (error) {
      console.error('❌ Real Estate API connection failed:', error);
      return false;
    }
  }

  getAPIStatus(): {
    configured: boolean;
    apiKey: string;
    baseUrl: string;
  } {
    return {
      configured: !!this.apiKey && !!this.baseUrl,
      apiKey: this.apiKey ? `${this.apiKey.substring(0, 8)}...` : 'Not configured',
      baseUrl: this.baseUrl || 'Not configured'
    };
  }
}

export const realEstateAPIService = RealEstateAPIService.getInstance();
