const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

class Franchise {
  static async findAll(filters = {}) {
    let query = supabase
      .from('franchises')
      .select('*')
      .eq('is_active', true);

    if (filters.industry && filters.industry !== 'Any Industry') {
      query = query.eq('industry', filters.industry);
    }

    if (filters.minInvestment) {
      query = query.gte('investment_min', filters.minInvestment);
    }

    if (filters.maxInvestment) {
      query = query.lte('investment_max', filters.maxInvestment);
    }

    if (filters.region) {
      query = query.contains('region', [filters.region]);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('franchises')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async create(franchiseData) {
    const { data, error } = await supabase
      .from('franchises')
      .insert([franchiseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async bulkCreate(franchisesData) {
    const { data, error } = await supabase
      .from('franchises')
      .insert(franchisesData)
      .select();

    if (error) throw error;
    return data;
  }

  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('franchises')
      .update({ ...updateData, last_updated: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase
      .from('franchises')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async search(searchCriteria) {
    let query = supabase
      .from('franchises')
      .select('*')
      .eq('is_active', true);

    if (searchCriteria.industry && searchCriteria.industry !== 'Any Industry') {
      query = query.eq('industry', searchCriteria.industry);
    }

    if (searchCriteria.investmentRange) {
      const ranges = {
        '$5k - $25k': { min: 5000, max: 25000 },
        '$25k - $100k': { min: 25000, max: 100000 },
        '$100k+': { min: 100000, max: 10000000 }
      };

      const range = ranges[searchCriteria.investmentRange];
      if (range) {
        query = query
          .gte('investment_min', range.min)
          .lte('investment_max', range.max);
      }
    }

    if (searchCriteria.region) {
      query = query.contains('region', [searchCriteria.region]);
    }

    const { data, error } = await query.order('last_updated', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getStats() {
    const { data, error } = await supabase.rpc('get_franchise_stats');

    if (error) throw error;
    return data;
  }
}

module.exports = Franchise;
