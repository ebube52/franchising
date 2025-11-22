import React, { useState } from 'react';
import { X, Search, DollarSign, MapPin, Award, Phone, Mail, Building2, FileText } from 'lucide-react';
import { Franchise } from '../types/franchise';

interface FranchiseDetailProps {
  franchise: Franchise;
  onBack: () => void;
  relatedFranchises: Franchise[];
  onFranchiseSelect: (franchise: Franchise) => void;
}

export const FranchiseDetail: React.FC<FranchiseDetailProps> = ({
  franchise,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    postalCode: '',
    email: '',
    investmentLevel: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! A BuyersAlike franchise expert will reach out to chat about your opportunities!');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      postalCode: '',
      email: '',
      investmentLevel: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">{franchise.name}</h1>
              <p className="text-slate-600 mt-1">Franchise Opportunity</p>
            </div>
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          <div className="lg:col-span-2 space-y-8">
            {franchise.image && (
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={franchise.image}
                  alt={franchise.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 pb-2 border-b-4 border-blue-600 inline-block">
                {franchise.brand} Franchise
              </h2>
              <div className="mt-6 text-slate-700 leading-relaxed text-lg space-y-4">
                <p>{franchise.description}</p>

                <p>
                  Founded in {franchise.established}, {franchise.brand} has over {franchise.territories} locations
                  open and serving communities across Canada. Each franchise location operates with the company's signature
                  systems and support, providing a proven business model for franchisees.
                </p>

                <p>
                  {franchise.brand} is known for its {franchise.supportProvided.join(', ').toLowerCase()};
                  and business support that helps franchisees succeed from day one.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-4 border-blue-600 inline-block">
                Values & History
              </h3>
              <div className="mt-6 text-slate-700 leading-relaxed text-lg space-y-4">
                <p>
                  The {franchise.brand} franchise is a proven business opportunity. Founders realized that while
                  everyone knows what success looks like, many entrepreneurs struggle to achieve it. They believe
                  that with the right support and systems, there is a better way to help aspiring business owners
                  reach their goals.
                </p>

                <p>
                  Home of comprehensive training and support programs, {franchise.brand}'s business model consists of
                  {franchise.businessModel.toLowerCase()} operations with highly qualified support staff. {franchise.brand} is a
                  community of franchise owners who will treat you like family.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Franchisor Details</h3>
              </div>
              <div className="border-b-2 border-blue-600 w-32 mb-6"></div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <span className="text-slate-600 font-medium">Incorporated Name:</span>
                    <p className="text-blue-600 font-bold text-lg mt-1">{franchise.brand}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Total Units:</span>
                    <p className="text-blue-600 font-bold text-lg mt-1">{franchise.territories}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Year Founded:</span>
                    <p className="text-blue-600 font-bold text-lg mt-1">{franchise.established}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Franchising Since:</span>
                    <p className="text-blue-600 font-bold text-lg mt-1">{franchise.established}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Training:</span>
                    <p className="text-blue-600 font-bold text-lg mt-1">Available</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Locations Available:</span>
                    <p className="text-blue-600 font-bold text-lg mt-1">See Below*</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Franchise Costs</h3>
              </div>
              <div className="border-b-2 border-blue-600 w-32 mb-6"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-700 font-medium">Initial Franchise Fee</span>
                  <span className="text-slate-900 font-bold text-lg">
                    ${franchise.franchiseFee?.toLocaleString() || 'Contact for details'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-700 font-medium">Total Investment</span>
                  <span className="text-slate-900 font-bold text-lg">
                    ${franchise.investmentMin?.toLocaleString()} - ${franchise.investmentMax?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-700 font-medium">Royalty Fee</span>
                  <span className="text-slate-900 font-bold text-lg">{franchise.royaltyFee}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-700 font-medium">Liquid Capital Required</span>
                  <span className="text-slate-900 font-bold text-lg">
                    ${franchise.requirements.liquidCapital?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-700 font-medium">Net Worth Required</span>
                  <span className="text-slate-900 font-bold text-lg">
                    ${franchise.requirements.netWorth?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Support & Training</h3>
              </div>
              <div className="border-b-2 border-blue-600 w-32 mb-6"></div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {franchise.supportProvided.map((support, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-50 rounded-lg p-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700 font-medium">{support}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Available Regions</h3>
              </div>
              <div className="border-b-2 border-blue-600 w-32 mb-6"></div>

              <p className="text-slate-600 mb-4">
                {franchise.region.join(', ')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Business Model</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">Type: </span>
                    <span className="text-slate-700">{franchise.businessModel}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">Industry: </span>
                    <span className="text-slate-700">{franchise.industry}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Schedule a Consultation</h3>
                <div className="border-b-2 border-white/30 w-24 mb-6"></div>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Learn more about your options for business ownership with a free, no-obligation consultation. Please enter your information below, and your BuyersAlike franchise expert will reach out to chat about your opportunities!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      First name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Last name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Phone number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(000) 000-0000"
                      required
                      className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Postal code*
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      required
                      className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      required
                      className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Investment Level*
                    </label>
                    <select
                      name="investmentLevel"
                      value={formData.investmentLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">Please Select</option>
                      <option value="5k-25k">$5,000 - $25,000</option>
                      <option value="25k-100k">$25,000 - $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="500k+">$500,000+</option>
                    </select>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    By pressing submit information, you agree that BuyersAlike may contact you by phone, email and or text message about your inquiry, which may be automated. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our Privacy Policy.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    Let's Talk
                  </button>
                </form>
              </div>

              {franchise.contactInfo && (
                <div className="mt-6 bg-white rounded-xl p-6 border-2 border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">Direct Contact</h4>
                  <div className="space-y-3">
                    {franchise.contactInfo.phone && (
                      <div className="flex items-center gap-3 text-slate-700">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span>{franchise.contactInfo.phone}</span>
                      </div>
                    )}
                    {franchise.contactInfo.email && (
                      <div className="flex items-center gap-3 text-slate-700">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="break-all">{franchise.contactInfo.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
