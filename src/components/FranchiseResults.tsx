import React from 'react';
import { ArrowLeft, Filter, RefreshCw, Star, TrendingUp, Search } from 'lucide-react';
import { Franchise, FranchiseMatchRequest } from '../types/franchise';
import { FranchiseCard } from './FranchiseCard';
import { FranchiseDetail } from './FranchiseDetail';

interface FranchiseResultsProps {
  matches: Franchise[];
  searchCriteria: FranchiseMatchRequest;
  onBack: () => void;
  onRetakeQuiz: () => void;
}

export const FranchiseResults: React.FC<FranchiseResultsProps> = ({
  matches,
  searchCriteria,
  onBack,
  onRetakeQuiz
}) => {
  const [selectedFranchise, setSelectedFranchise] = React.useState<Franchise | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMatches = React.useMemo(() => {
    if (!searchTerm.trim()) return matches;

    const lowerSearch = searchTerm.toLowerCase();
    return matches.filter(franchise =>
      franchise.name.toLowerCase().includes(lowerSearch) ||
      franchise.description.toLowerCase().includes(lowerSearch) ||
      franchise.industry.toLowerCase().includes(lowerSearch)
    );
  }, [matches, searchTerm]);

  if (selectedFranchise) {
    return (
      <FranchiseDetail
        franchise={selectedFranchise}
        onBack={() => setSelectedFranchise(null)}
        relatedFranchises={matches.filter(f => f.id !== selectedFranchise.id).slice(0, 3)}
        onFranchiseSelect={setSelectedFranchise}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to News
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Your Franchise Matches</h1>
              <p className="text-xl text-white/90 font-light mt-2">
                {matches.length} Canadian franchises tailored to your preferences
              </p>
            </div>
          </div>

          {/* Search Criteria Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Your Search Criteria:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-white/70 text-sm">Industry</span>
                <p className="font-medium">{searchCriteria.industry}</p>
              </div>
              <div>
                <span className="text-white/70 text-sm">Investment</span>
                <p className="font-medium">{searchCriteria.investmentRange}</p>
              </div>
              <div>
                <span className="text-white/70 text-sm">Lifestyle</span>
                <p className="font-medium">{searchCriteria.lifestyle}</p>
              </div>
              <div>
                <span className="text-white/70 text-sm">Region</span>
                <p className="font-medium">{searchCriteria.region}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search franchises by name, description, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">
                {filteredMatches.length} franchise{filteredMatches.length !== 1 ? 's' : ''} found
                {searchTerm && ` (filtered from ${matches.length})`}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Sorted by match score
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onRetakeQuiz}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Quiz
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              <Filter className="w-4 h-4" />
              Refine Results
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMatches.map((franchise, index) => (
              <div
                key={franchise.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FranchiseCard
                  franchise={franchise}
                  onLearnMore={setSelectedFranchise}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              {searchTerm ? (
                <Search className="w-8 h-8 text-blue-500" />
              ) : (
                <Star className="w-8 h-8 text-blue-500" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No franchises match your search' : 'No matches found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try different keywords or clear your search to see all results'
                : 'Try adjusting your criteria to see more franchise opportunities'
              }
            </p>
            <div className="flex gap-3 justify-center">
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={onRetakeQuiz}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Connect with franchise representatives to learn more about investment opportunities, 
            training programs, and support systems available to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200">
              Schedule Consultation
            </button>
            <button className="px-8 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200">
              Download Franchise Guide
            </button>
          </div>
        </div>
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