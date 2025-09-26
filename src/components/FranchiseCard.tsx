import React from 'react';
import { ExternalLink, MapPin, DollarSign, Users, Calendar, Phone, Mail, TrendingUp } from 'lucide-react';
import { Franchise } from '../types/franchise';

interface FranchiseCardProps {
  franchise: Franchise;
  onLearnMore: (franchise: Franchise) => void;
}

export const FranchiseCard: React.FC<FranchiseCardProps> = ({ franchise, onLearnMore }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      'Food & Beverage': 'from-orange-500 to-red-500',
      'Business Services': 'from-blue-500 to-indigo-500',
      'Health & Senior Care': 'from-green-500 to-teal-500',
      'Real Estate': 'from-purple-500 to-pink-500',
      'Education': 'from-yellow-500 to-orange-500',
      'Retail': 'from-indigo-500 to-purple-500',
      'Automotive': 'from-gray-500 to-slate-500',
    };
    return colors[industry as keyof typeof colors] || 'from-blue-500 to-purple-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={franchise.image} 
          alt={franchise.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Match Score Badge */}
        {franchise.matchScore && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {franchise.matchScore}% Match
          </div>
        )}
        
        {/* Industry Badge */}
        <div 
          className={`absolute top-4 left-4 bg-gradient-to-r ${getIndustryColor(franchise.industry)} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}
        >
          {franchise.industry}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Brand Name */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{franchise.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">Est. {franchise.established}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {franchise.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Investment</span>
            </div>
            <p className="text-sm font-semibold text-blue-900">
              {formatCurrency(franchise.investmentMin)} - {formatCurrency(franchise.investmentMax)}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">Territories</span>
            </div>
            <p className="text-sm font-semibold text-green-900">
              {franchise.territories.toLocaleString()}+ locations
            </p>
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{franchise.region.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Franchise Fee: {formatCurrency(franchise.franchiseFee)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Royalty: {franchise.royaltyFee}</span>
          </div>
        </div>

        {/* Support Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {franchise.supportProvided.slice(0, 3).map((support, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
            >
              {support}
            </span>
          ))}
          {franchise.supportProvided.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
              +{franchise.supportProvided.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onLearnMore(franchise)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Learn More
          </button>
          <a
            href={franchise.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{franchise.contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span className="truncate max-w-32">{franchise.contactInfo.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};