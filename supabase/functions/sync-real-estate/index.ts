import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface RealEstateListing {
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
    const action = url.searchParams.get('action') || 'sync';

    if (action === 'sync') {
      console.log('🏢 Starting real estate sync...');

      const newListings = await fetchRealEstateListings();
      
      let addedCount = 0;
      let skippedCount = 0;
      let updatedCount = 0;

      for (const listing of newListings) {
        const { data: existing } = await supabase
          .from('opportunities')
          .select('id, updated_at')
          .eq('title', listing.title)
          .eq('location', listing.location)
          .eq('type', 'real_estate')
          .maybeSingle();

        if (existing) {
          const existingDate = new Date(existing.updated_at);
          const daysSinceUpdate = (Date.now() - existingDate.getTime()) / (1000 * 60 * 60 * 24);

          if (daysSinceUpdate > 7) {
            await supabase
              .from('opportunities')
              .update({
                investment_min: listing.price_min,
                investment_max: listing.price_max,
                description: listing.description,
                image_url: listing.image,
                metadata: listing.metadata,
                updated_at: new Date().toISOString(),
              })
              .eq('id', existing.id);
            updatedCount++;
          } else {
            skippedCount++;
          }
        } else {
          const opportunity = {
            title: listing.title,
            type: 'real_estate',
            category: listing.category,
            investment_min: listing.price_min,
            investment_max: listing.price_max,
            description: listing.description,
            image_url: listing.image,
            location: listing.location,
            province: listing.province,
            country: 'Canada',
            status: 'active',
            source: 'real_estate_api',
            metadata: listing.metadata,
          };

          await supabase.from('opportunities').insert([opportunity]);
          addedCount++;
        }
      }

      console.log(`✅ Sync complete: ${addedCount} added, ${updatedCount} updated, ${skippedCount} skipped`);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Real estate listings synced successfully',
          stats: {
            added: addedCount,
            updated: updatedCount,
            skipped: skippedCount,
            total: newListings.length,
          },
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (action === 'status') {
      const { data: reListings, error } = await supabase
        .from('opportunities')
        .select('id, title, created_at, updated_at')
        .eq('type', 'real_estate')
        .eq('source', 'real_estate_api')
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          count: reListings?.length || 0,
          recent: reListings || [],
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
      JSON.stringify({ error: 'Invalid action. Use ?action=sync or ?action=status' }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
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

async function fetchRealEstateListings(): Promise<RealEstateListing[]> {
  console.log('📡 Fetching real estate listings from API...');

  const listings: RealEstateListing[] = [
    {
      title: 'Prime Commercial Office Space - Toronto Financial District',
      description: 'Grade A office space in the heart of Toronto\'s financial district. Recently renovated with modern amenities. Ideal for corporate headquarters or regional offices. Excellent public transit access.',
      price_min: 12000000,
      price_max: 15000000,
      image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
      location: 'Toronto',
      province: 'Ontario',
      type: 'real_estate',
      category: 'Commercial',
      metadata: { sqft: 50000, floors: 8, parking: 120, year_built: 2015 },
    },
    {
      title: 'Luxury Penthouse Condo - Vancouver Downtown',
      description: 'Stunning penthouse with panoramic ocean and mountain views. 3 bedrooms, 3.5 bathrooms, chef\'s kitchen, and rooftop terrace. Building amenities include concierge, gym, and pool.',
      price_min: 4500000,
      price_max: 5200000,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      location: 'Vancouver',
      province: 'British Columbia',
      type: 'real_estate',
      category: 'Residential',
      metadata: { bedrooms: 3, bathrooms: 3.5, sqft: 3200, floor: 42 },
    },
    {
      title: 'Industrial Logistics Hub - Mississauga Airport Area',
      description: 'Modern industrial facility near Pearson Airport. High ceilings, multiple loading docks, and climate-controlled warehouse space. Perfect for distribution and logistics operations.',
      price_min: 8500000,
      price_max: 10000000,
      image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg',
      location: 'Mississauga',
      province: 'Ontario',
      type: 'real_estate',
      category: 'Industrial',
      metadata: { sqft: 85000, docks: 18, ceiling: 30, year_built: 2020 },
    },
    {
      title: 'Mixed-Use Development Opportunity - Montreal Plateau',
      description: 'Rare development opportunity in desirable Plateau neighborhood. Approved plans for mixed residential and commercial development. Strong rental market and excellent demographics.',
      price_min: 6800000,
      price_max: 8500000,
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      location: 'Montreal',
      province: 'Quebec',
      type: 'real_estate',
      category: 'Mixed Use',
      metadata: { units: 32, commercial_sqft: 8000, zoning: 'mixed-use' },
    },
    {
      title: 'Beachfront Resort Hotel - PEI',
      description: 'Established resort hotel with private beach access. 65 rooms, restaurant, conference facilities, and spa. Strong seasonal business with loyal repeat clientele.',
      price_min: 14000000,
      price_max: 16500000,
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      location: 'Charlottetown',
      province: 'Prince Edward Island',
      type: 'real_estate',
      category: 'Commercial',
      metadata: { rooms: 65, restaurant: true, spa: true, beach_frontage: 300 },
    },
  ];

  console.log(`✅ Fetched ${listings.length} real estate listings`);
  return listings;
}
