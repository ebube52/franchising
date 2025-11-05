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
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const city = url.searchParams.get('city') || 'toronto';
    const rapidApiKey = url.searchParams.get('apiKey');

    if (!rapidApiKey) {
      return new Response(
        JSON.stringify({
          error: 'RapidAPI key required',
          message: 'Please provide your RapidAPI key to fetch live listings',
          instructions: [
            '1. Sign up at https://rapidapi.com',
            '2. Subscribe to "Realty in CA" API',
            '3. Get your API key from the API dashboard',
            '4. Pass it as ?apiKey=YOUR_KEY parameter'
          ]
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log(`🏠 Fetching live MLS listings for ${city}...`);

    // Fetch from Realty in CA API on RapidAPI
    const response = await fetch(
      `https://realty-in-ca1.p.rapidapi.com/properties/list-residential?Culture=en-CA&CurrentPage=1&RecordsPerPage=20&CityName=${city}`,
      {
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'realty-in-ca1.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received ${data.Results?.length || 0} listings`);

    // Transform and save to database
    let addedCount = 0;
    let skippedCount = 0;

    if (data.Results && Array.isArray(data.Results)) {
      for (const listing of data.Results.slice(0, 20)) {
        try {
          const mlsNumber = listing.MlsNumber || listing.Id;
          
          // Check if listing already exists
          const { data: existing } = await supabase
            .from('opportunities')
            .select('id')
            .eq('metadata->>mls_number', mlsNumber)
            .maybeSingle();

          if (!existing && listing.Property?.Address) {
            const opportunity = {
              title: `${listing.Building?.BedroomsTotal || ''}-Bedroom ${listing.Property?.Type || 'Home'} - ${listing.Property.Address.AddressText || ''}`,
              type: 'real_estate',
              category: getPropertyCategory(listing.Property?.Type),
              investment_min: listing.Property?.Price || 0,
              investment_max: listing.Property?.Price || 0,
              description: generateDescription(listing),
              image_url: listing.Property?.Photo?.[0]?.HighResPath || listing.Property?.Photo?.[0]?.MedResPath || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
              website: `https://www.realtor.ca/real-estate/${mlsNumber}`,
              location: listing.Property?.Address?.City || city,
              province: getProvince(listing.Property?.Address?.Province),
              country: 'Canada',
              status: 'active',
              source: 'realty_in_ca',
              metadata: {
                mls_number: mlsNumber,
                bedrooms: listing.Building?.BedroomsTotal,
                bathrooms: listing.Building?.BathroomTotal,
                sqft: listing.Building?.SizeInterior,
                property_type: listing.Property?.Type,
                address: listing.Property?.Address?.AddressText,
                postal_code: listing.Property?.Address?.PostalCode,
                listing_date: listing.InsertedDateUTC,
                last_updated: new Date().toISOString(),
                live_listing: true,
              },
            };

            await supabase.from('opportunities').insert([opportunity]);
            addedCount++;
          } else {
            skippedCount++;
          }
        } catch (listingError) {
          console.error('Error processing listing:', listingError);
        }
      }
    }

    console.log(`✅ Complete: ${addedCount} added, ${skippedCount} skipped`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Live MLS listings fetched',
        stats: {
          added: addedCount,
          skipped: skippedCount,
          total: data.Results?.length || 0,
        },
        city: city,
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
        details: 'Failed to fetch live MLS listings. Check your RapidAPI key and subscription.' 
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

function getPropertyCategory(propertyType: string | undefined): string {
  if (!propertyType) return 'Single Family Home';
  
  const type = propertyType.toLowerCase();
  if (type.includes('condo') || type.includes('apartment')) return 'Condo';
  if (type.includes('townhouse') || type.includes('town')) return 'Townhouse';
  if (type.includes('duplex') || type.includes('triplex') || type.includes('multiplex')) return 'Multi-Family';
  if (type.includes('land') || type.includes('lot')) return 'Land';
  
  return 'Single Family Home';
}

function getProvince(province: string | undefined): string {
  const provinces: { [key: string]: string } = {
    'ON': 'Ontario',
    'BC': 'British Columbia',
    'AB': 'Alberta',
    'QC': 'Quebec',
    'MB': 'Manitoba',
    'SK': 'Saskatchewan',
    'NS': 'Nova Scotia',
    'NB': 'New Brunswick',
    'NL': 'Newfoundland and Labrador',
    'PE': 'Prince Edward Island',
    'NT': 'Northwest Territories',
    'YT': 'Yukon',
    'NU': 'Nunavut',
  };
  
  return provinces[province?.toUpperCase() || ''] || province || 'Ontario';
}

function generateDescription(listing: any): string {
  const parts = [];
  
  if (listing.Building?.BedroomsTotal) {
    parts.push(`${listing.Building.BedroomsTotal}-bedroom`);
  }
  if (listing.Building?.BathroomTotal) {
    parts.push(`${listing.Building.BathroomTotal}-bathroom`);
  }
  
  parts.push(listing.Property?.Type || 'home');
  
  if (listing.Property?.Address?.AddressText) {
    parts.push(`located at ${listing.Property.Address.AddressText}`);
  }
  
  if (listing.Building?.SizeInterior) {
    parts.push(`with ${listing.Building.SizeInterior} sq ft of living space`);
  }
  
  if (listing.PublicRemarks) {
    parts.push(listing.PublicRemarks.substring(0, 200));
  }
  
  parts.push(`MLS# ${listing.MlsNumber || listing.Id}`);
  
  return parts.join('. ') + '.';
}
