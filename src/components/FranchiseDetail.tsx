import React from 'react';
import { ArrowLeft, ExternalLink, Phone, Mail, MapPin, DollarSign, Users, Calendar, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Franchise } from '../types/franchise';
import { FranchiseCard } from './FranchiseCard';

interface FranchiseDetailProps {
  franchise: Franchise;
  onBack: () => void;
  relatedFranchises: Franchise[];
  onFranchiseSelect: (franchise: Franchise) => void;
}

export const FranchiseDetail: React.FC<FranchiseDetailProps> = ({
  franchise,
  onBack,
  relatedFranchises,
  onFranchiseSelect
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Results
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img 
            src={franchise.image} 
            alt={franchise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {franchise.industry}
              </div>
              {franchise.matchScore && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {franchise.matchScore}% Match
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {franchise.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-3xl">
              {franchise.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <span className="text-sm opacity-80">Est.</span>
                <span className="font-semibold ml-1">{franchise.established}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <span className="text-sm opacity-80">Territories:</span>
                <span className="font-semibold ml-1">{franchise.territories.toLocaleString()}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Investment Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Total Investment</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(franchise.investmentMin)} - {formatCurrency(franchise.investmentMax)}
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-green-900">Franchise Fee</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(franchise.franchiseFee)}
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Royalty Fee</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {franchise.royaltyFee}
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">Business Model</h3>
                  </div>
                  <p className="text-lg font-semibold text-orange-900">
                    {franchise.businessModel}
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Requirements</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Liquid Capital Required</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(franchise.requirements.liquidCapital)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Net Worth Required</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(franchise.requirements.netWorth)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-medium text-gray-700">Experience Preferred</span>
                  <span className="font-semibold text-gray-900">
                    {franchise.requirements.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Provided */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Support & Training</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {franchise.supportProvided.map((support, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">{support}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Territory Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Territory & Locations</h2>
              
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Available Regions</h3>
                  <p className="text-gray-600">{franchise.region.join(', ')}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-900 font-medium">
                  Currently operating in {franchise.territories.toLocaleString()}+ territories across Canada
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started Today</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{franchise.contactInfo.phone}</p>
                    <p className="text-sm text-gray-600">Call for consultation</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{franchise.contactInfo.email}</p>
                    <p className="text-sm text-gray-600">Email for information</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  Request Information
                </button>
                
                <a
                  href={franchise.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
                
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Franchises */}
      {relatedFranchises.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Similar Opportunities</h2>
              <p className="text-gray-600 text-lg">Other franchises that match your criteria</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedFranchises.map((relatedFranchise, index) => (
                <div
                  key={relatedFranchise.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FranchiseCard
                    franchise={relatedFranchise}
                    onLearnMore={onFranchiseSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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