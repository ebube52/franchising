import { supabase } from './supabaseClient';
import { Franchise } from '../types/franchise';

export class FranchiseCacheService {
  private static instance: FranchiseCacheService;
  private readonly CACHE_DURATION_HOURS = 24;

  public static getInstance(): FranchiseCacheService {
    if (!FranchiseCacheService.instance) {
      FranchiseCacheService.instance = new FranchiseCacheService();
    }
    return FranchiseCacheService.instance;
  }

  async getFranchise(id: string): Promise<Franchise | null> {
    try {
      const { data, error } = await supabase
        .from('franchises')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching franchise from cache:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return this.mapToFranchise(data);
    } catch (error) {
      console.error('Exception in getFranchise:', error);
      return null;
    }
  }

  async getFranchises(filters?: {
    industry?: string;
    investmentMin?: number;
    investmentMax?: number;
    region?: string;
    limit?: number;
  }): Promise<Franchise[]> {
    try {
      let query = supabase
        .from('franchises')
        .select('*')
        .eq('is_active', true)
        .order('last_updated', { ascending: false });

      if (filters?.industry) {
        query = query.eq('industry', filters.industry);
      }

      if (filters?.investmentMin !== undefined) {
        query = query.gte('investment_max', filters.investmentMin);
      }

      if (filters?.investmentMax !== undefined) {
        query = query.lte('investment_min', filters.investmentMax);
      }

      if (filters?.region) {
        query = query.contains('region', [filters.region]);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching franchises from cache:', error);
        return [];
      }

      return (data || []).map(this.mapToFranchise);
    } catch (error) {
      console.error('Exception in getFranchises:', error);
      return [];
    }
  }

  async saveFranchise(franchise: Franchise, source: string = 'api'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('franchises')
        .upsert({
          id: franchise.id,
          name: franchise.name,
          brand: franchise.brand,
          industry: franchise.industry,
          investment_min: franchise.investmentMin,
          investment_max: franchise.investmentMax,
          region: franchise.region,
          description: franchise.description,
          image: franchise.image,
          business_model: franchise.businessModel,
          support_provided: franchise.supportProvided,
          franchise_fee: franchise.franchiseFee,
          royalty_fee: franchise.royaltyFee,
          territories: franchise.territories,
          established: franchise.established,
          website: franchise.website,
          contact_info: franchise.contactInfo,
          requirements: franchise.requirements,
          data_source: source,
          raw_data: franchise,
          last_updated: new Date().toISOString(),
          is_active: true
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error saving franchise to cache:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception in saveFranchise:', error);
      return false;
    }
  }

  async saveFranchises(franchises: Franchise[], source: string = 'api'): Promise<number> {
    let successCount = 0;

    for (const franchise of franchises) {
      const success = await this.saveFranchise(franchise, source);
      if (success) successCount++;
    }

    console.log(`💾 Saved ${successCount}/${franchises.length} franchises to cache`);
    return successCount;
  }

  async cacheAPIResponse(
    cacheKey: string,
    apiSource: string,
    requestParams: any,
    responseData: any,
    expiresInHours: number = 24
  ): Promise<boolean> {
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + expiresInHours);

      const { error } = await supabase
        .from('api_cache')
        .upsert({
          cache_key: cacheKey,
          api_source: apiSource,
          request_params: requestParams,
          response_data: responseData,
          expires_at: expiresAt.toISOString()
        }, {
          onConflict: 'cache_key'
        });

      if (error) {
        console.error('Error caching API response:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception in cacheAPIResponse:', error);
      return false;
    }
  }

  async getCachedAPIResponse(cacheKey: string): Promise<any | null> {
    try {
      const { data, error } = await supabase
        .from('api_cache')
        .select('response_data, expires_at')
        .eq('cache_key', cacheKey)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (error || !data) {
        return null;
      }

      return data.response_data;
    } catch (error) {
      console.error('Exception in getCachedAPIResponse:', error);
      return null;
    }
  }

  async logAPIRequest(
    apiSource: string,
    endpoint: string,
    statusCode: number,
    requestParams: any = {},
    errorMessage?: string,
    responseTimeMs?: number
  ): Promise<void> {
    try {
      await supabase
        .from('api_logs')
        .insert({
          api_source: apiSource,
          endpoint: endpoint,
          status_code: statusCode,
          request_params: requestParams,
          error_message: errorMessage || null,
          response_time_ms: responseTimeMs || null
        });
    } catch (error) {
      console.error('Exception in logAPIRequest:', error);
    }
  }

  async cleanExpiredCache(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('api_cache')
        .delete()
        .lt('expires_at', new Date().toISOString())
        .select();

      if (error) {
        console.error('Error cleaning expired cache:', error);
        return 0;
      }

      const deletedCount = data?.length || 0;
      console.log(`🧹 Cleaned ${deletedCount} expired cache entries`);
      return deletedCount;
    } catch (error) {
      console.error('Exception in cleanExpiredCache:', error);
      return 0;
    }
  }

  async getFranchiseStats(): Promise<{
    total: number;
    active: number;
    byIndustry: Record<string, number>;
    bySource: Record<string, number>;
  }> {
    try {
      const { data, error } = await supabase
        .from('franchises')
        .select('industry, data_source, is_active');

      if (error || !data) {
        return { total: 0, active: 0, byIndustry: {}, bySource: {} };
      }

      const stats = {
        total: data.length,
        active: data.filter(f => f.is_active).length,
        byIndustry: {} as Record<string, number>,
        bySource: {} as Record<string, number>
      };

      data.forEach(franchise => {
        if (franchise.industry) {
          stats.byIndustry[franchise.industry] = (stats.byIndustry[franchise.industry] || 0) + 1;
        }
        if (franchise.data_source) {
          stats.bySource[franchise.data_source] = (stats.bySource[franchise.data_source] || 0) + 1;
        }
      });

      return stats;
    } catch (error) {
      console.error('Exception in getFranchiseStats:', error);
      return { total: 0, active: 0, byIndustry: {}, bySource: {} };
    }
  }

  async getRecentAPILogs(limit: number = 50): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('api_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching API logs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception in getRecentAPILogs:', error);
      return [];
    }
  }

  private mapToFranchise(data: any): Franchise {
    return {
      id: data.id,
      name: data.name,
      brand: data.brand,
      industry: data.industry,
      investmentMin: data.investment_min,
      investmentMax: data.investment_max,
      region: data.region || [],
      description: data.description,
      image: data.image,
      businessModel: data.business_model,
      supportProvided: data.support_provided || [],
      franchiseFee: data.franchise_fee,
      royaltyFee: data.royalty_fee,
      territories: data.territories,
      established: data.established,
      website: data.website,
      contactInfo: data.contact_info || {},
      requirements: data.requirements || {}
    };
  }
}

export const franchiseCacheService = FranchiseCacheService.getInstance();
