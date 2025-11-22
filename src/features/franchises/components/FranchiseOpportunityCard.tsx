import React, { useState } from 'react';

interface FranchiseOpportunity {
  id: string;
  title: string;
  image: string;
  investment: string;
  description: string;
  type: string;
  category?: string;
}

interface FranchiseOpportunityCardProps {
  opportunity: FranchiseOpportunity;
  onLearnMore: () => void;
  onAddToRequest?: (id: string, selected: boolean) => void;
  isSelected?: boolean;
}

export const FranchiseOpportunityCard: React.FC<FranchiseOpportunityCardProps> = ({
  opportunity,
  onLearnMore,
  onAddToRequest,
  isSelected = false
}) => {
  const [selected, setSelected] = useState(isSelected);

  const handleAddToRequest = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (onAddToRequest) {
      onAddToRequest(opportunity.id, newSelected);
    }
  };

  // Parse investment to extract personal contribution and total investment
  const parseInvestment = (investment: string) => {
    const parts = investment.split('\n').map(s => s.trim()).filter(s => s);
    let personalContribution = '';
    let totalInvestment = '';

    parts.forEach(part => {
      if (part.toLowerCase().includes('personal contribution')) {
        personalContribution = part.replace(/personal contribution.*?:/i, '').trim();
      } else if (part.toLowerCase().includes('total investment')) {
        totalInvestment = part.replace(/total investment.*?:/i, '').trim();
      }
    });

    // If not found in multiline format, try to extract from single line
    if (!personalContribution && !totalInvestment) {
      const match = investment.match(/\$[\d,]+/g);
      if (match && match.length >= 2) {
        personalContribution = match[0];
        totalInvestment = match[1];
      } else if (match && match.length === 1) {
        totalInvestment = match[0];
      }
    }

    return { personalContribution, totalInvestment };
  };

  const { personalContribution, totalInvestment } = parseInvestment(opportunity.investment);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Logo/Image Section */}
      <div className="h-48 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {opportunity.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
          {opportunity.description}
        </p>

        {/* Investment Details */}
        <div className="space-y-1 mb-6">
          {personalContribution && (
            <p className="text-sm text-red-700">
              <span className="font-semibold">Personal contribution required:</span> {personalContribution}
            </p>
          )}
          {totalInvestment && (
            <p className="text-sm text-red-700">
              <span className="font-semibold">Total Investment:</span> {totalInvestment}
            </p>
          )}
          {!personalContribution && !totalInvestment && (
            <p className="text-sm text-red-700">
              <span className="font-semibold">Investment:</span> {opportunity.investment}
            </p>
          )}
        </div>

        {/* Add to Request Button */}
        <button
          onClick={handleAddToRequest}
          className="w-full flex items-center justify-center gap-2 py-2 text-red-700 hover:text-red-800 transition-colors"
        >
          <span className={`w-5 h-5 border-2 ${selected ? 'border-red-700 bg-red-700' : 'border-red-700'} rounded flex items-center justify-center`}>
            {selected && (
              <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </span>
          <span className="text-sm font-medium underline">Add to Request</span>
        </button>
      </div>
    </div>
  );
};
