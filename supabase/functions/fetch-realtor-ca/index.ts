import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RAPIDAPI_KEY = '8edbd936abmsh241dd59c094fbe0p11fbaejsn97e1916917a2';

const CITY_COORDS = {
  toronto: { latMin: 43.6, latMax: 43.8, longMin: -79.5, longMax: -79.1, name: 'Toronto' },
  vancouver: { latMin: 49.2, latMax: 49.3, longMin: -123.2, longMax: -123.0, name: 'Vancouver' },
  calgary: { latMin: 50.9, latMax: 51.1, longMin: -114.2, longMax: -113.9, name: 'Calgary' },
  montreal: { latMin: 45.4, latMax: 45.6, longMin: -73.7, longMax: -73.5, name: 'Montreal' },
  ottawa: { latMin: 45.3, latMax: 45.5, longMin: -75.8, longMax: -75.6, name: 'Ottawa' },
  edmonton: { latMin: 53.4, latMax: 53.6, longMin: -113.6, longMax: -113.4, name: 'Edmonton' },
  winnipeg: { latMin: 49.8, latMax: 50.0, longMin: -97.3, longMax: -97.0, name: 'Winnipeg' },
  quebec: { latMin: 46.7, latMax: 46.9, longMin: -71.3, longMax: -71.1, name: 'Quebec City' },
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
    const cityParam = url.searchParams.get('city')?.toLowerCase() || 'toronto';
    const limit = parseInt(url.searchParams.get('limit') || '20');

    const cityCoords = CITY_COORDS[cityParam as keyof typeof CITY_COORDS] || CITY_COORDS.toronto;

    console.log(`🏠 Fetching live MLS listings for ${cityCoords.name}...`);

    const apiUrl = `https://realty-in-ca1.p.rapidapi.com/properties/list-residential?LatitudeMax=${cityCoords.latMax}&LatitudeMin=${cityCoords.latMin}&LongitudeMax=${cityCoords.longMax}&LongitudeMin=${cityCoords.longMin}&CurrentPage=1&RecordsPerPage=${limit}&Culture=en-CA`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'realty-in-ca1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received ${data.Results?.length || 0} listings from API`);

    let addedCount = 0;
    let skippedCount = 0;

    if (data.Results && Array.isArray(data.Results)) {
      for (const listing of data.Results) {
        try {
          const mlsNumber = listing.MlsNumber || listing.Id;
          
          if (!listing.Property?.Address) {
            skippedCount++;
            continue;
          }

          const { data: existing } = await supabase
            .from('opportunities')
            .select('id')
            .eq('metadata->>mls_number', mlsNumber)
            .maybeSingle();

          if (existing) {
            skippedCount++;
            continue;
          }

          const bedrooms = listing.Building?.BedroomsTotal || 0;
          const propertyType = listing.Property?.Type || 'Home';
          const rawPrice = listing.Property?.Price;
          const price = parsePrice(rawPrice);
          const address = listing.Property?.Address?.AddressText || '';

          const title = bedrooms > 0 
            ? `${bedrooms}-Bedroom ${propertyType} - ${listing.Property.Address.City || cityCoords.name}`
            : `${propertyType} - ${listing.Property.Address.City || cityCoords.name}`;

          const description = generateDescription(listing);
          
          const photoUrl = listing.Property?.Photo?.[0]?.HighResPath || 
                         listing.Property?.Photo?.[0]?.MedResPath || 
                         'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';

          // Create search URL using the address and MLS number
          const searchQuery = encodeURIComponent(`${mlsNumber} ${address}`);
          const realtorUrl = `https://www.realtor.ca/map#view=list&Query=${searchQuery}`;

          const opportunity = {
            title: title.substring(0, 255),
            type: 'real_estate',
            category: getPropertyCategory(listing.Property?.Type),
            investment_min: price,
            investment_max: price,
            description: description,
            image_url: photoUrl,
            website: realtorUrl,
            location: listing.Property?.Address?.City || cityCoords.name,
            province: getProvince(listing.Property?.Address?.Province),
            country: 'Canada',
            status: 'active',
            source: 'realty_in_ca',
            metadata: {
              mls_number: mlsNumber,
              bedrooms: listing.Building?.BedroomsTotal || 0,
              bathrooms: listing.Building?.BathroomTotal || 0,
              sqft: listing.Building?.SizeInterior || '',
              property_type: listing.Property?.Type || '',
              address: address,
              postal_code: listing.Property?.Address?.PostalCode || '',
              listing_date: listing.InsertedDateUTC || '',
              last_updated: new Date().toISOString(),
              live_listing: true,
              public_remarks: (listing.PublicRemarks || '').substring(0, 500),
            },
          };

          const { error: insertError } = await supabase
            .from('opportunities')
            .insert([opportunity]);

          if (insertError) {
            console.error(`Insert error for ${mlsNumber}:`, insertError);
          } else {
            addedCount++;
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
        message: 'Live MLS listings fetched from Realtor.ca',
        stats: {
          added: addedCount,
          skipped: skippedCount,
          total: data.Results?.length || 0,
          totalAvailable: data.Paging?.TotalRecords || 0,
        },
        city: cityCoords.name,
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
        details: 'Failed to fetch live MLS listings from Realtor.ca API' 
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

function parsePrice(price: any): number {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  
  const priceStr = String(price).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(priceStr);
  return isNaN(parsed) ? 0 : parsed;
}

function getPropertyCategory(propertyType: string | undefined): string {
  if (!propertyType) return 'Single Family Home';
  
  const type = propertyType.toLowerCase();
  if (type.includes('condo') || type.includes('apartment')) return 'Condo';
  if (type.includes('townhouse') || type.includes('town')) return 'Townhouse';
  if (type.includes('duplex') || type.includes('triplex') || type.includes('fourplex')) return 'Multi-Family';
  if (type.includes('land') || type.includes('lot') || type.includes('vacant')) return 'Land';
  if (type.includes('commercial') || type.includes('office') || type.includes('retail')) return 'Commercial';
  
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
    parts.push(`${listing.Building.BedroomsTotal} bedroom`);
  }
  if (listing.Building?.BathroomTotal) {
    parts.push(`${listing.Building.BathroomTotal} bathroom`);
  }
  
  parts.push(listing.Property?.Type || 'property');
  
  if (listing.Property?.Address?.AddressText) {
    parts.push(`at ${listing.Property.Address.AddressText}`);
  }
  
  if (listing.Building?.SizeInterior) {
    parts.push(`with ${listing.Building.SizeInterior} of living space`);
  }
  
  if (listing.PublicRemarks) {
    const remarks = listing.PublicRemarks.substring(0, 300).trim();
    parts.push(remarks);
  }
  
  parts.push(`MLS# ${listing.MlsNumber || listing.Id}`);
  
  return parts.join('. ') + '.';
}
