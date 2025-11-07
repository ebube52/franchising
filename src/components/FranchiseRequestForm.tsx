import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FranchiseRequestFormProps {
  selectedFranchises: Array<{ id: string; title: string }>;
  onClose: () => void;
  onSubmit: (formData: FranchiseRequestData) => void;
}

export interface FranchiseRequestData {
  firstName: string;
  lastName: string;
  city: string;
  province: string;
  postalCode: string;
  email: string;
  phone: string;
  desiredLocation: string;
  availableCapital: string;
  bestTimeToCall: string;
  subscribe: boolean;
}

const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon'
];

const bestTimes = [
  'Morning (8am - 12pm)',
  'Afternoon (12pm - 5pm)',
  'Evening (5pm - 9pm)',
  'Anytime'
];

export const FranchiseRequestForm: React.FC<FranchiseRequestFormProps> = ({
  selectedFranchises,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<FranchiseRequestData>({
    firstName: '',
    lastName: '',
    city: '',
    province: '',
    postalCode: '',
    email: '',
    phone: '',
    desiredLocation: '',
    availableCapital: '',
    bestTimeToCall: '',
    subscribe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Request more information</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Selected Franchises */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-red-800 mb-3">
            {selectedFranchises.length} franchise(s) selected
          </h3>
          <div className="space-y-2">
            {selectedFranchises.map((franchise) => (
              <div key={franchise.id} className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 font-medium">{franchise.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            All fields identified by an asterisk (<span className="text-red-600">*</span>) are mandatory.
          </p>

          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              First name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Last name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              City <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Province <span className="text-red-600">*</span>
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="">Choose</option>
              {provinces.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Postal code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              placeholder="A1A 1A1"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              E-mail address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Phone number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Desired Location */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Desired location
            </label>
            <input
              type="text"
              name="desiredLocation"
              value={formData.desiredLocation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Available Capital */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Available capital to invest <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="availableCapital"
              value={formData.availableCapital}
              onChange={handleChange}
              required
              placeholder="$50,000"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Best Time to Call */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-1">
              Best time to call
            </label>
            <select
              name="bestTimeToCall"
              value={formData.bestTimeToCall}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="">Choose</option>
              {bestTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              name="subscribe"
              id="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="subscribe" className="text-sm text-gray-700">
              Subscribe to our newsletter and receive the latest updates about franchising in Canada.
            </label>
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-gray-500 italic pt-2">
            By submitting this form, you are authorizing Canada Franchise Opportunities to forward your
            information to the selected franchisor(s) and acknowledge that you have reviewed our{' '}
            <a href="#" className="text-red-700 underline">Privacy Policy</a>.
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gray-900 text-white rounded font-semibold hover:bg-gray-800 transition-colors"
            >
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
