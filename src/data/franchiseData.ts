import { Franchise } from '../types/franchise';

// Streamlined Canadian franchises focused on 5 key categories
export const canadianFranchises: Franchise[] = [
  // FOOD & BEVERAGE FRANCHISES
  {
    id: 'tim-hortons-1',
    name: 'Tim Hortons',
    brand: 'Tim Hortons',
    industry: 'Food & Beverage',
    investmentMin: 438000,
    investmentMax: 2200000,
    region: ['Ontario', 'Quebec', 'Canada-Wide'],
    description: 'Canada\'s iconic coffee and donut chain offering a proven business model with strong brand recognition and comprehensive support system.',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    businessModel: 'Quick Service Restaurant',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Site Selection'],
    franchiseFee: 50000,
    royaltyFee: '4.5%',
    territories: 4000,
    established: 1964,
    website: 'https://www.timhortons.com/ca/en/corporate/franchise-with-us.php',
    contactInfo: {
      phone: '1-888-601-8486',
      email: 'franchise@timhortons.com'
    },
    requirements: {
      liquidCapital: 500000,
      netWorth: 1500000,
      experience: 'Business or restaurant experience preferred'
    }
  },
  {
    id: 'subway-canada-1',
    name: 'Subway Canada',
    brand: 'Subway',
    industry: 'Food & Beverage',
    investmentMin: 116000,
    investmentMax: 263000,
    region: ['Ontario', 'Quebec', 'Canada-Wide'],
    description: 'World\'s largest submarine sandwich franchise with flexible formats and strong support system for Canadian entrepreneurs.',
    image: 'https://images.pexels.com/photos/7129052/pexels-photo-7129052.jpeg',
    businessModel: 'Quick Service Restaurant',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Menu Development'],
    franchiseFee: 15000,
    royaltyFee: '8%',
    territories: 3000,
    established: 1965,
    website: 'https://www.subway.com/en-ca/explore/franchising',
    contactInfo: {
      phone: '1-800-888-4848',
      email: 'development@subway.com'
    },
    requirements: {
      liquidCapital: 80000,
      netWorth: 150000,
      experience: 'Business experience helpful'
    }
  },
  {
    id: 'pizza-pizza-1',
    name: 'Pizza Pizza',
    brand: 'Pizza Pizza',
    industry: 'Food & Beverage',
    investmentMin: 200000,
    investmentMax: 400000,
    region: ['Ontario', 'Quebec'],
    description: 'Canada\'s leading pizza delivery and takeout chain with strong brand recognition in Ontario and Quebec markets.',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    businessModel: 'Quick Service Restaurant',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Technology'],
    franchiseFee: 25000,
    royaltyFee: '6%',
    territories: 500,
    established: 1967,
    website: 'https://www.pizzapizza.ca/franchise/',
    contactInfo: {
      phone: '1-416-967-1010',
      email: 'franchise@pizzapizza.ca'
    },
    requirements: {
      liquidCapital: 150000,
      netWorth: 350000,
      experience: 'Restaurant experience preferred'
    }
  },
  {
    id: 'boston-pizza-1',
    name: 'Boston Pizza',
    brand: 'Boston Pizza',
    industry: 'Food & Beverage',
    investmentMin: 1200000,
    investmentMax: 1800000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Canada\'s #1 casual dining brand combining restaurant, sports bar, and take-out/delivery services.',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    businessModel: 'Casual Dining Restaurant',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Menu Development'],
    franchiseFee: 60000,
    royaltyFee: '7%',
    territories: 390,
    established: 1964,
    website: 'https://www.bostonpizza.com/en/franchise.html',
    contactInfo: {
      phone: '1-604-270-1108',
      email: 'franchise@bostonpizza.com'
    },
    requirements: {
      liquidCapital: 500000,
      netWorth: 1500000,
      experience: 'Restaurant management experience required'
    }
  },
  {
    id: 'a-w-canada-1',
    name: 'A&W Canada',
    brand: 'A&W',
    industry: 'Food & Beverage',
    investmentMin: 500000,
    investmentMax: 1200000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Canada\'s original burger family restaurant with grass-fed beef and hormone-free chicken commitment.',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    businessModel: 'Quick Service Restaurant',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Supply Chain'],
    franchiseFee: 50000,
    royaltyFee: '3%',
    territories: 950,
    established: 1956,
    website: 'https://web.aw.ca/en/franchise',
    contactInfo: {
      phone: '1-604-988-2141',
      email: 'franchise@aw.ca'
    },
    requirements: {
      liquidCapital: 400000,
      netWorth: 1000000,
      experience: 'Restaurant experience preferred'
    }
  },
  {
    id: 'dairy-queen-1',
    name: 'Dairy Queen Canada',
    brand: 'Dairy Queen',
    industry: 'Food & Beverage',
    investmentMin: 362000,
    investmentMax: 1800000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Famous for soft-serve ice cream, Blizzards, and hot food menu with strong seasonal performance across Canada.',
    image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg',
    businessModel: 'Quick Service Restaurant',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Product Development'],
    franchiseFee: 45000,
    royaltyFee: '4%',
    territories: 700,
    established: 1940,
    website: 'https://www.dairyqueen.com/ca-en/franchise/',
    contactInfo: {
      phone: '1-952-830-0200',
      email: 'franchise@dq.ca'
    },
    requirements: {
      liquidCapital: 400000,
      netWorth: 750000,
      experience: 'Food service experience helpful'
    }
  },

  // BUSINESS SERVICES FRANCHISES
  {
    id: 'molly-maid-1',
    name: 'Molly Maid',
    brand: 'Molly Maid',
    industry: 'Business Services',
    investmentMin: 90000,
    investmentMax: 120000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Leading residential cleaning service franchise with home-based business model and flexible scheduling options.',
    image: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg',
    businessModel: 'Service-Based',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Technology'],
    franchiseFee: 39000,
    royaltyFee: '6%',
    territories: 450,
    established: 1984,
    website: 'https://www.mollymaid.ca/franchise/',
    contactInfo: {
      phone: '1-800-665-5962',
      email: 'franchise@mollymaid.ca'
    },
    requirements: {
      liquidCapital: 75000,
      netWorth: 150000,
      experience: 'Management experience preferred'
    }
  },
  {
    id: 'jani-king-1',
    name: 'Jani-King Canada',
    brand: 'Jani-King',
    industry: 'Business Services',
    investmentMin: 11000,
    investmentMax: 35000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'World\'s largest commercial cleaning franchise with guaranteed customer base and ongoing support system.',
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg',
    businessModel: 'Service-Based',
    supportProvided: ['Training', 'Customer Base', 'Equipment', 'Marketing'],
    franchiseFee: 8500,
    royaltyFee: '10%',
    territories: 120,
    established: 1969,
    website: 'https://www.janiking.ca/franchise-opportunities/',
    contactInfo: {
      phone: '1-800-552-5264',
      email: 'info@janiking.ca'
    },
    requirements: {
      liquidCapital: 15000,
      netWorth: 50000,
      experience: 'No experience required'
    }
  },
  {
    id: 'minuteman-press-1',
    name: 'Minuteman Press',
    brand: 'Minuteman Press',
    industry: 'Business Services',
    investmentMin: 125000,
    investmentMax: 275000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Full-service printing and marketing solutions franchise serving small to medium businesses across Canada.',
    image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg',
    businessModel: 'B2B Service',
    supportProvided: ['Training', 'Marketing', 'Technology', 'Operations'],
    franchiseFee: 44500,
    royaltyFee: '6%',
    territories: 950,
    established: 1973,
    website: 'https://www.minutemanpressfranchise.ca/',
    contactInfo: {
      phone: '1-800-645-3006',
      email: 'info@minutemanpress.ca'
    },
    requirements: {
      liquidCapital: 80000,
      netWorth: 250000,
      experience: 'Business experience helpful'
    }
  },
  {
    id: 'postnet-1',
    name: 'PostNet Canada',
    brand: 'PostNet',
    industry: 'Business Services',
    investmentMin: 150000,
    investmentMax: 250000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Business services center offering printing, shipping, mailbox services, and graphic design solutions.',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg',
    businessModel: 'Retail Service Center',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Technology'],
    franchiseFee: 39500,
    royaltyFee: '5%',
    territories: 700,
    established: 1993,
    website: 'https://www.postnet.ca/franchise/',
    contactInfo: {
      phone: '1-800-841-7171',
      email: 'franchise@postnet.ca'
    },
    requirements: {
      liquidCapital: 100000,
      netWorth: 200000,
      experience: 'Customer service experience preferred'
    }
  },
  {
    id: 'two-men-truck-1',
    name: 'TWO MEN AND A TRUCK',
    brand: 'TWO MEN AND A TRUCK',
    industry: 'Business Services',
    investmentMin: 158000,
    investmentMax: 584000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'North America\'s largest local moving franchise with comprehensive training and proven business systems.',
    image: 'https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg',
    businessModel: 'Service-Based',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Technology'],
    franchiseFee: 60000,
    royaltyFee: '6%',
    territories: 380,
    established: 1985,
    website: 'https://www.twomenandatruck.ca/franchise',
    contactInfo: {
      phone: '1-800-345-1070',
      email: 'franchise@twomen.ca'
    },
    requirements: {
      liquidCapital: 150000,
      netWorth: 350000,
      experience: 'Business or management experience preferred'
    }
  },

  // RETAIL FRANCHISES
  {
    id: 'canadian-tire-1',
    name: 'Canadian Tire Gas+',
    brand: 'Canadian Tire',
    industry: 'Retail',
    investmentMin: 1500000,
    investmentMax: 3000000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Iconic Canadian retail brand offering gas stations with convenience store operations and automotive services.',
    image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg',
    businessModel: 'Retail Storefront',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Supply Chain'],
    franchiseFee: 35000,
    royaltyFee: '4%',
    territories: 1700,
    established: 1922,
    website: 'https://www.canadiantire.ca/en/corporate/franchise.html',
    contactInfo: {
      phone: '1-800-387-8803',
      email: 'franchise@canadiantire.ca'
    },
    requirements: {
      liquidCapital: 1000000,
      netWorth: 2500000,
      experience: 'Retail management experience required'
    }
  },
  {
    id: 'circle-k-1',
    name: 'Circle K Canada',
    brand: 'Circle K',
    industry: 'Retail',
    investmentMin: 150000,
    investmentMax: 1200000,
    region: ['Ontario', 'Quebec', 'Canada-Wide'],
    description: 'Global convenience store chain with fuel and food service operations across Canadian markets.',
    image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg',
    businessModel: 'Convenience Store',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Supply Chain'],
    franchiseFee: 25000,
    royaltyFee: '4.5%',
    territories: 2100,
    established: 1951,
    website: 'https://www.circlek.com/franchise',
    contactInfo: {
      phone: '1-800-361-2612',
      email: 'franchise@circlek.ca'
    },
    requirements: {
      liquidCapital: 200000,
      netWorth: 500000,
      experience: 'Retail or business experience preferred'
    }
  },
  {
    id: 'shoppers-drug-mart-1',
    name: 'Shoppers Drug Mart',
    brand: 'Shoppers Drug Mart',
    industry: 'Retail',
    investmentMin: 500000,
    investmentMax: 1500000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Canada\'s leading pharmacy chain with health, beauty, and convenience products serving communities nationwide.',
    image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
    businessModel: 'Pharmacy Retail',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Pharmacy Support'],
    franchiseFee: 75000,
    royaltyFee: '7%',
    territories: 1300,
    established: 1962,
    website: 'https://www.shoppersdrugmart.ca/en/franchise',
    contactInfo: {
      phone: '1-800-746-7737',
      email: 'franchise@shoppersdrugmart.ca'
    },
    requirements: {
      liquidCapital: 400000,
      netWorth: 1000000,
      experience: 'Pharmacy license and retail experience required'
    }
  },
  {
    id: 'dollarama-1',
    name: 'Dollarama',
    brand: 'Dollarama',
    industry: 'Retail',
    investmentMin: 75000,
    investmentMax: 150000,
    region: ['Ontario', 'Quebec', 'Canada-Wide'],
    description: 'Canada\'s leading dollar store chain offering everyday consumer products at compelling values.',
    image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg',
    businessModel: 'Retail Storefront',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Merchandising'],
    franchiseFee: 25000,
    royaltyFee: '5%',
    territories: 1400,
    established: 1992,
    website: 'https://www.dollarama.com/en-CA/franchise',
    contactInfo: {
      phone: '1-514-737-1006',
      email: 'franchise@dollarama.com'
    },
    requirements: {
      liquidCapital: 100000,
      netWorth: 200000,
      experience: 'Retail experience preferred'
    }
  },
  {
    id: 'sport-chek-1',
    name: 'Sport Chek',
    brand: 'Sport Chek',
    industry: 'Retail',
    investmentMin: 300000,
    investmentMax: 800000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Canada\'s largest sporting goods retailer offering athletic footwear, apparel, and equipment.',
    image: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg',
    businessModel: 'Retail Storefront',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Merchandising'],
    franchiseFee: 50000,
    royaltyFee: '6%',
    territories: 200,
    established: 1901,
    website: 'https://www.sportchek.ca/franchise',
    contactInfo: {
      phone: '1-800-665-6065',
      email: 'franchise@sportchek.ca'
    },
    requirements: {
      liquidCapital: 250000,
      netWorth: 500000,
      experience: 'Retail or sports industry experience preferred'
    }
  },

  // EDUCATION FRANCHISES
  {
    id: 'kumon-1',
    name: 'Kumon Math and Reading Centers',
    brand: 'Kumon',
    industry: 'Education',
    investmentMin: 70000,
    investmentMax: 140000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'World\'s largest after-school math and reading program with proven curriculum and strong community presence.',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    businessModel: 'Education Center',
    supportProvided: ['Training', 'Curriculum', 'Marketing', 'Operations'],
    franchiseFee: 1000,
    royaltyFee: '30-33%',
    territories: 1500,
    established: 1958,
    website: 'https://www.kumon.ca/franchise/',
    contactInfo: {
      phone: '1-866-633-0740',
      email: 'franchise@kumon.ca'
    },
    requirements: {
      liquidCapital: 70000,
      netWorth: 150000,
      experience: 'Education background helpful'
    }
  },
  {
    id: 'sylvan-learning-1',
    name: 'Sylvan Learning',
    brand: 'Sylvan Learning',
    industry: 'Education',
    investmentMin: 179000,
    investmentMax: 305000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Personalized tutoring and test prep services helping students achieve academic success across Canada.',
    image: 'https://images.pexels.com/photos/8613200/pexels-photo-8613200.jpeg',
    businessModel: 'Education Center',
    supportProvided: ['Training', 'Curriculum', 'Marketing', 'Technology'],
    franchiseFee: 48000,
    royaltyFee: '8-9%',
    territories: 750,
    established: 1979,
    website: 'https://www.sylvanlearning.com/franchise',
    contactInfo: {
      phone: '1-800-284-8214',
      email: 'franchise@sylvan.com'
    },
    requirements: {
      liquidCapital: 125000,
      netWorth: 250000,
      experience: 'Education or business background preferred'
    }
  },
  {
    id: 'mathnasium-1',
    name: 'Mathnasium Learning Centers',
    brand: 'Mathnasium',
    industry: 'Education',
    investmentMin: 120000,
    investmentMax: 180000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Math-only learning center franchise using the proven Mathnasium Method to build math skills and confidence.',
    image: 'https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg',
    businessModel: 'Education Center',
    supportProvided: ['Training', 'Curriculum', 'Marketing', 'Operations'],
    franchiseFee: 49000,
    royaltyFee: '10%',
    territories: 1000,
    established: 2002,
    website: 'https://www.mathnasium.ca/franchise',
    contactInfo: {
      phone: '1-877-601-6284',
      email: 'franchise@mathnasium.com'
    },
    requirements: {
      liquidCapital: 100000,
      netWorth: 200000,
      experience: 'Education or business experience helpful'
    }
  },
  {
    id: 'oxford-learning-1',
    name: 'Oxford Learning',
    brand: 'Oxford Learning',
    industry: 'Education',
    investmentMin: 125000,
    investmentMax: 200000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Canadian-founded tutoring and educational services franchise helping students of all ages achieve academic success.',
    image: 'https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg',
    businessModel: 'Education Center',
    supportProvided: ['Training', 'Curriculum', 'Marketing', 'Operations'],
    franchiseFee: 45000,
    royaltyFee: '8%',
    territories: 100,
    established: 1984,
    website: 'https://www.oxfordlearning.com/franchise/',
    contactInfo: {
      phone: '1-888-559-2212',
      email: 'franchise@oxfordlearning.com'
    },
    requirements: {
      liquidCapital: 100000,
      netWorth: 200000,
      experience: 'Education or business background preferred'
    }
  },
  {
    id: 'huntington-learning-1',
    name: 'Huntington Learning Centre',
    brand: 'Huntington Learning',
    industry: 'Education',
    investmentMin: 150000,
    investmentMax: 250000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Personalized tutoring and test prep franchise helping students improve grades and test scores.',
    image: 'https://images.pexels.com/photos/8613201/pexels-photo-8613201.jpeg',
    businessModel: 'Education Center',
    supportProvided: ['Training', 'Curriculum', 'Marketing', 'Technology'],
    franchiseFee: 49000,
    royaltyFee: '8%',
    territories: 300,
    established: 1977,
    website: 'https://www.huntingtonhelps.ca/franchise',
    contactInfo: {
      phone: '1-800-226-5327',
      email: 'franchise@huntingtonhelps.ca'
    },
    requirements: {
      liquidCapital: 125000,
      netWorth: 250000,
      experience: 'Education or business experience helpful'
    }
  },

  // REAL ESTATE FRANCHISES
  {
    id: 'remax-1',
    name: 'RE/MAX',
    brand: 'RE/MAX',
    industry: 'Real Estate',
    investmentMin: 25000,
    investmentMax: 200000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'World\'s most productive real estate network with proven systems and global brand recognition.',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    businessModel: 'Real Estate Brokerage',
    supportProvided: ['Training', 'Marketing', 'Technology', 'Lead Generation'],
    franchiseFee: 25000,
    royaltyFee: 'Variable',
    territories: 4000,
    established: 1973,
    website: 'https://www.remax.ca/franchise/',
    contactInfo: {
      phone: '1-800-263-2381',
      email: 'franchise@remax.ca'
    },
    requirements: {
      liquidCapital: 50000,
      netWorth: 100000,
      experience: 'Real estate license required'
    }
  },
  {
    id: 'century21-1',
    name: 'Century 21 Canada',
    brand: 'Century 21',
    industry: 'Real Estate',
    investmentMin: 35000,
    investmentMax: 150000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Global real estate franchise with comprehensive training and marketing support systems for Canadian markets.',
    image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
    businessModel: 'Real Estate Brokerage',
    supportProvided: ['Training', 'Marketing', 'Technology', 'Brand Recognition'],
    franchiseFee: 25000,
    royaltyFee: '6%',
    territories: 3000,
    established: 1971,
    website: 'https://www.century21.ca/franchise/',
    contactInfo: {
      phone: '1-877-221-2765',
      email: 'franchise@century21.ca'
    },
    requirements: {
      liquidCapital: 75000,
      netWorth: 150000,
      experience: 'Real estate license and experience required'
    }
  },
  {
    id: 'royal-lepage-1',
    name: 'Royal LePage',
    brand: 'Royal LePage',
    industry: 'Real Estate',
    investmentMin: 50000,
    investmentMax: 250000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Canada\'s leading provider of services to real estate brokerages and their agents since 1913.',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
    businessModel: 'Real Estate Brokerage',
    supportProvided: ['Training', 'Marketing', 'Technology', 'Business Development'],
    franchiseFee: 35000,
    royaltyFee: '6%',
    territories: 600,
    established: 1913,
    website: 'https://www.royallepage.ca/en/franchise/',
    contactInfo: {
      phone: '1-800-267-2735',
      email: 'franchise@royallepage.ca'
    },
    requirements: {
      liquidCapital: 100000,
      netWorth: 200000,
      experience: 'Real estate brokerage experience required'
    }
  },
  {
    id: 'coldwell-banker-1',
    name: 'Coldwell Banker Canada',
    brand: 'Coldwell Banker',
    industry: 'Real Estate',
    investmentMin: 40000,
    investmentMax: 180000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Premium real estate franchise brand with luxury market focus and comprehensive agent support systems.',
    image: 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg',
    businessModel: 'Real Estate Brokerage',
    supportProvided: ['Training', 'Marketing', 'Technology', 'Luxury Services'],
    franchiseFee: 30000,
    royaltyFee: '6%',
    territories: 3000,
    established: 1906,
    website: 'https://www.coldwellbanker.ca/franchise',
    contactInfo: {
      phone: '1-800-765-7653',
      email: 'franchise@coldwellbanker.ca'
    },
    requirements: {
      liquidCapital: 80000,
      netWorth: 175000,
      experience: 'Real estate license and brokerage experience required'
    }
  },
  {
    id: 'keller-williams-1',
    name: 'Keller Williams Canada',
    brand: 'Keller Williams',
    industry: 'Real Estate',
    investmentMin: 45000,
    investmentMax: 200000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'World\'s largest real estate franchise by agent count with innovative training and technology platforms.',
    image: 'https://images.pexels.com/photos/1546167/pexels-photo-1546167.jpeg',
    businessModel: 'Real Estate Brokerage',
    supportProvided: ['Training', 'Technology', 'Coaching', 'Lead Generation'],
    franchiseFee: 35000,
    royaltyFee: '6%',
    territories: 1000,
    established: 1983,
    website: 'https://www.kw.ca/franchise',
    contactInfo: {
      phone: '1-800-596-2875',
      email: 'franchise@kw.ca'
    },
    requirements: {
      liquidCapital: 85000,
      netWorth: 200000,
      experience: 'Real estate license and business experience required'
    }
  }
];

