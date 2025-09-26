import React, { useState } from 'react';
import { X, Upload, Star, CreditCard, Check } from 'lucide-react';

interface FranchiseSubmissionFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const FranchiseSubmissionForm: React.FC<FranchiseSubmissionFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    franchiseName: '',
    industry: '',
    investmentMin: '',
    investmentMax: '',
    region: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    listingType: 'free'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const industries = [
    'Food & Beverage',
    'Business Services',
    'Health & Senior Care',
    'Real Estate',
    'Education',
    'Retail',
    'Automotive',
    'Fitness & Wellness'
  ];

  const regions = [
    'Ontario',
    'Quebec',
    'British Columbia',
    'Alberta',
    'Canada-Wide'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      image: imagePreview,
      status: 'pending',
      createdAt: new Date().toISOString(),
      id: `franchise-${Date.now()}`
    };

    onSubmit(submissionData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Franchise Name *
        </label>
        <input
          type="text"
          name="franchiseName"
          value={formData.franchiseName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your franchise name"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region *
          </label>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Investment (CAD) *
          </label>
          <input
            type="number"
            name="investmentMin"
            value={formData.investmentMin}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="25000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Investment (CAD) *
          </label>
          <input
            type="number"
            name="investmentMax"
            value={formData.investmentMax}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="150000"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your franchise opportunity, support provided, and what makes it unique..."
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Name *
        </label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your full name"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="contact@yourfranchise.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(555) 123-4567"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://www.yourfranchise.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo/Image Upload
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="text-red-600 hover:text-red-800"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Listing Type</h3>
        <p className="text-gray-600">Select the visibility level for your franchise listing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Listing */}
        <div
          className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
            formData.listingType === 'free'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData(prev => ({ ...prev, listingType: 'free' }))}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Free Listing</h4>
            <p className="text-2xl font-bold text-gray-900 mb-4">$0</p>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li>• Standard listing placement</li>
              <li>• Basic franchise information</li>
              <li>• Contact details included</li>
              <li>• Searchable by filters</li>
              <li>• Manual approval process</li>
            </ul>
          </div>
        </div>

        {/* Featured Listing */}
        <div
          className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 relative ${
            formData.listingType === 'featured'
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData(prev => ({ ...prev, listingType: 'featured' }))}
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" />
              FEATURED
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Featured Listing</h4>
            <p className="text-2xl font-bold text-gray-900 mb-1">$199</p>
            <p className="text-sm text-gray-500 mb-4">per month</p>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li>• ⭐ Featured badge display</li>
              <li>• Top placement in search results</li>
              <li>• Highlighted card design</li>
              <li>• Priority approval process</li>
              <li>• Enhanced visibility</li>
              <li>• Monthly analytics report</li>
            </ul>
          </div>
        </div>
      </div>

      {formData.listingType === 'featured' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">Payment Required</span>
          </div>
          <p className="text-yellow-700 text-sm">
            You'll be redirected to our secure payment processor to complete your featured listing purchase.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Submit Your Franchise</h2>
            <p className="text-gray-600">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={currentStep === 1 ? onClose : handlePrevious}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                {formData.listingType === 'featured' ? 'Proceed to Payment' : 'Submit for Review'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};