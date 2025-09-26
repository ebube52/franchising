import React from 'react';
import { X } from 'lucide-react';

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

interface FranchiseDetailModalProps {
  opportunity: Opportunity;
  onClose: () => void;
  onPartner: () => void;
}

export const FranchiseDetailModal: React.FC<FranchiseDetailModalProps> = ({
  opportunity,
  onClose,
  onPartner
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{opportunity.title}</h2>
            <p className="text-gray-600">Category: Franchises</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Image */}
        <div className="h-64 overflow-hidden">
          <img 
            src={opportunity.image} 
            alt={opportunity.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Property Details for Real Estate */}
          {opportunity.type === 'real-estate' && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-green-600 text-lg ml-2">{opportunity.investment}</span>
                </div>
                {opportunity.mlsNumber && (
                  <div>
                    <span className="text-gray-600">MLS®:</span>
                    <span className="font-semibold ml-2">{opportunity.mlsNumber}</span>
                  </div>
                )}
                {opportunity.propertyType && (
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold ml-2">{opportunity.propertyType}</span>
                  </div>
                )}
                {opportunity.bedrooms && opportunity.bedrooms !== 'N/A' && (
                  <div>
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-semibold ml-2">{opportunity.bedrooms}</span>
                  </div>
                )}
                {opportunity.bathrooms && opportunity.bathrooms !== 'N/A' && (
                  <div>
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-semibold ml-2">{opportunity.bathrooms}</span>
                  </div>
                )}
                {opportunity.sqft && (
                  <div>
                    <span className="text-gray-600">Size:</span>
                    <span className="font-semibold ml-2">{opportunity.sqft} sq ft</span>
                  </div>
                )}
                {opportunity.yearBuilt && (
                  <div>
                    <span className="text-gray-600">Built:</span>
                    <span className="font-semibold ml-2">{opportunity.yearBuilt}</span>
                  </div>
                )}
                {opportunity.rentalIncome && (
                  <div>
                    <span className="text-gray-600">Rental Income:</span>
                    <span className="font-bold text-green-600 ml-2">{opportunity.rentalIncome}</span>
                  </div>
                )}
                {opportunity.taxes && (
                  <div>
                    <span className="text-gray-600">Property Taxes:</span>
                    <span className="font-semibold ml-2">{opportunity.taxes}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Investment for non-real estate */}
          {opportunity.type !== 'real-estate' && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💰</span>
              <div>
                <span className="text-sm text-gray-600">Investment: </span>
                <span className="font-semibold text-gray-900">{opportunity.investment}</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {opportunity.description}
            </div>
          </div>

          {/* Source Link */}
          {opportunity.website && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-sm">🔗</span>
                <span className="text-sm">Source: </span>
                <a 
                  href={opportunity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {opportunity.website}
                </a>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onPartner}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              🤝 Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};