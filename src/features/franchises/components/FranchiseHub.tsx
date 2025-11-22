import React, { useState, useEffect } from 'react';
import { Store, TrendingUp, Users, MapPin, DollarSign, Star, ArrowRight } from 'lucide-react';
import { FranchiseQuiz } from './FranchiseQuiz';
import { FranchiseResults } from './FranchiseResults';
import { FranchiseMatchRequest } from '../types/franchise';
import { getMatchingFranchises } from '../services/franchiseDataService';
import { franchiseDataService } from '../services/franchiseDataService';

interface FranchiseHubProps {
  onBack: () => void;
}

export const FranchiseHub: React.FC<FranchiseHubProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'landing' | 'quiz' | 'results'>('landing');
  const [quizResults, setQuizResults] = useState<{
    matches: any[];
    criteria: FranchiseMatchRequest;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    franchiseDataService.initializeCache().catch(err => {
      console.error('Failed to initialize cache:', err);
    });
  }, []);

  const handleQuizComplete = async (criteria: FranchiseMatchRequest) => {
    setIsLoading(true);
    try {
      const matches = await getMatchingFranchises(criteria);
      setQuizResults({ matches, criteria });
      setCurrentView('results');
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setCurrentView('quiz');
  };

  if (currentView === 'quiz') {
    return (
      <>
        <FranchiseQuiz
          onComplete={handleQuizComplete}
          onBack={() => setCurrentView('landing')}
        />
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Finding Your Perfect Match</h3>
              <p className="text-slate-600">Searching through thousands of franchise opportunities...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  if (currentView === 'results' && quizResults) {
    return (
      <FranchiseResults
        matches={quizResults.matches}
        searchCriteria={quizResults.criteria}
        onBack={onBack}
        onRetakeQuiz={handleRetakeQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight">Franchise Finder</h1>
            </div>
            
            <p className="text-2xl text-white/90 font-light mb-8 max-w-3xl mx-auto">
              Discover the perfect Canadian franchise opportunity tailored to your goals, budget, and lifestyle
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setCurrentView('quiz')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Franchise Quiz
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-200"
              >
                Back to News
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Canadian Franchises</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-white/80">Industries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">$5K+</div>
                <div className="text-white/80">Starting Investment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-white/80">Match Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our intelligent matching system connects you with franchise opportunities that align with your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Take the Quiz</h3>
            <p className="text-gray-600 leading-relaxed">
              Answer questions about your industry preferences, investment budget, lifestyle goals, and preferred region
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Get Matched</h3>
            <p className="text-gray-600 leading-relaxed">
              Our algorithm analyzes your responses and matches you with the best Canadian franchise opportunities
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Connect & Start</h3>
            <p className="text-gray-600 leading-relaxed">
              Review detailed franchise information and connect directly with franchisors to begin your journey
            </p>
          </div>
        </div>
      </div>

      {/* Featured Industries */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Franchise Industries</h2>
            <p className="text-xl text-gray-600">Explore opportunities across diverse business sectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Food & Beverage', icon: '🍕', count: '150+', color: 'from-orange-500 to-red-500' },
              { name: 'Business Services', icon: '💼', count: '80+', color: 'from-blue-500 to-indigo-500' },
              { name: 'Health & Senior Care', icon: '🏥', count: '60+', color: 'from-green-500 to-teal-500' },
              { name: 'Real Estate', icon: '🏠', count: '45+', color: 'from-purple-500 to-pink-500' },
              { name: 'Education', icon: '📚', count: '40+', color: 'from-yellow-500 to-orange-500' },
              { name: 'Retail', icon: '🛍️', count: '70+', color: 'from-indigo-500 to-purple-500' },
              { name: 'Automotive', icon: '🚗', count: '35+', color: 'from-gray-500 to-slate-500' },
              { name: 'Fitness & Wellness', icon: '💪', count: '25+', color: 'from-pink-500 to-rose-500' }
            ].map((industry, index) => (
              <div
                key={industry.name}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setCurrentView('quiz')}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {industry.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{industry.count} franchises</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Ranges */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Ranges</h2>
          <p className="text-xl text-gray-600">Find franchises that fit your budget</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { range: '$5K - $25K', description: 'Home-based businesses', icon: DollarSign, color: 'bg-green-500' },
            { range: '$25K - $100K', description: 'Service franchises', icon: DollarSign, color: 'bg-blue-500' },
            { range: '$100K - $500K', description: 'Retail & restaurants', icon: DollarSign, color: 'bg-purple-500' },
            { range: '$500K+', description: 'Premium opportunities', icon: DollarSign, color: 'bg-orange-500' }
          ].map((investment, index) => (
            <div
              key={investment.range}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
              onClick={() => setCurrentView('quiz')}
            >
              <div className={`w-12 h-12 ${investment.color} rounded-xl flex items-center justify-center mb-4`}>
                <investment.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{investment.range}</h3>
              <p className="text-gray-600 text-sm mb-4">{investment.description}</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                View Options <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Franchise?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of successful franchise owners who started their journey with our matching system. 
            Take the quiz now and discover opportunities tailored specifically for you.
          </p>
          <button
            onClick={() => setCurrentView('quiz')}
            className="px-12 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Franchise Journey
          </button>
        </div>
      </div>
    </div>
  );
};