// Add the specific franchises requested
const specificFranchises: Franchise[] = [
  {
    id: 'nicety-franchise',
    name: 'Nicety Franchise',
    brand: 'Nicety',
    industry: 'Business Services',
    investmentMin: 10000,
    investmentMax: 500000,
    region: ['Ontario', 'Canada-Wide'],
    description: 'Nicety is a comprehensive business services franchise offering innovative solutions for modern entrepreneurs. Join our growing network of successful franchise partners.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    businessModel: 'Service-Based',
    supportProvided: ['Training', 'Marketing', 'Operations', 'Technology'],
    franchiseFee: 25000,
    royaltyFee: '5%',
    territories: 50,
    established: 2020,
    website: 'https://nicety.io/',
    contactInfo: {
      phone: '1-800-NICETY-1',
      email: 'franchise@nicety.io'
    },
    requirements: {
      liquidCapital: 50000,
      netWorth: 100000,
      experience: 'Business experience helpful'
    }
  },
  {
    id: 'renobox-franchise',
    name: 'Renobox - Business Opportunity',
    brand: 'Renobox',
    industry: 'Business Services',
    investmentMin: 5000,
    investmentMax: 100000,
    region: ['Ontario', 'Quebec', 'Canada-Wide'],
    description: 'Renobox is a trade mark specializing in the rental of containers, mobile warehouses, and exhibition kiosks. Whether for your entrepreneurial or personal needs, we will find a product for you! When you choose to go into business with the Renobox opportunity, you will benefit from full start-up support as well as in the continuity of your business in light transportation according to the needs of the operator: - Market study and business plan - Funding support - Advertising program - Corporate identity: logos, lettering, business cards, promotional brochures, etc. - Comprehensive operational start-up and maintenance training',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    businessModel: 'Equipment Rental',
    supportProvided: ['Market Study', 'Business Plan', 'Funding Support', 'Advertising Program', 'Corporate Identity', 'Training'],
    franchiseFee: 15000,
    royaltyFee: '6%',
    territories: 25,
    established: 2015,
    website: 'https://www.canadafranchiseopportunities.ca/franchise/46-renobox-business-opportunity/',
    contactInfo: {
      phone: '1-800-RENOBOX',
      email: 'franchise@renobox.ca'
    },
    requirements: {
      liquidCapital: 25000,
      netWorth: 75000,
      experience: 'Transportation or rental experience preferred'
    }
  }
];

