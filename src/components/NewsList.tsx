import React, { useState, useMemo } from 'react';
import { Search, Filter, Newspaper, TrendingUp, Store } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { ArticleView } from './ArticleView';
import { designSystem, getCategoryColor } from '../styles/designSystem';

// Mock data
const mockArticles = [
  {
    id: 1,
    title: "Wall Street braces for CEO Trump",
    description: "From chip royalties to steel veto rights, Washington has become a shareholder, forcing Wall Street to price politics like cash flow. Market analysts are closely watching policy developments that could reshape entire industries.",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg",
    publisher: "Weekly Voice",
    date: "Dec 3, 2024",
    category: "Politics",
    readTime: "4 min read",
    author: "Sarah Johnson",
    views: 2400,
    likes: 89,
    comments: 23
  },
  {
    id: 2,
    title: "Tech Giants Report Strong Q4 Earnings Despite Market Volatility",
    description: "Major technology companies exceeded expectations in their quarterly reports, showing resilience in uncertain economic times. Cloud services and AI investments continue to drive growth across the sector.",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    publisher: "Investing.com",
    date: "Dec 2, 2024",
    category: "Technology",
    readTime: "3 min read",
    isSponsored: true,
    author: "Michael Chen",
    views: 1800,
    likes: 156,
    comments: 45
  },
  {
    id: 3,
    title: "Global Supply Chain Disruptions Ease as New Trade Agreements Take Effect",
    description: "International trade shows signs of recovery as recent diplomatic agreements begin to streamline global supply chains, offering hope for manufacturers and consumers alike who have faced shortages.",
    image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg",
    publisher: "CNHI News",
    date: "Dec 1, 2024",
    category: "Business",
    readTime: "5 min read",
    author: "Amanda Rodriguez",
    views: 1200,
    likes: 67,
    comments: 18
  },
  {
    id: 4,
    title: "Federal Reserve Signals Potential Rate Changes in 2024",
    description: "Economic indicators suggest the Federal Reserve may adjust interest rates in the coming months, with inflation data and employment figures playing key roles in monetary policy decisions.",
    image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg",
    publisher: "Finance Weekly",
    date: "Nov 30, 2024",
    category: "Finance",
    readTime: "6 min read",
    author: "David Kim",
    views: 3200,
    likes: 124,
    comments: 56
  },
  {
    id: 5,
    title: "Cryptocurrency Market Reaches New Milestone",
    description: "Digital assets continue to gain mainstream adoption as institutional investors increase their crypto holdings. Regulatory clarity and technological improvements drive market confidence.",
    image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg",
    publisher: "Tech Daily",
    date: "Nov 29, 2024",
    category: "Finance",
    readTime: "4 min read",
    author: "Lisa Wang",
    views: 2800,
    likes: 198,
    comments: 72
  },
  {
    id: 6,
    title: "Renewable Energy Investments Surge Globally",
    description: "Clean energy projects attract record investments as governments and corporations commit to sustainability goals. Solar and wind power installations reach unprecedented levels worldwide.",
    image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg",
    publisher: "Weekly Voice",
    date: "Nov 28, 2024",
    category: "Business",
    readTime: "5 min read",
    author: "James Thompson",
    views: 1600,
    likes: 93,
    comments: 34
  }
];

const categories = [
  { name: 'All', count: mockArticles.length },
  { name: 'Weekly Voice', count: mockArticles.filter(a => a.publisher === 'Weekly Voice').length },
  { name: 'Investing.com', count: mockArticles.filter(a => a.publisher === 'Investing.com').length },
  { name: 'CNHI News', count: mockArticles.filter(a => a.publisher === 'CNHI News').length },
  { name: 'Business', count: mockArticles.filter(a => a.category === 'Business').length },
  { name: 'Technology', count: mockArticles.filter(a => a.category === 'Technology').length },
  { name: 'Finance', count: mockArticles.filter(a => a.category === 'Finance').length },
];

interface NewsListProps {
  onFranchiseClick: () => void;
}

export const NewsList: React.FC<NewsListProps> = ({ onFranchiseClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof mockArticles[0] | null>(null);

  const filteredArticles = useMemo(() => {
    return mockArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || 
                            article.publisher === selectedCategory ||
                            article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getRelatedArticles = (currentArticle: typeof mockArticles[0]) => {
    return mockArticles
      .filter(article => 
        article.id !== currentArticle.id && 
        (article.category === currentArticle.category || article.publisher === currentArticle.publisher)
      )
      .slice(0, 3);
  };

  if (selectedArticle) {
    return (
      <ArticleView
        article={selectedArticle}
        relatedArticles={getRelatedArticles(selectedArticle)}
        onBack={() => setSelectedArticle(null)}
        onArticleClick={setSelectedArticle}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Buyers' Alike News</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Live Updates</span>
            </div>
            <button
              onClick={onFranchiseClick}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
            >
              <Store className="w-4 h-4" />
              <span className="text-sm font-medium">Find Franchises</span>
            </button>
          </div>
          <p className="text-xl text-white/90 font-light">Stay updated with the latest business insights and market trends</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm
                         bg-white/80 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-gray-600 mr-4">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.name;
              const categoryColors = getCategoryColor(category.name);
              
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 
                             border shadow-sm hover:shadow-md transform hover:scale-105
                             ${isSelected 
                               ? 'text-white shadow-lg' 
                               : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                  style={isSelected ? {
                    backgroundColor: categoryColors[500],
                    borderColor: categoryColors[500],
                    boxShadow: `0 4px 12px ${categoryColors[500]}30`
                  } : {}}
                >
                  {category.name}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    isSelected ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            {searchTerm && (
              <span className="text-blue-600"> for "{searchTerm}"</span>
            )}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NewsCard
                {...article}
                onClick={() => setSelectedArticle(article)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};