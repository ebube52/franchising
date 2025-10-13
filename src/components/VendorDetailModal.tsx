import React from 'react';
import { X, MapPin, Phone, Mail, Globe, Building2, User } from 'lucide-react';
import { ApprovedVendor } from '../types/vendor';

interface VendorDetailModalProps {
  vendor: ApprovedVendor;
  onClose: () => void;
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({ vendor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-slate-900">Vendor Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
            {vendor.logo_url ? (
              <img
                src={vendor.logo_url}
                alt={vendor.full_legal_company_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-32 h-32 text-white opacity-80" />
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {vendor.full_legal_company_name}
              </h1>
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 font-medium rounded-full">
                {vendor.service_type}
              </div>
            </div>

            {vendor.description && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">About</h3>
                <p className="text-slate-600 leading-relaxed">{vendor.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  Address
                </h3>
                <div className="space-y-1 text-slate-700">
                  <p>{vendor.street_number} {vendor.street_name}</p>
                  <p>{vendor.city}, {vendor.province}</p>
                  <p>{vendor.postal_code}</p>
                  <p>{vendor.country}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Primary Contact
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-slate-900">{vendor.contact_name}</p>
                    <p className="text-sm text-slate-600">{vendor.contact_title}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <a
                        href={`tel:${vendor.contact_phone}`}
                        className="text-orange-600 hover:underline"
                      >
                        {vendor.contact_phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a
                        href={`mailto:${vendor.contact_email}`}
                        className="text-orange-600 hover:underline"
                      >
                        {vendor.contact_email}
                      </a>
                    </div>

                    {vendor.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <a
                href={`mailto:${vendor.contact_email}`}
                className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center"
              >
                Contact Vendor
              </a>
              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-100 text-slate-900 py-3 px-6 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-center"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
