import React from 'react';
import { Building2, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { ApprovedVendor } from '../types/vendor';

interface VendorCardProps {
  vendor: ApprovedVendor;
  onClick: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative overflow-hidden">
        {vendor.logo_url ? (
          <img
            src={vendor.logo_url}
            alt={vendor.full_legal_company_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Building2 className="w-20 h-20 text-white opacity-80" />
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {vendor.full_legal_company_name}
          </h3>
        </div>

        <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full mb-4">
          {vendor.service_type}
        </div>

        {vendor.description && (
          <p className="text-slate-600 text-sm line-clamp-3 mb-4">
            {vendor.description}
          </p>
        )}

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="line-clamp-1">
              {vendor.city}, {vendor.province}
            </span>
          </div>

          {vendor.contact_phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{vendor.contact_phone}</span>
            </div>
          )}

          {vendor.contact_email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="line-clamp-1">{vendor.contact_email}</span>
            </div>
          )}

          {vendor.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="line-clamp-1 text-orange-600 hover:underline">
                {vendor.website}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <button className="w-full py-2 bg-orange-50 text-orange-600 font-semibold rounded-lg hover:bg-orange-100 transition-colors">
          View Details
        </button>
      </div>
    </article>
  );
};
