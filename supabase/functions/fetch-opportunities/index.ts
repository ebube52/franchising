import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface Opportunity {
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
  source: string;
  metadata?: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'fetch';

    if (action === 'fetch') {
      const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          count: opportunities?.length || 0,
          opportunities: opportunities || [],
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (action === 'sync') {
      const newOpportunities: Opportunity[] = [];

      const franchiseOpportunities: Opportunity[] = [
        {
          title: 'McDonald\'s Franchise',
          type: 'franchise',
          category: 'Food & Beverage',
          investment_min: 1000000,
          investment_max: 2300000,
          description: 'World-renowned fast-food franchise with comprehensive training and support. Join one of the most recognized brands globally.',
          image_url: 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg',
          location: 'Multiple Locations',
          province: 'Ontario',
          source: 'public_api',
          metadata: { founded: '1940', units: '40000+' },
        },
        {
          title: 'Molly Maid Franchise',
          type: 'franchise',
          category: 'Home Services',
          investment_min: 90000,
          investment_max: 120000,
          description: 'Leading residential cleaning franchise with home-based business model and flexible scheduling.',
          image_url: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg',
          location: 'Canada Wide',
          province: 'Multiple',
          source: 'public_api',
          metadata: { founded: '1984', model: 'home-based' },
        },
        {
          title: 'Kumon Learning Centers',
          type: 'franchise',
          category: 'Education',
          investment_min: 70000,
          investment_max: 140000,
          description: 'World\'s largest after-school math and reading program with proven curriculum.',
          image_url: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
          location: 'Major Cities',
          province: 'Multiple',
          source: 'public_api',
          metadata: { founded: '1958', students: '4M+' },
        },
      ];

      const realEstateOpportunities: Opportunity[] = [
        {
          title: 'Office Building Investment',
          type: 'real_estate',
          category: 'Commercial',
          investment_min: 5000000,
          investment_max: 8000000,
          description: 'Class A office building in downtown core. Strong tenant mix with long-term leases. Excellent cash flow opportunity.',
          image_url: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
          location: 'Montreal',
          province: 'Quebec',
          source: 'public_api',
          metadata: { floors: '12', sqft: '120000', occupancy: '92%' },
        },
        {
          title: 'Retail Strip Mall',
          type: 'real_estate',
          category: 'Commercial',
          investment_min: 2500000,
          investment_max: 3500000,
          description: 'Well-maintained strip mall with excellent visibility. Strong anchor tenants and consistent cash flow.',
          image_url: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
          location: 'Mississauga',
          province: 'Ontario',
          source: 'public_api',
          metadata: { units: '8', parking: '60 spaces' },
        },
        {
          title: 'Multi-Family Apartment Complex',
          type: 'real_estate',
          category: 'Residential',
          investment_min: 4000000,
          investment_max: 6000000,
          description: 'Modern apartment complex with 50 units. Low vacancy rate and strong rental demand in growing area.',
          image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
          location: 'Halifax',
          province: 'Nova Scotia',
          source: 'public_api',
          metadata: { units: '50', built: '2018', parking: 'underground' },
        },
      ];

      newOpportunities.push(...franchiseOpportunities, ...realEstateOpportunities);

      for (const opp of newOpportunities) {
        const { data: existing } = await supabase
          .from('opportunities')
          .select('id')
          .eq('title', opp.title)
          .eq('source', opp.source)
          .maybeSingle();

        if (!existing) {
          await supabase.from('opportunities').insert([opp]);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Opportunities synced successfully',
          added: newOpportunities.length,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});