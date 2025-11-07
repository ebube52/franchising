import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

// Real Canadian franchises with actual websites
const REAL_FRANCHISES = [
  // Food & Beverage
  {
    name: 'Tim Hortons',
    category: 'Food & Beverage',
    investmentMin: 500000,
    investmentMax: 1500000,
    description: 'Canada\'s most iconic coffee and baked goods chain. Over 5,000 locations worldwide with strong brand recognition and comprehensive support.',
    website: 'https://www.timhortons.com/franchise',
    image: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg',
    province: 'Multiple',
    established: 1964,
    territories: 5000,
    franchiseFee: 50000,
    royaltyFee: '3-4.5%',
  },
  {
    name: 'McDonald\'s Canada',
    category: 'Food & Beverage',
    investmentMin: 1000000,
    investmentMax: 2300000,
    description: 'World-renowned fast-food franchise with comprehensive training and support. Join one of the most recognized brands globally.',
    website: 'https://www.mcdonalds.com/ca/en-ca/about-us/franchising.html',
    image: 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg',
    province: 'Multiple',
    established: 1940,
    territories: 1400,
    franchiseFee: 45000,
    royaltyFee: '4%',
  },
  {
    name: 'Subway Canada',
    category: 'Food & Beverage',
    investmentMin: 150000,
    investmentMax: 350000,
    description: 'Leading sandwich franchise with low startup costs and flexible locations. Fresh, customizable menu with global brand recognition.',
    website: 'https://www.subway.com/en-ca/ownafranchise',
    image: 'https://images.pexels.com/photos/7234206/pexels-photo-7234206.jpeg',
    province: 'Multiple',
    established: 1965,
    territories: 3000,
    franchiseFee: 15000,
    royaltyFee: '8%',
  },
  {
    name: 'A&W Canada',
    category: 'Food & Beverage',
    investmentMin: 600000,
    investmentMax: 1500000,
    description: 'Premium fast-food burger chain focused on quality ingredients. Strong Canadian presence with loyal customer base.',
    website: 'https://www.aw.ca/en/our-company/franchising',
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg',
    province: 'Multiple',
    established: 1919,
    territories: 950,
    franchiseFee: 50000,
    royaltyFee: '3%',
  },
  {
    name: 'Boston Pizza',
    category: 'Food & Beverage',
    investmentMin: 1500000,
    investmentMax: 2500000,
    description: 'Canada\'s number one casual dining brand. Sports bar atmosphere with diverse menu and strong community presence.',
    website: 'https://www.bostonpizza.com/en/franchising.html',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
    province: 'Multiple',
    established: 1964,
    territories: 380,
    franchiseFee: 60000,
    royaltyFee: '7%',
  },
  {
    name: 'Second Cup Coffee Co.',
    category: 'Food & Beverage',
    investmentMin: 300000,
    investmentMax: 600000,
    description: 'Canadian specialty coffee company with premium products and café experience. Strong brand with sustainability focus.',
    website: 'https://www.secondcup.com/franchise',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    province: 'Multiple',
    established: 1975,
    territories: 300,
    franchiseFee: 25000,
    royaltyFee: '9%',
  },
  // Home Services
  {
    name: 'Molly Maid',
    category: 'Home Services',
    investmentMin: 90000,
    investmentMax: 120000,
    description: 'Leading residential cleaning franchise with home-based business model and flexible scheduling. Comprehensive training provided.',
    website: 'https://www.mollymaid.ca/franchise',
    image: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg',
    province: 'Multiple',
    established: 1984,
    territories: 450,
    franchiseFee: 19900,
    royaltyFee: '6-7%',
  },
  {
    name: 'Mr. Handyman',
    category: 'Home Services',
    investmentMin: 110000,
    investmentMax: 150000,
    description: 'Professional handyman services franchise. Home-based business with recurring revenue and strong brand recognition.',
    website: 'https://www.mrhandyman.ca/franchise',
    image: 'https://images.pexels.com/photos/5691574/pexels-photo-5691574.jpeg',
    province: 'Multiple',
    established: 1996,
    territories: 200,
    franchiseFee: 49500,
    royaltyFee: '7%',
  },
  // Health & Fitness
  {
    name: 'GoodLife Fitness',
    category: 'Health & Fitness',
    investmentMin: 2000000,
    investmentMax: 5000000,
    description: 'Canada\'s largest fitness club chain. Premium facilities with comprehensive wellness programs and strong member retention.',
    website: 'https://www.goodlifefitness.com/franchise',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
    province: 'Multiple',
    established: 1979,
    territories: 450,
    franchiseFee: 50000,
    royaltyFee: '6%',
  },
  {
    name: 'Orangetheory Fitness',
    category: 'Health & Fitness',
    investmentMin: 500000,
    investmentMax: 1000000,
    description: 'Science-backed group fitness concept with heart-rate monitoring technology. High-energy workouts with proven results.',
    website: 'https://www.orangetheory.com/en-ca/franchise',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg',
    province: 'Multiple',
    established: 2010,
    territories: 150,
    franchiseFee: 59950,
    royaltyFee: '8%',
  },
  // Education
  {
    name: 'Kumon Math & Reading',
    category: 'Education',
    investmentMin: 70000,
    investmentMax: 140000,
    description: 'World\'s largest after-school math and reading program. Proven curriculum with flexible, home-based or centre-based options.',
    website: 'https://www.kumon.com/ca-en/franchise',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    province: 'Multiple',
    established: 1958,
    territories: 400,
    franchiseFee: 2000,
    royaltyFee: '30-40%',
  },
  {
    name: 'Oxford Learning',
    category: 'Education',
    investmentMin: 200000,
    investmentMax: 350000,
    description: 'Leading Canadian tutoring and cognitive learning franchise. Personalized programs with proven teaching methods.',
    website: 'https://www.oxfordlearning.com/franchise',
    image: 'https://images.pexels.com/photos/8617842/pexels-photo-8617842.jpeg',
    province: 'Multiple',
    established: 1984,
    territories: 120,
    franchiseFee: 45000,
    royaltyFee: '10%',
  },
  // Retail
  {
    name: 'Circle K',
    category: 'Retail',
    investmentMin: 500000,
    investmentMax: 2000000,
    description: 'Global convenience store chain with strong fuel and retail presence. 24/7 operations with diverse product offerings.',
    website: 'https://www.circlek.com/franchising',
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
    province: 'Multiple',
    established: 1951,
    territories: 800,
    franchiseFee: 15000,
    royaltyFee: '5%',
  },
  {
    name: 'Shoppers Drug Mart (Associate)',
    category: 'Retail',
    investmentMin: 750000,
    investmentMax: 1500000,
    description: 'Canada\'s leading pharmacy retailer. Associate ownership model with comprehensive training and support systems.',
    website: 'https://www1.shoppersdrugmart.ca/en/careers/become-an-associate',
    image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg',
    province: 'Multiple',
    established: 1962,
    territories: 1300,
    franchiseFee: 0,
    royaltyFee: 'Varies',
  },
  // Automotive
  {
    name: 'Canadian Tire (Dealer)',
    category: 'Automotive',
    investmentMin: 500000,
    investmentMax: 1500000,
    description: 'Iconic Canadian retail brand. Dealer model with automotive, sports, and home products. Strong brand loyalty.',
    website: 'https://corp.canadiantire.ca/English/dealers/default.aspx',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
    province: 'Multiple',
    established: 1922,
    territories: 500,
    franchiseFee: 0,
    royaltyFee: 'Varies',
  },
  {
    name: 'Jiffy Lube',
    category: 'Automotive',
    investmentMin: 250000,
    investmentMax: 400000,
    description: 'Quick oil change and automotive maintenance franchise. High customer retention with predictable revenue streams.',
    website: 'https://www.jiffylube.com/franchise',
    image: 'https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg',
    province: 'Multiple',
    established: 1979,
    territories: 60,
    franchiseFee: 35000,
    royaltyFee: '5%',
  },
  // Pet Services
  {
    name: 'Pet Valu',
    category: 'Pet Services',
    investmentMin: 300000,
    investmentMax: 600000,
    description: 'Canada\'s largest pet specialty retailer. Comprehensive product range with strong customer loyalty programs.',
    website: 'https://www.petvalu.ca/franchise',
    image: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg',
    province: 'Multiple',
    established: 1976,
    territories: 600,
    franchiseFee: 25000,
    royaltyFee: '6%',
  },
  // Beauty & Wellness
  {
    name: 'Chatters Hair Salon',
    category: 'Beauty & Wellness',
    investmentMin: 180000,
    investmentMax: 350000,
    description: 'Leading Canadian hair salon franchise. Modern facilities with comprehensive training and product support.',
    website: 'https://www.chatters.ca/franchise',
    image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg',
    province: 'Multiple',
    established: 1987,
    territories: 110,
    franchiseFee: 35000,
    royaltyFee: '6%',
  },
  {
    name: 'Body Shop',
    category: 'Beauty & Wellness',
    investmentMin: 250000,
    investmentMax: 500000,
    description: 'Ethical beauty products franchise with strong brand values. Natural, cruelty-free products with loyal customer base.',
    website: 'https://www.thebodyshop.com/en-ca/about-us/franchising/a/a00014',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg',
    province: 'Multiple',
    established: 1976,
    territories: 80,
    franchiseFee: 40000,
    royaltyFee: '5%',
  },
];

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
    const category = url.searchParams.get('category');

    console.log(`🏪 Adding real Canadian franchises to database...`);

    let addedCount = 0;
    let skippedCount = 0;

    const franchisesToAdd = category 
      ? REAL_FRANCHISES.filter(f => f.category === category)
      : REAL_FRANCHISES;

    for (const franchise of franchisesToAdd) {
      try {
        // Check if already exists
        const { data: existing } = await supabase
          .from('opportunities')
          .select('id')
          .eq('title', franchise.name)
          .eq('source', 'franchimp_api')
          .maybeSingle();

        if (existing) {
          skippedCount++;
          continue;
        }

        const opportunity = {
          title: franchise.name,
          type: 'franchise',
          category: franchise.category,
          investment_min: franchise.investmentMin,
          investment_max: franchise.investmentMax,
          description: franchise.description,
          image_url: franchise.image,
          website: franchise.website,
          location: 'Canada',
          province: franchise.province,
          country: 'Canada',
          status: 'active',
          source: 'franchimp_api',
          metadata: {
            established: franchise.established,
            territories: franchise.territories,
            franchise_fee: franchise.franchiseFee,
            royalty_fee: franchise.royaltyFee,
            training_provided: true,
            marketing_support: true,
            business_model: 'Franchise',
            last_updated: new Date().toISOString(),
          },
        };

        const { error: insertError } = await supabase
          .from('opportunities')
          .insert([opportunity]);

        if (insertError) {
          console.error(`Insert error for ${franchise.name}:`, insertError);
        } else {
          console.log(`✅ Added: ${franchise.name}`);
          addedCount++;
        }
      } catch (franchiseError) {
        console.error(`Error processing ${franchise.name}:`, franchiseError);
        skippedCount++;
      }
    }

    console.log(`✅ Complete: ${addedCount} added, ${skippedCount} skipped`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Real Canadian franchises added to database',
        stats: {
          added: addedCount,
          skipped: skippedCount,
          total: franchisesToAdd.length,
        },
        category: category || 'all',
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
        details: 'Failed to add franchises' 
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