// Combine all franchises
export const allCanadianFranchises: Franchise[] = [
  ...canadianFranchises,
  ...specificFranchises
];


export const getMatchingFranchises = (criteria: any): Franchise[] => {
  console.log('Getting matching franchises for criteria:', criteria);
  let matches = [...allCanadianFranchises];
  console.log('Total franchises available:', matches.length);
  
  // Filter by industry
  if (criteria.industry && criteria.industry !== 'Any Industry') {
    console.log('Filtering by industry:', criteria.industry);
    const beforeFilter = matches.length;
    matches = matches.filter(franchise => {
      const match = franchise.industry === criteria.industry ||
                   franchise.industry.toLowerCase().includes(criteria.industry.toLowerCase());
      return match;
    });
    console.log(`After industry filter: ${beforeFilter} -> ${matches.length}`);
  }
  
  // Filter by investment range
  if (criteria.investmentRange) {
    console.log('Filtering by investment:', criteria.investmentRange);
    const [min, max] = getInvestmentRange(criteria.investmentRange);
    const beforeFilter = matches.length;
    matches = matches.filter(franchise => 
      franchise.investmentMax >= min && franchise.investmentMin <= max
    );
    console.log(`After investment filter: ${beforeFilter} -> ${matches.length}`);
  }
  
  // Filter by region (Ontario prioritized)
  if (criteria.region && criteria.region !== 'Canada-Wide') {
    const beforeFilter = matches.length;
    matches = matches.filter(franchise => 
      franchise.region.includes(criteria.region) || franchise.region.includes('Canada-Wide')
    );
    console.log(`After region filter: ${beforeFilter} -> ${matches.length}`);
  }
  
  // Filter by lifestyle/business model
  if (criteria.lifestyle) {
    console.log('Filtering by lifestyle:', criteria.lifestyle);
    const beforeFilter = matches.length;
    matches = matches.filter(franchise => {
      const businessModel = franchise.businessModel.toLowerCase();
      let match = false;
      switch (criteria.lifestyle) {
        case 'Work from Home':
          match = businessModel.includes('service') || 
                  businessModel.includes('mobile') ||
                  businessModel.includes('home') ||
                  businessModel.includes('education') ||
                  franchise.industry === 'Business Services' ||
                  franchise.industry === 'Education';
          break;
        case 'Retail Storefront':
          match = businessModel.includes('retail') || 
                  businessModel.includes('restaurant') ||
                  businessModel.includes('store') ||
                  businessModel.includes('center');
          break;
        case 'Service-Based':
          match = businessModel.includes('service');
          break;
        case 'B2B Operations':
          match = businessModel.includes('b2b') ||
                  franchise.industry.includes('Business Services');
          break;
        default:
          match = true;
      }
      return match;
    });
    console.log(`After lifestyle filter: ${beforeFilter} -> ${matches.length}`);
  }
  
  // If no matches found, return some relevant alternatives
  if (matches.length === 0) {
    console.log('No exact matches found, providing relevant alternatives');
    
    // For Education, return all education franchises regardless of other criteria
    if (criteria.industry === 'Education') {
      matches = allCanadianFranchises.filter(f => f.industry === 'Education');
    }
    // For Business Services, return business service franchises
    else if (criteria.industry === 'Business Services') {
      matches = allCanadianFranchises.filter(f => f.industry === 'Business Services');
    }
    // Otherwise return some popular franchises
    else {
      matches = allCanadianFranchises.slice(0, 6);
    }
    console.log('Returning fallback matches:', matches.length);
  }
  
  // Calculate match scores
  matches = matches.map(franchise => ({
    ...franchise,
    matchScore: calculateMatchScore(franchise, criteria)
  }));
  
  // Sort by match score and prioritize Ontario
  matches.sort((a, b) => {
    // First sort by Ontario preference
    const aOntario = a.region.includes('Ontario') ? 1 : 0;
    const bOntario = b.region.includes('Ontario') ? 1 : 0;
    
    if (criteria.region === 'Ontario' && aOntario !== bOntario) {
      return bOntario - aOntario;
    }
    
    // Then by match score
    return (b.matchScore || 0) - (a.matchScore || 0);
  });
  
  const finalMatches = matches.slice(0, 9); // Return top 9 matches
  console.log('Final matches to return:', finalMatches.length);
  return finalMatches;
};

