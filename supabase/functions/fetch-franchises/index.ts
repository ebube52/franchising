import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

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
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🚀 Fetching franchises from Franchimp API...');

    // Fetch from Franchimp API
    const franchimpResponse = await fetch('https://franchimp.p.rapidapi.com/franchises', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'franchimp.p.rapidapi.com',
        'x-rapidapi-key': rapidApiKey || '',
      },
    });

    if (!franchimpResponse.ok) {
      throw new Error(`Franchimp API error: ${franchimpResponse.status}`);
    }

    const franchises = await franchimpResponse.json();
    console.log(`📊 Received ${franchises.length} franchises from Franchimp API`);

    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const franchise of franchises) {
      try {
        // Check if franchise already exists
        const { data: existing } = await supabase
          .from('opportunities')
          .select('id')
          .eq('title', franchise.name || franchise.title)
          .eq('source', 'franchimp_api')
          .maybeSingle();

        const opportunity = {
          title: franchise.name || franchise.title,
          type: 'franchise',
          category: franchise.category || franchise.industry || 'Other',
          investment_min: franchise.investmentMin || franchise.investment_min || franchise.minInvestment || 0,
          investment_max: franchise.investmentMax || franchise.investment_max || franchise.maxInvestment || 0,
          description: franchise.description || franchise.about || 'No description available',
          image_url: franchise.image || franchise.logo || franchise.imageUrl || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
          website: franchise.website || franchise.url || '',
          location: franchise.location || franchise.country || 'Canada',
          province: franchise.province || franchise.state || 'Multiple',
          country: franchise.country || 'Canada',
          status: 'active',
          source: 'franchimp_api',
          metadata: {
            established: franchise.established || franchise.yearFounded || null,
            territories: franchise.territories || franchise.locations || 0,
            franchise_fee: franchise.franchiseFee || franchise.franchise_fee || 0,
            royalty_fee: franchise.royaltyFee || franchise.royalty_fee || 'N/A',
            training_provided: franchise.trainingProvided !== false,
            marketing_support: franchise.marketingSupport !== false,
            business_model: 'Franchise',
            last_updated: new Date().toISOString(),
            raw_data: franchise,
          },
        };

        if (existing) {
          // Update existing franchise
          const { error: updateError } = await supabase
            .from('opportunities')
            .update(opportunity)
            .eq('id', existing.id);

          if (updateError) {
            console.error(`Update error for ${opportunity.title}:`, updateError);
            skippedCount++;
          } else {
            console.log(`🔄 Updated: ${opportunity.title}`);
            updatedCount++;
          }
        } else {
          // Insert new franchise
          const { error: insertError } = await supabase
            .from('opportunities')
            .insert([opportunity]);

          if (insertError) {
            console.error(`Insert error for ${opportunity.title}:`, insertError);
            skippedCount++;
          } else {
            console.log(`✅ Added: ${opportunity.title}`);
            addedCount++;
          }
        }
      } catch (franchiseError) {
        console.error(`Error processing franchise:`, franchiseError);
        skippedCount++;
      }
    }

    console.log(`✅ Complete: ${addedCount} added, ${updatedCount} updated, ${skippedCount} skipped`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Franchises synced from Franchimp API',
        stats: {
          added: addedCount,
          updated: updatedCount,
          skipped: skippedCount,
          total: franchises.length,
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
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Failed to fetch franchises from Franchimp API',
      }),
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