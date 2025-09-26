import React, { useState } from 'react';
import { Search, ChevronDown, Users, MessageSquare, FileText, User, Settings, Shield, LogOut, Plus, Star } from 'lucide-react';
import { FranchiseQuizModal } from './FranchiseQuizModal';
import { OpportunityCard } from './OpportunityCard';
import { FranchiseDetailModal } from './FranchiseDetailModal';
import { FranchiseSubmissionForm } from './FranchiseSubmissionForm';
import { AdminDashboard } from './AdminDashboard';

interface Opportunity {
  id: string;
  title: string;
  image: string;
  investment: string;
  description: string;
  postedDate: string;
  partners: string;
  type: 'franchise' | 'business' | 'real-estate';
  website?: string;
  mlsNumber?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  sqft?: string;
  yearBuilt?: string;
  maintenance?: string;
  taxes?: string;
  rentalIncome?: string;
}

interface PendingFranchise {
  id: string;
  franchiseName: string;
  industry: string;
  investmentMin: string;
  investmentMax: string;
  region: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  listingType: 'free' | 'featured';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  image?: string;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Nicety Franchise',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    investment: '$10000.00 - $500000.00',
    description: 'Nicety is a comprehensive business services franchise offering innovative solutions for modern entrepreneurs.',
    postedDate: '21 September 2025',
    partners: '1/5 partners',
    type: 'franchise',
    website: 'https://nicety.io/'
  },
  {
    id: '2',
    title: 'Reno Box - Business Opportunity',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    investment: '$5000.00 - $100000.00',
    description: 'Renobox is a trade mark specializing in the rental of containers, mobile warehouses, and exhibition...',
    postedDate: '31 August 2025',
    partners: '1/5 partners',
    type: 'business',
    website: 'https://www.canadafranchiseopportunities.ca/franchise/46-renobox-business-opportunity/'
  },
  {
    id: '3',
    title: 'MLS® C8765432 - Toronto Financial District Condo',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    investment: '$589,900',
    description: '1+1 Bed, 1 Bath | 650 sq ft | Built 2018 | $2,800/month rental potential\n\nPrime Financial District location at Bay & Adelaide. Modern amenities include 24hr concierge, gym, rooftop terrace. Walking distance to Union Station, PATH network. Current tenant paying $2,750/month (lease expires June 2025). Building amenities: Indoor pool, party room, guest suites. Maintenance: $485/month. Property taxes: $3,200/year.\n\nInvestment Analysis: 5.6% cap rate, excellent rental demand in core downtown.',
    postedDate: '3 days ago',
    partners: 'Seeking 2-3 investors',
    type: 'real-estate',
    website: 'https://www.realtor.ca/real-estate/27657832/1-bed-1-bath-condo-88-scott-st-toronto-church-yonge-corridor',
    mlsNumber: 'C8765432',
    propertyType: 'Condominium',
    bedrooms: '1+1',
    bathrooms: '1',
    sqft: '650',
    yearBuilt: '2018',
    maintenance: '$485/month',
    taxes: '$3,200/year',
    rentalIncome: '$2,800/month potential'
  },
  {
    id: '4',
    title: 'MLS® W9876543 - Mississauga Fourplex Investment',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
    investment: '$1,349,000',
    description: '4 Units | 3,200 total sq ft | Built 1985, renovated 2020 | $6,400/month gross rental income\n\nFully tenanted fourplex in desirable Cooksville area. Each unit: 2 bed, 1 bath, 800 sq ft. Recent upgrades: New roof (2021), updated electrical, refinished hardwood floors, stainless appliances. Separate utilities, individual parking spots.\n\nCurrent Rents: Unit 1: $1,650, Unit 2: $1,600, Unit 3: $1,575, Unit 4: $1,575. All tenants long-term (2+ years). Walking distance to Cooksville GO Station, Square One Mall.\n\nInvestment Analysis: 5.7% cap rate, $76,800 annual gross income, excellent cash flow property.',
    postedDate: '1 week ago',
    partners: 'Seeking 1-2 partners',
    type: 'real-estate',
    website: 'https://www.realtor.ca/real-estate/27654321/4-unit-investment-property-mississauga',
    mlsNumber: 'W9876543',
    propertyType: 'Multi-Family (4 units)',
    bedrooms: '2 per unit',
    bathrooms: '1 per unit',
    sqft: '3,200 total',
    yearBuilt: '1985',
    maintenance: 'Owner managed',
    taxes: '$8,900/year',
    rentalIncome: '$6,400/month gross'
  },
  {
    id: '5',
    title: 'MLS® 1234567 - Ottawa Retail Plaza - Barrhaven',
    image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
    investment: '$2,950,000',
    description: '8 Retail Units | 12,500 sq ft total | Built 2008 | $22,400/month gross income\n\nHigh-traffic retail plaza in growing Barrhaven community. Anchor tenant: Metro grocery (5,000 sq ft, 10-year lease). Other tenants: Dental office, hair salon, restaurant, pharmacy, dry cleaner, insurance office, cell phone store.\n\nTenant Mix & Rents:\n• Metro Grocery: $8,500/month (expires 2032)\n• Dental Office: $3,200/month (expires 2027)\n• Restaurant: $4,100/month (expires 2026)\n• Other units: $1,100-$1,800/month\n\n150 parking spaces, excellent visibility from Strandherd Drive (25,000+ vehicles/day).\n\nInvestment Analysis: 9.1% cap rate, stable tenant mix, strong demographics.',
    postedDate: '5 days ago',
    partners: 'Seeking 3-4 investors',
    type: 'real-estate',
    website: 'https://www.loopnet.ca/listing/commercial-plaza-ottawa-on/12345678',
    mlsNumber: '1234567',
    propertyType: 'Retail Plaza',
    bedrooms: 'N/A',
    bathrooms: 'Multiple',
    sqft: '12,500',
    yearBuilt: '2008',
    maintenance: 'Triple net leases',
    taxes: '$35,000/year',
    rentalIncome: '$22,400/month gross'
  },
  {
    id: '6',
    title: 'MLS® R2876543 - Vancouver East Development Site',
    image: 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg',
    investment: '$1,988,000',
    description: '33x122 ft lot | 4,026 sq ft | RT-2 Zoning | Duplex development approved\n\nRare development opportunity in desirable Renfrew-Collingwood area. Existing 1940s house (rentable during development process - currently $2,200/month). City-approved plans for modern duplex: two 1,800 sq ft units, each 3 bed/2.5 bath.\n\nDevelopment Details:\n• Building permits: Approved & paid ($45,000)\n• Architectural plans: Complete\n• Estimated construction cost: $650,000\n• Timeline: 12-14 months\n• Projected sale value: $1.4M per unit\n\nLocation: Walk score 89, near SkyTrain, excellent schools. Comparable duplex sales: $2.6-2.9M.\n\nInvestment Analysis: Projected 35% ROI over 18 months including land holding period.',
    postedDate: '2 weeks ago',
    partners: 'Seeking experienced developer partner',
    type: 'real-estate',
    website: 'https://www.rew.ca/properties/development-opportunity-vancouver-east',
    mlsNumber: 'R2876543',
    propertyType: 'Development Land',
    bedrooms: 'Future: 3 per unit',
    bathrooms: 'Future: 2.5 per unit',
    sqft: '4,026 lot',
    yearBuilt: '1940 (existing house)',
    maintenance: 'N/A',
    taxes: '$6,800/year',
    rentalIncome: '$2,200/month (existing house)'
  },
  {
    id: '7',
    title: 'Calgary NW Rental Portfolio - 3 Properties',
    image: 'https://images.pexels.com/photos/1546167/pexels-photo-1546167.jpeg',
    investment: '$1,085,000',
    description: '3 Single-Family Homes | Total 3,850 sq ft | $4,950/month gross rental income\n\nTurnkey rental portfolio in established NW Calgary neighborhoods. All properties professionally managed, excellent tenant history.\n\nProperty Details:\n\n1) Brentwood Bungalow (MLS® C4567890)\n• 3 bed, 2 bath, 1,200 sq ft, built 1978\n• Rent: $1,750/month, tenant 3 years\n• Recent: New furnace, updated kitchen\n• Purchase price: $385,000\n\n2) Hillhurst Townhouse (MLS® C4567891)\n• 3 bed, 2.5 bath, 1,350 sq ft, built 1985\n• Rent: $1,800/month, tenant 2 years\n• Attached garage, finished basement\n• Purchase price: $420,000\n\n3) Kensington Character Home (MLS® C4567892)\n• 2 bed, 1 bath, 1,300 sq ft, built 1965\n• Rent: $1,400/month, tenant 4 years\n• Hardwood floors, updated electrical\n• Purchase price: $280,000\n\nInvestment Analysis: 5.5% cap rate, $59,400 annual income, positive cash flow $850/month.',
    postedDate: '10 days ago',
    partners: 'Seeking 2-3 partners',
    type: 'real-estate',
    website: 'https://www.kijiji.ca/v-commercial-office-space/calgary/rental-property-portfolio/1234567890',
    mlsNumber: 'Portfolio: C4567890-92',
    propertyType: 'Rental Portfolio (3 homes)',
    bedrooms: '2-3 per property',
    bathrooms: '1-2.5 per property',
    sqft: '3,850 total',
    yearBuilt: '1965-1985',
    maintenance: 'Professionally managed',
    taxes: '$12,500/year total',
    rentalIncome: '$4,950/month gross'
  },
  {
    id: '8',
    title: 'MLS® 28765432 - Montreal Student Housing Complex',
    image: 'https://images.pexels.com/photos/1370705/pexels-photo-1370705.jpeg',
    investment: '$825,000',
    description: '12-Unit Student Housing | 6,000 sq ft | Built 1925, renovated 2019 | $9,600/month gross income\n\nPrime student rental property 3 blocks from McGill University campus. Fully renovated triplex conversion with modern amenities while maintaining heritage character.\n\nUnit Breakdown:\n• 8 bachelor units: $650/month each\n• 4 one-bedroom units: $900/month each\n• All units: Private bathroom, kitchenette, WiFi included\n• Common areas: Laundry room, study lounge, bike storage\n\nBuilding Features:\n• Heritage stone exterior, modern interior\n• Individual heating/cooling controls\n• Security system with key fob access\n• Professional property management in place\n\nLocation: Milton-Parc area, walk to McGill, Metro Sherbrooke, restaurants, cafes. 98% occupancy rate historically.\n\nInvestment Analysis: 11.7% cap rate, $115,200 annual income, strong student rental market.',
    postedDate: '3 weeks ago',
    partners: 'Seeking 1-2 partners',
    type: 'real-estate',
    website: 'https://www.centris.ca/en/properties/student-housing-montreal',
    mlsNumber: '28765432',
    propertyType: 'Multi-Unit Residential',
    bedrooms: 'Bachelor & 1-bed units',
    bathrooms: '1 per unit',
    sqft: '6,000',
    yearBuilt: '1925',
    maintenance: 'Professionally managed',
    taxes: '$8,200/year',
    rentalIncome: '$9,600/month gross'
  },
  {
    id: '9',
    title: 'MLS® 202456789 - Halifax Waterfront Retail Space',
    image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg',
    investment: '$1,525,000',
    description: '2,800 sq ft Ground Floor Retail | Historic Properties District | $8,500/month rental income\n\nIconic waterfront commercial space in Halifax\'s premier tourist and business district. Ground floor of heritage building with 14-foot ceilings, exposed brick, large windows overlooking Halifax Harbour.\n\nSpace Details:\n• 2,800 sq ft main floor retail/restaurant space\n• 400 sq ft basement storage\n• Two street-facing entrances\n• Fully equipped commercial kitchen (if restaurant use)\n• Liquor license transferable\n• 6 parking spaces included (rare downtown)\n\nCurrent Tenant: Established seafood restaurant (8-year lease, 4 years remaining). Rent: $8,500/month triple net. Tenant responsible for utilities, maintenance, property taxes.\n\nLocation: Historic Properties, Harbourfront. 2M+ annual tourists, cruise ship terminal 200m, business district, convention center nearby.\n\nInvestment Analysis: 6.7% cap rate, stable long-term tenant, prime tourism location.',
    postedDate: '1 month ago',
    partners: 'Seeking 2-4 partners',
    type: 'real-estate',
    website: 'https://www.viewpoint.ca/map/halifax-waterfront-commercial',
    mlsNumber: '202456789',
    propertyType: 'Commercial Retail',
    bedrooms: 'N/A',
    bathrooms: '2 (public accessible)',
    sqft: '2,800 + 400 basement',
    yearBuilt: '1876',
    maintenance: 'Triple net lease',
    taxes: '$18,500/year',
    rentalIncome: '$8,500/month'
  }
];

