const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

class RealEstate {
  static async findAll(filters = {}) {
    let query = supabase
      .from('opportunities')
      .select('*')
      .eq('type', 'real_estate')
      .eq('status', 'active');

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.province) {
      query = query.eq('province', filters.province);
    }

    if (filters.minPrice) {
      query = query.gte('investment_min', filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte('investment_max', filters.maxPrice);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .eq('type', 'real_estate')
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async create(realEstateData) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([{
        ...realEstateData,
        type: 'real_estate',
        status: 'active'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async bulkCreate(realEstateDataArray) {
    const opportunitiesData = realEstateDataArray.map(item => ({
      ...item,
      type: 'real_estate',
      status: 'active'
    }));

    const { data, error } = await supabase
      .from('opportunities')
      .insert(opportunitiesData)
      .select();

    if (error) throw error;
    return data;
  }

  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('opportunities')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('type', 'real_estate')
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase
      .from('opportunities')
      .update({ status: 'inactive' })
      .eq('id', id)
      .eq('type', 'real_estate')
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getCategories() {
    const { data, error } = await supabase
      .from('opportunity_categories')
      .select('*')
      .eq('type', 'real_estate')
      .order('name');

    if (error) throw error;
    return data;
  }

  static async getByProvince(province) {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('type', 'real_estate')
      .eq('status', 'active')
      .eq('province', province)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

module.exports = RealEstate;
