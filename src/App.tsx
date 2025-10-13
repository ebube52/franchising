import React, { useState } from 'react';
import { BusinessOpportunities } from './components/BusinessOpportunities';
import { FranchiseAPIManager } from './components/FranchiseAPIManager';
import { Database, Home } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Franchise Hub</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>

              <button
                onClick={() => setCurrentView('admin')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Database className="w-4 h-4" />
                API Manager
              </button>
            </div>
          </div>
        </div>
      </nav>

      {currentView === 'home' ? <BusinessOpportunities /> : <FranchiseAPIManager />}
    </div>
  );
}

export default App;