import React, { useState, useEffect } from 'react';
import { Building2, Megaphone, Search, Filter } from 'lucide-react';
import { VendorApplicationForm } from './VendorApplicationForm';
import { AdvertisingApplicationForm } from './AdvertisingApplicationForm';
import { VendorCard } from './VendorCard';
import { VendorDetailModal } from './VendorDetailModal';
import { supabase } from '../services/supabaseClient';
import { ApprovedVendor, SERVICE_TYPES, CANADIAN_PROVINCES } from '../types/vendor';

export const VendorsPage: React.FC = () => {
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showAdvertisingForm, setShowAdvertisingForm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<ApprovedVendor | null>(null);
  const [vendors, setVendors] = useState<ApprovedVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('approved_vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error loading vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.full_legal_company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService = !selectedService || vendor.service_type === selectedService;
    const matchesProvince = !selectedProvince || vendor.province === selectedProvince;

    return matchesSearch && matchesService && matchesProvince;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vendor Directory</h1>
          <p className="text-xl text-orange-100">Connect with trusted service providers and advertising partners</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900">Become a Vendor</h2>
                <p className="text-slate-600">Offer your services to our community</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Join our network of trusted service providers. Share your expertise in accounting, legal services, marketing, real estate, and more.
            </p>
            <button
              onClick={() => setShowVendorForm(true)}
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Apply Now
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Megaphone className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900">Advertise with Us</h2>
                <p className="text-slate-600">Reach your target audience effectively</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Promote your business or franchise to thousands of engaged users. Multiple advertising options available to suit your needs.
            </p>
            <button
              onClick={() => setShowAdvertisingForm(true)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Featured Vendors</h2>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  <option value="">All Services</option>
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  <option value="">All Provinces</option>
                  {CANADIAN_PROVINCES.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600">Loading vendors...</p>
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Vendors Found</h3>
              <p className="text-slate-600">
                {vendors.length === 0
                  ? 'Be the first to join our vendor directory!'
                  : 'Try adjusting your filters or search query.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-slate-600">
                Showing {filteredVendors.length} {filteredVendors.length === 1 ? 'vendor' : 'vendors'}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map(vendor => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onClick={() => setSelectedVendor(vendor)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {showVendorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <div className="relative">
              <button
                onClick={() => setShowVendorForm(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
              >
                <span className="text-2xl text-slate-600">×</span>
              </button>
              <VendorApplicationForm />
            </div>
          </div>
        </div>
      )}

      {showAdvertisingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <div className="relative">
              <button
                onClick={() => setShowAdvertisingForm(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
              >
                <span className="text-2xl text-slate-600">×</span>
              </button>
              <AdvertisingApplicationForm />
            </div>
          </div>
        </div>
      )}

      {selectedVendor && (
        <VendorDetailModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
};
