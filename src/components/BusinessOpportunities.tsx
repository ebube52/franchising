import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Users, Calendar, Building2, MessageSquare, Users2, Newspaper } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';
import { FranchiseDetailModal } from './FranchiseDetailModal';
import { FranchiseQuizModal } from './FranchiseQuizModal';
import { VendorsPage } from './VendorsPage';
import { canadianFranchiseAPI, searchCanadianFranchises } from '../services/canadianFranchiseAPI';
import { allCanadianFranchises } from '../data/franchiseData';

// Mock data matching the image exactly
const mockOpportunities = [
  {
    id: 'nicety-franchise',
    title: 'Nicety Franchise',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    investment: '$10000.00 - $500000.00',
    description: 'Please approve',
    postedDate: '21 September 2025',
    partners: '1/5 partners',
    type: 'franchise' as const,
    status: 'pending'
  },
  {
    id: 'renobox-opportunity',
    title: 'Reno Box - Business Opportunity',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    investment: '$5000.00 - $100000.00',
    description: 'Renobox is a trade mark specializing in the rental of containers, mobile warehouses, and exhibition kiosks. Whether for your entrepreneurial or personal needs, we will find a product for you! When you choose to go into business with the Renobox opportunity, you will benefit from full start-up support as well as in the continuity of your business in light transportation according to the needs of the operator: - Market study and business plan - Funding support - Advertising program - Corporate identity: logos, lettering, business cards, promotional brochures, etc. - Comprehensive operational start-up and maintenance training',
    postedDate: '31 August 2025',
    partners: '1/5 partners',
    type: 'business' as const,
    status: 'approved',
    website: 'https://www.canadafranchiseopportunities.ca/franchise/46-renobox-business-opportunity/'
  },
  // Additional franchise opportunities
  {
    id: 'tim-hortons-franchise',
    title: 'Tim Hortons Franchise',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    investment: '$438000.00 - $2200000.00',
    description: 'Canada\'s iconic coffee and donut chain offering a proven business model with strong brand recognition and comprehensive support system.',
    postedDate: '15 September 2025',
    partners: '3/10 partners',
    type: 'franchise' as const,
    status: 'approved'
  },
  {
    id: 'subway-franchise',
    title: 'Subway Canada Franchise',
    image: 'https://images.pexels.com/photos/7129052/pexels-photo-7129052.jpeg',
    investment: '$116000.00 - $263000.00',
    description: 'World\'s largest submarine sandwich franchise with flexible formats and strong support system for Canadian entrepreneurs.',
    postedDate: '10 September 2025',
    partners: '2/8 partners',
    type: 'franchise' as const,
    status: 'approved'
  },
  {
    id: 'molly-maid-franchise',
    title: 'Molly Maid Franchise',
    image: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg',
    investment: '$90000.00 - $120000.00',
    description: 'Leading residential cleaning service franchise with home-based business model and flexible scheduling options.',
    postedDate: '5 September 2025',
    partners: '4/6 partners',
    type: 'franchise' as const,
    status: 'approved'
  },
  {
    id: 'kumon-franchise',
    title: 'Kumon Math and Reading Centers',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    investment: '$70000.00 - $140000.00',
    description: 'World\'s largest after-school math and reading program with proven curriculum and strong community presence.',
    postedDate: '1 September 2025',
    partners: '1/4 partners',
    type: 'franchise' as const,
    status: 'approved'
  }
];

const categories = [
  'All Categories',
  'Franchises',
  'Business Opportunities',
  'Real Estate',
  'Gas Station',
  'Entertainment',
  'Logistics',
  'Technology',
  'Food & Beverage',
  'Services'
];

