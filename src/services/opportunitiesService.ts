import { supabase } from './supabaseClient';

export interface Opportunity {
  id: string;
  title: string;
  type: 'franchise' | 'business' | 'real_estate';
  category: string;
  investment_min: number;
  investment_max: number;
  description: string;
  image_url?: string;
  website?: string;
  location?: string;
  province?: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  source?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface OpportunityCategory {
  id: string;
  name: string;
  type: 'franchise' | 'business' | 'real_estate';
  description?: string;
  created_at: string;
}

export class OpportunitiesService {
  async getAllOpportunities(filters?: {
    type?: string;
    category?: string;
    province?: string;
    minInvestment?: number;
    maxInvestment?: number;
  }): Promise<Opportunity[]> {
    try {
      let query = supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.province) {
        query = query.eq('province', filters.province);
      }

      if (filters?.minInvestment !== undefined) {
        query = query.gte('investment_min', filters.minInvestment);
      }

      if (filters?.maxInvestment !== undefined) {
        query = query.lte('investment_max', filters.maxInvestment);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      return [];
    }
  }

  async getOpportunityById(id: string): Promise<Opportunity | null> {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      return null;
    }
  }

  async getCategories(type?: 'franchise' | 'business' | 'real_estate'): Promise<OpportunityCategory[]> {
    try {
      let query = supabase
        .from('opportunity_categories')
        .select('*')
        .order('name');

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async createOpportunity(opportunity: Partial<Opportunity>): Promise<Opportunity | null> {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .insert([opportunity])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating opportunity:', error);
      return null;
    }
  }

  async updateOpportunity(id: string, updates: Partial<Opportunity>): Promise<Opportunity | null> {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating opportunity:', error);
      return null;
    }
  }

  async deleteOpportunity(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      return false;
    }
  }

  formatInvestmentRange(min: number, max: number): string {
    return `$${min.toLocaleString()}.00 - $${max.toLocaleString()}.00`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}

export const opportunitiesService = new OpportunitiesService();