export const BusinessOpportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [showFranchiseResults, setShowFranchiseResults] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [pendingFranchises, setPendingFranchises] = useState<PendingFranchise[]>([]);

  const categories = [
    'All Categories',
    'Franchises',
    'Business Opportunities',
    'Real Estate',
    'Food & Beverage',
    'Business Services',
    'Education',
    'Retail',
    'Real Estate'
  ];

  const handleQuizComplete = (matches: any[]) => {
    console.log('=== HANDLING QUIZ COMPLETION ===');
    console.log('Received matches:', matches.length);
    console.log('Match details:', matches.map(m => `${m.name} - ${m.industry}`));
    
    if (matches && matches.length > 0) {
      // Convert franchise matches to opportunity format with real data
        const formatCurrency = (min: number, max: number) => {
          const formatNumber = (num: number) => {
            if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
            if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
            return `$${num.toLocaleString()}`;
          };
          return `${formatNumber(min)} - ${formatNumber(max)}`;
        };

        const franchiseOpportunities = matches.map((franchise) => {
        return {
          id: `franchise-${franchise.id}`,
          title: franchise.name || franchise.brand,
          image: franchise.image || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
          investment: franchise.investmentMin && franchise.investmentMax 
            ? formatCurrency(franchise.investmentMin, franchise.investmentMax)
            : franchise.investment || 'Contact for Details',
          description: franchise.description || 'Franchise opportunity available',
          postedDate: 'Available Now',
          partners: `${franchise.matchScore || 85}% Match`,
          type: 'franchise' as const,
          website: franchise.website
        };
      });

      setOpportunities(franchiseOpportunities);
      setSelectedCategory('Franchises');
    } else {
      // Fallback: show some default franchises if no matches
      const defaultFranchises: Opportunity[] = [
        {
          id: 'tim-hortons-default',
          title: 'Tim Hortons',
          image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
          investment: '$438K - $2.2M',
          description: 'Canada\'s iconic coffee and donut chain offering a proven business model.',
          postedDate: 'Available Now',
          partners: '95% Match',
          type: 'franchise'
        }
      ];
      setOpportunities(defaultFranchises);
      setSelectedCategory('Franchises');
    }
    setShowFranchiseResults(true);
    setShowQuizModal(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setOpportunities(mockOpportunities);
    setShowFranchiseResults(false);
  };

  const handleFranchiseSubmission = (submissionData: any) => {
    const newFranchise: PendingFranchise = {
      ...submissionData,
      status: 'pending' as const
    };
    
    setPendingFranchises(prev => [...prev, newFranchise]);
    setShowSubmissionForm(false);
    
    // Show success message (you could add a toast notification here)
    alert('Franchise submission received! We\'ll review it within 24-48 hours.');
  };

  const handleApproveFranchise = (id: string) => {
    setPendingFranchises(prev => 
      prev.map(franchise => 
        franchise.id === id 
          ? { ...franchise, status: 'approved' as const }
          : franchise
      )
    );
    
    // Add to main opportunities list
    const approvedFranchise = pendingFranchises.find(f => f.id === id);
    if (approvedFranchise) {
      const newOpportunity: Opportunity = {
        id: approvedFranchise.id,
        title: approvedFranchise.franchiseName,
        image: approvedFranchise.image || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        investment: `$${parseInt(approvedFranchise.investmentMin).toLocaleString()} - $${parseInt(approvedFranchise.investmentMax).toLocaleString()}`,
        description: approvedFranchise.description,
        postedDate: 'Available Now',
        partners: approvedFranchise.listingType === 'featured' ? '⭐ Featured' : 'Standard Listing',
        type: 'franchise',
        website: approvedFranchise.website
      };
      
      setOpportunities(prev => {
        // If featured, add to beginning; otherwise add to end
        if (approvedFranchise.listingType === 'featured') {
          return [newOpportunity, ...prev];
        } else {
          return [...prev, newOpportunity];
        }
      });
    }
  };

  const handleRejectFranchise = (id: string) => {
    setPendingFranchises(prev => 
      prev.map(franchise => 
        franchise.id === id 
          ? { ...franchise, status: 'rejected' as const }
          : franchise
      )
    );
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || 
                           (selectedCategory === 'Franchises' && opp.type === 'franchise') ||
                           (selectedCategory === 'Business Opportunities' && opp.type === 'business') ||
                           (selectedCategory === 'Real Estate' && opp.type === 'real-estate');
    return matchesSearch && matchesCategory;
  });

  // Sort opportunities to show featured first
  const sortedOpportunities = filteredOpportunities.sort((a, b) => {
    const aFeatured = a.partners.includes('⭐');
    const bFeatured = b.partners.includes('⭐');
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return 0;
  });

  if (showAdminDashboard) {
    return (
      <AdminDashboard
        onBack={() => setShowAdminDashboard(false)}
        pendingFranchises={pendingFranchises}
        onApprove={handleApproveFranchise}
        onReject={handleRejectFranchise}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Buyers' Alike</span>
          </div>

          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Partnerships</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>Opportunities</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MessageSquare className="w-5 h-5" />
              <span>Messaging</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MessageSquare className="w-5 h-5" />
              <span>Forum</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText className="w-5 h-5" />
              <span>News</span>
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
            <div 
              className="flex items-center gap-3 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
              onClick={() => setShowAdminDashboard(true)}
            >
              <Shield className="w-5 h-5" />
              <span>Admin</span>
              {pendingFranchises.filter(f => f.status === 'pending').length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-auto">
                  {pendingFranchises.filter(f => f.status === 'pending').length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Business Opportunities</h1>
              <p className="text-gray-600 mt-1">
                {sortedOpportunities.length} opportunities available
                {sortedOpportunities.filter(o => o.partners.includes('⭐')).length > 0 && (
                  <span className="ml-2 text-yellow-600 font-medium">
                    • {sortedOpportunities.filter(o => o.partners.includes('⭐')).length} featured
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowSubmissionForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Submit Franchise
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                Saved to this PC
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-end gap-3">
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  🎯 Find My Match
                </button>
              </div>
            </div>
          </div>

          {/* Results Header */}
          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedOpportunities.map((opportunity) => (
              <OpportunityCard 
                key={opportunity.id} 
                opportunity={opportunity}
                onLearnMore={() => setSelectedOpportunity(opportunity)}
              />
            ))}
          </div>

          {/* Empty State */}
          {sortedOpportunities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
              <button
                onClick={() => setShowQuizModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                🚀 Take Franchise Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <FranchiseQuizModal
          onClose={() => setShowQuizModal(false)}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Franchise Submission Form */}
      {showSubmissionForm && (
        <FranchiseSubmissionForm
          onClose={() => setShowSubmissionForm(false)}
          onSubmit={handleFranchiseSubmission}
        />
      )}

      {/* Franchise Detail Modal */}
      {selectedOpportunity && (
        <FranchiseDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onPartner={() => {
            // Handle partner action
            console.log('Partner with:', selectedOpportunity.title);
            setSelectedOpportunity(null);
          }}
        />
      )}
    </div>
  );
};