export const BusinessOpportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Franchises'); // Default to Franchises as shown in image
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof mockOpportunities[0] | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [apiOpportunities, setApiOpportunities] = useState<any[]>([]);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [currentView, setCurrentView] = useState<'opportunities' | 'vendors' | 'messaging' | 'forum' | 'news'>('opportunities');

  // Load franchise data from APIs on component mount
  React.useEffect(() => {
    loadFranchiseData();
  }, []);

  const loadFranchiseData = async () => {
    setIsLoadingAPI(true);
    try {
      console.log('🚀 Loading Canadian franchise data from APIs...');
      
      // Search all Canadian franchise APIs
      const apiResults = await searchCanadianFranchises({
        industry: 'Any Industry',
        region: 'Canada-Wide'
      });
      
      console.log(`📊 Loaded ${apiResults.length} franchises from APIs`);
      
      // Convert API results to opportunity format
      const convertedOpportunities = apiResults.map(franchise => ({
        id: franchise.id,
        title: franchise.name,
        image: franchise.image,
        investment: `$${franchise.investmentMin.toLocaleString()}.00 - $${franchise.investmentMax.toLocaleString()}.00`,
        description: franchise.description,
        postedDate: new Date().toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        partners: `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 5) + 5} partners`,
        type: 'franchise' as const,
        status: 'approved' as const,
        website: franchise.website,
        // Additional franchise-specific data
        franchiseData: franchise
      }));
      
      setApiOpportunities(convertedOpportunities);
    } catch (error) {
      console.error('❌ Error loading franchise data:', error);
      
      // Fallback to local data
      const fallbackOpportunities = allCanadianFranchises.slice(0, 10).map(franchise => ({
        id: franchise.id,
        title: franchise.name,
        image: franchise.image,
        investment: `$${franchise.investmentMin.toLocaleString()}.00 - $${franchise.investmentMax.toLocaleString()}.00`,
        description: franchise.description,
        postedDate: new Date().toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        partners: `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 5) + 5} partners`,
        type: 'franchise' as const,
        status: 'approved' as const,
        franchiseData: franchise
      }));
      
      setApiOpportunities(fallbackOpportunities);
      console.log('🔄 Using fallback franchise data');
    } finally {
      setIsLoadingAPI(false);
    }
  };

  const filteredOpportunities = useMemo(() => {
    // Combine mock opportunities with API opportunities
    const allOpportunities = [...mockOpportunities, ...apiOpportunities];
    
    return allOpportunities.filter(opportunity => {
      const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || 
                            (selectedCategory === 'Franchises' && opportunity.type === 'franchise') ||
                            (selectedCategory === 'Business Opportunities' && opportunity.type === 'business') ||
                            (selectedCategory === 'Real Estate' && opportunity.type === 'real-estate');
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, apiOpportunities]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
  };

  const handleQuizComplete = (matches: any[]) => {
    setShowQuizModal(false);
    
    // Convert quiz matches to opportunity format and add to display
    const quizOpportunities = matches.map(franchise => ({
      id: `quiz-${franchise.id}`,
      title: `${franchise.name} (Quiz Match)`,
      image: franchise.image,
      investment: `$${franchise.investmentMin.toLocaleString()}.00 - $${franchise.investmentMax.toLocaleString()}.00`,
      description: `${franchise.matchScore}% Match - ${franchise.description}`,
      postedDate: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      partners: `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 5) + 5} partners`,
      type: 'franchise' as const,
      status: 'approved' as const,
      franchiseData: franchise
    }));
    
    // Add quiz results to the top of the list
    setApiOpportunities(prev => [...quizOpportunities, ...prev]);
    setSelectedCategory('Franchises'); // Switch to franchises to show results
  };

  const handlePartner = () => {
    // Handle partnership logic
    console.log('Partnership interest expressed');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold">
            B
          </div>
          <span className="text-lg font-semibold">Buyers' Alike</span>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setCurrentView('opportunities')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              currentView === 'opportunities'
                ? 'bg-yellow-500 text-black font-medium'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Opportunities</span>
          </button>
          <button
            onClick={() => setCurrentView('vendors')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              currentView === 'vendors'
                ? 'bg-yellow-500 text-black font-medium'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Vendors</span>
          </button>
          <button
            onClick={() => setCurrentView('messaging')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              currentView === 'messaging'
                ? 'bg-yellow-500 text-black font-medium'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messaging</span>
          </button>
          <button
            onClick={() => setCurrentView('forum')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              currentView === 'forum'
                ? 'bg-yellow-500 text-black font-medium'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Users2 className="w-4 h-4" />
            <span>Forum</span>
          </button>
          <button
            onClick={() => setCurrentView('news')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              currentView === 'news'
                ? 'bg-yellow-500 text-black font-medium'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">
            <div className="w-4 h-4"></div>
            <span>Profile</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">
            <div className="w-4 h-4"></div>
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded">
            <div className="w-4 h-4"></div>
            <span>Admin</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded">
            <div className="w-4 h-4"></div>
            <span>Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentView === 'vendors' ? (
          <div className="-m-8">
            <VendorsPage />
          </div>
        ) : currentView === 'messaging' ? (
          <div className="text-center py-16 text-white">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Messaging</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        ) : currentView === 'forum' ? (
          <div className="text-center py-16 text-white">
            <Users2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Forum</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        ) : currentView === 'news' ? (
          <div className="text-center py-16 text-white">
            <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">News</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        ) : (
          <>
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full px-4 py-3 border-2 border-yellow-500 rounded-lg bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <span className="text-gray-900">{selectedCategory}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoadingAPI && (
            <div className="col-span-full text-center py-8">
              <div className="inline-flex items-center gap-3 text-white">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
                <span>Live data from Franchimp RapidAPI + Canadian franchise APIs • {apiOpportunities.length} opportunities loaded</span>
              </div>
            </div>
          )}
          
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onLearnMore={() => setSelectedOpportunity(opportunity)}
            />
          ))}
        </div>

        {/* API Status Indicator */}
        {!isLoadingAPI && apiOpportunities.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live data from Canadian franchise APIs • {apiOpportunities.length} opportunities loaded</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No opportunities found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setShowQuizModal(true)}
                className="px-6 py-3 border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                🎯 Take Franchise Quiz
              </button>
              <button
                onClick={loadFranchiseData}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                🔄 Reload API Data
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {selectedOpportunity && (
          <FranchiseDetailModal
            opportunity={selectedOpportunity}
            onClose={() => setSelectedOpportunity(null)}
            onPartner={handlePartner}
          />
        )}

        {showQuizModal && (
          <FranchiseQuizModal
            onClose={() => setShowQuizModal(false)}
            onComplete={handleQuizComplete}
          />
        )}
          </>
        )}
      </div>
    </div>
  );
};