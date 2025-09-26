import React, { useState } from 'react';
import { ArrowLeft, Check, X, Star, Eye, Calendar, DollarSign, MapPin, Building2 } from 'lucide-react';

interface PendingFranchise {
  id: string;
  franchiseName: string;
  industry: string;
  investmentMin: string;
  investmentMax: string;
  region: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  listingType: 'free' | 'featured';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  image?: string;
}

interface AdminDashboardProps {
  onBack: () => void;
  pendingFranchises: PendingFranchise[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBack,
  pendingFranchises,
  onApprove,
  onReject
}) => {
  const [selectedFranchise, setSelectedFranchise] = useState<PendingFranchise | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount);
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFranchises = pendingFranchises.filter(franchise => {
    if (filter === 'all') return true;
    return franchise.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (selectedFranchise) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <button 
              onClick={() => setSelectedFranchise(null)}
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Franchise Detail */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedFranchise.franchiseName}</h1>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {selectedFranchise.industry}
                    </span>
                    {selectedFranchise.listingType === 'featured' && (
                      <span className="px-3 py-1 bg-yellow-500 text-yellow-900 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured Listing
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedFranchise.status)}`}>
                      {selectedFranchise.status.charAt(0).toUpperCase() + selectedFranchise.status.slice(1)}
                    </span>
                  </div>
                </div>
                {selectedFranchise.image && (
                  <img 
                    src={selectedFranchise.image} 
                    alt={selectedFranchise.franchiseName}
                    className="w-24 h-24 rounded-lg object-cover border-2 border-white/20"
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Investment Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-green-900">Investment Range</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(selectedFranchise.investmentMin)} - {formatCurrency(selectedFranchise.investmentMax)}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Region</h3>
                  </div>
                  <p className="text-xl font-bold text-blue-900">{selectedFranchise.region}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Industry</h3>
                  </div>
                  <p className="text-xl font-bold text-purple-900">{selectedFranchise.industry}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedFranchise.description}</p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Contact Name</label>
                    <p className="text-gray-900 font-medium">{selectedFranchise.contactName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <p className="text-gray-900 font-medium">{selectedFranchise.contactEmail}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                    <p className="text-gray-900 font-medium">{selectedFranchise.contactPhone}</p>
                  </div>
                  {selectedFranchise.website && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Website</label>
                      <a 
                        href={selectedFranchise.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                      >
                        {selectedFranchise.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Submitted:</span>
                    <span className="ml-2 font-medium">{formatDate(selectedFranchise.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Listing Type:</span>
                    <span className="ml-2 font-medium capitalize">{selectedFranchise.listingType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium capitalize">{selectedFranchise.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">ID:</span>
                    <span className="ml-2 font-mono text-xs">{selectedFranchise.id}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedFranchise.status === 'pending' && (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      onApprove(selectedFranchise.id);
                      setSelectedFranchise(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    Approve Listing
                  </button>
                  <button
                    onClick={() => {
                      onReject(selectedFranchise.id);
                      setSelectedFranchise(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Reject Listing
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage franchise submissions and listings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingFranchises.filter(f => f.status === 'pending').length}
                </p>
                <p className="text-gray-600 text-sm">Pending Review</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingFranchises.filter(f => f.status === 'approved').length}
                </p>
                <p className="text-gray-600 text-sm">Approved</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingFranchises.filter(f => f.listingType === 'featured').length}
                </p>
                <p className="text-gray-600 text-sm">Featured Listings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ${pendingFranchises.filter(f => f.listingType === 'featured').length * 199}
                </p>
                <p className="text-gray-600 text-sm">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 text-xs">
                  ({status === 'all' ? pendingFranchises.length : pendingFranchises.filter(f => f.status === status).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Franchise List */}
        <div className="space-y-4">
          {filteredFranchises.map((franchise) => (
            <div key={franchise.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {franchise.image && (
                    <img 
                      src={franchise.image} 
                      alt={franchise.franchiseName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{franchise.franchiseName}</h3>
                      {franchise.listingType === 'featured' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(franchise.status)}`}>
                        {franchise.status.charAt(0).toUpperCase() + franchise.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>{franchise.industry}</span>
                      <span>{formatCurrency(franchise.investmentMin)} - {formatCurrency(franchise.investmentMax)}</span>
                      <span>{franchise.region}</span>
                      <span>Submitted {formatDate(franchise.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedFranchise(franchise)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  {franchise.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onApprove(franchise.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(franchise.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFranchises.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No franchises found</h3>
            <p className="text-gray-600">No franchise submissions match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};