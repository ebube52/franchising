import React from 'react';
import { Users, Calendar } from 'lucide-react';

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

interface OpportunityCardProps {
  opportunity: Opportunity;
  onLearnMore: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onLearnMore }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'franchise':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'business':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'real-estate':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={opportunity.image} 
          alt={opportunity.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Type Badge */}
        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border mb-3 ${getTypeColor(opportunity.type)}`}>
          {opportunity.type === 'franchise' ? 'Franchise' : 
           opportunity.type === 'business' ? 'Business' : 'Real Estate'}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{opportunity.title}</h3>

        {/* Investment */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💰</span>
            <div>
              <span className="text-sm text-gray-600">Price: </span>
              <span className="font-bold text-green-600 text-lg">{opportunity.investment}</span>
            </div>
          </div>
          
          {opportunity.type === 'real-estate' && (
            <>
              {opportunity.mlsNumber && (
                <div className="text-xs text-gray-500">
                  MLS® {opportunity.mlsNumber} • {opportunity.propertyType}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {opportunity.bedrooms && opportunity.bedrooms !== 'N/A' && (
                  <div className="flex items-center gap-1">
                    <span>🛏️</span>
                    <span>{opportunity.bedrooms} bed</span>
                  </div>
                )}
                {opportunity.bathrooms && opportunity.bathrooms !== 'N/A' && (
                  <div className="flex items-center gap-1">
                    <span>🚿</span>
                    <span>{opportunity.bathrooms} bath</span>
                  </div>
                )}
                {opportunity.sqft && (
                  <div className="flex items-center gap-1">
                    <span>📐</span>
                    <span>{opportunity.sqft} sq ft</span>
                  </div>
                )}
                {opportunity.rentalIncome && (
                  <div className="flex items-center gap-1">
                    <span>💵</span>
                    <span className="text-green-600 font-medium">{opportunity.rentalIncome}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
          {opportunity.description.split('\n')[0]}
        </p>

        {/* Learn More Button */}
        <button 
          onClick={onLearnMore}
          className="w-full mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Learn More & Contact
        </button>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Posted {opportunity.postedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{opportunity.partners}</span>
          </div>
        </div>
      </div>
    </div>
  );
};