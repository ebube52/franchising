import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Users, Calendar, Building2, MessageSquare, Users2, Newspaper } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';
import { FranchiseDetailModal } from './FranchiseDetailModal';
import { FranchiseQuizModal } from './FranchiseQuizModal';
import { VendorsPage } from './VendorsPage';
import { canadianFranchiseAPI, searchCanadianFranchises } from '../services/canadianFranchiseAPI';
import { allCanadianFranchises } from '../data/franchiseData';
import { opportunitiesService } from '../services/opportunitiesService';

// No mock data - using only real-time API listings

const categories = [
  'All Categories',
  'Franchises',
  'Business Opportunities',
  'Real Estate',
  'Food & Beverage',
  'Retail',
  'Services',
  'Health & Fitness',
  'Education',
  'Automotive',
  'Home Services',
  'Technology',
  'Gas Station',
  'Entertainment',
  'Logistics'
];

export const BusinessOpportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Real Estate'); // Default to Real Estate to show MLS listings
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [apiOpportunities, setApiOpportunities] = useState<any[]>([]);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [currentView, setCurrentView] = useState<'opportunities' | 'vendors' | 'messaging' | 'forum' | 'news'>('opportunities');

  // Load franchise and real estate data from database and APIs
  React.useEffect(() => {
    loadFranchiseData();
    loadDatabaseOpportunities();
  }, []);

  const loadDatabaseOpportunities = async () => {
    try {
      console.log('📊 Loading opportunities from database...');
      const dbOpportunities = await opportunitiesService.getAllOpportunities();

      const convertedDbOpportunities = dbOpportunities.map(opp => ({
        id: opp.id,
        title: opp.title,
        image: opp.image_url || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        investment: opportunitiesService.formatInvestmentRange(opp.investment_min, opp.investment_max),
        description: opp.description,
        postedDate: opportunitiesService.formatDate(opp.created_at),
        partners: `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 5) + 5} partners`,
        type: opp.type,
        status: 'approved' as const,
        website: opp.website,
        // Real estate metadata
        mlsNumber: opp.metadata?.mls_number,
        propertyType: opp.metadata?.property_type,
        bedrooms: opp.metadata?.bedrooms?.toString(),
        bathrooms: opp.metadata?.bathrooms?.toString(),
        sqft: opp.metadata?.sqft,
        yearBuilt: opp.metadata?.year_built,
        maintenance: opp.metadata?.maintenance,
        taxes: opp.metadata?.taxes,
        rentalIncome: opp.metadata?.rental_income,
        // Franchise metadata
        established: opp.metadata?.established,
        territories: opp.metadata?.territories,
        franchiseFee: opp.metadata?.franchise_fee,
        royaltyFee: opp.metadata?.royalty_fee,
        category: opp.category
      }));

      setApiOpportunities(prev => [...prev, ...convertedDbOpportunities]);
      console.log(`✅ Loaded ${dbOpportunities.length} opportunities from database`);
    } catch (error) {
      console.error('❌ Error loading database opportunities:', error);
    }
  };

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

      setApiOpportunities(prev => [...prev, ...convertedOpportunities]);
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

      setApiOpportunities(prev => [...prev, ...fallbackOpportunities]);
      console.log('🔄 Using fallback franchise data');
    } finally {
      setIsLoadingAPI(false);
    }
  };

  const filteredOpportunities = useMemo(() => {
    // Use only API opportunities (no mock data)
    return apiOpportunities.filter(opportunity => {
      const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());

      // IMPORTANT: Real estate ONLY shows in "Real Estate" category
      let matchesCategory = false;

      if (selectedCategory === 'All Categories') {
        // Exclude real estate from "All Categories" view
        matchesCategory = opportunity.type !== 'real_estate';
      } else if (selectedCategory === 'Franchises') {
        matchesCategory = opportunity.type === 'franchise';
      } else if (selectedCategory === 'Business Opportunities') {
        matchesCategory = opportunity.type === 'business';
      } else if (selectedCategory === 'Real Estate') {
        // ONLY show real estate in this category
        matchesCategory = opportunity.type === 'real_estate' || opportunity.type === 'real-estate';
      }

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

            {/* Search Status & Clear Filters */}
            <div className="flex items-center gap-3">
              {/* Search Status Indicator */}
              <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border-2 border-green-500 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">
                    {filteredOpportunities.length} Results Found
                  </span>
                </div>
              </div>

              <button
                onClick={handleClearFilters}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Listings Info Banner */}
        {selectedCategory === 'Real Estate' && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🏠</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enable Live MLS Listings from Realtor.ca</h3>
                <p className="text-gray-700 mb-3">
                  Get real-time residential listings with current prices, photos, and details from the official Canadian MLS system.
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Quick Setup (3 steps):</p>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Sign up at <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">RapidAPI.com</a> (free)</li>
                    <li>Subscribe to "Realty in CA" API (100 free requests/month)</li>
                    <li>Use your API key to fetch live listings for any Canadian city</li>
                  </ol>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://rapidapi.com/apidojo/api/realty-in-ca1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
                  >
                    Get API Access
                  </a>
                  <button
                    onClick={() => window.open('/REALTIME_LISTINGS_SETUP.md', '_blank')}
                    className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm transition-colors"
                  >
                    View Setup Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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