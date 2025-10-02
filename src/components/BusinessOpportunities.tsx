import React, { useState } from 'react';
import { NewsList } from './NewsList';
import { FranchiseHub } from './FranchiseHub';
import { ArrowLeft } from 'lucide-react';

export const BusinessOpportunities: React.FC = () => {
  const [currentView, setCurrentView] = useState<'news' | 'franchises'>('news');

  const handleSwitchToFranchises = () => {
    setCurrentView('franchises');
  };

  const handleBackToNews = () => {
    setCurrentView('news');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'news' ? (
        <div>
          <NewsList onFindFranchises={handleSwitchToFranchises} />
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={handleBackToNews}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </button>
            </div>
          </div>
          <FranchiseHub />
        </div>
      )}
    </div>
  );
};