const getInvestmentRange = (range: string): [number, number] => {
  switch (range) {
    case '$5k - $25k': return [5000, 25000];
    case '$25k - $100k': return [25000, 100000];
    case '$100k+': return [100000, 10000000];
    default: return [0, 10000000];
  }
};

const getInvestmentMin = (range: string): number => {
  return getInvestmentRange(range)[0];
};

const getInvestmentMax = (range: string): number => {
  return getInvestmentRange(range)[1];
};

const calculateMatchScore = (franchise: Franchise, criteria: any): number => {
  let score = 0;
  
  // Industry match (40% weight)
  if (criteria.industry && criteria.industry !== 'Any Industry') {
    if (franchise.industry.toLowerCase().includes(criteria.industry.toLowerCase())) {
      score += 40;
    }
  } else {
    score += 20; // Partial score for "Any Industry"
  }
  
  // Investment range match (30% weight)
  if (criteria.investmentRange) {
    const [min, max] = getInvestmentRange(criteria.investmentRange);
    if (franchise.investmentMin <= max && franchise.investmentMax >= min) {
      score += 30;
    }
  }
  
  // Region match (20% weight, Ontario gets bonus)
  if (criteria.region) {
    if (franchise.region.includes(criteria.region)) {
      score += 20;
      // Ontario bonus
      if (criteria.region === 'Ontario' && franchise.region.includes('Ontario')) {
        score += 5;
      }
    } else if (franchise.region.includes('Canada-Wide')) {
      score += 15;
    }
  }
  
  // Lifestyle match (10% weight)
  if (criteria.lifestyle) {
    let lifestyleMatch = false;
    switch (criteria.lifestyle) {
      case 'Work from Home':
        lifestyleMatch = franchise.businessModel.includes('Service-Based') || 
                        franchise.businessModel.includes('Mobile');
        break;
      case 'Retail Storefront':
        lifestyleMatch = franchise.businessModel.includes('Retail') || 
                        franchise.businessModel.includes('Restaurant') ||
                        franchise.businessModel.includes('Store');
        break;
      case 'Service-Based':
        lifestyleMatch = franchise.businessModel.includes('Service');
        break;
      case 'B2B Operations':
        lifestyleMatch = franchise.businessModel.includes('B2B') ||
                        franchise.industry.includes('Business Services');
        break;
    }
    if (lifestyleMatch) score += 10;
  }
  
  return Math.min(score, 100); // Cap at 100%
};