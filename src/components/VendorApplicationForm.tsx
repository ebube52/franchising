import React, { useState } from 'react';
import { Building2, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { VendorApplication, SERVICE_TYPES, CANADIAN_PROVINCES } from '../types/vendor';

export const VendorApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<VendorApplication>>({
    full_legal_company_name: '',
    street_number: '',
    street_name: '',
    city: '',
    province: '',
    postal_code: '',
    country: 'Canada',
    contact_name: '',
    contact_title: '',
    contact_email: '',
    contact_phone: '',
    service_type: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const documentsInfo = selectedFiles
        ? Array.from(selectedFiles).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
          }))
        : [];

      const { error } = await supabase
        .from('vendor_applications')
        .insert([
          {
            ...formData,
            documents: documentsInfo,
          },
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        full_legal_company_name: '',
        street_number: '',
        street_name: '',
        city: '',
        province: '',
        postal_code: '',
        country: 'Canada',
        contact_name: '',
        contact_title: '',
        contact_email: '',
        contact_phone: '',
        service_type: '',
      });
      setSelectedFiles(null);

      const fileInput = document.getElementById('vendor-documents') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Apply to be a Vendor</h2>
          <p className="text-slate-600">Fill out this form to express your interest in providing services</p>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Application Submitted Successfully!</p>
            <p className="text-sm text-green-700 mt-1">We'll review your application and get back to you soon.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Submission Failed</p>
            <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Legal Company Name *
          </label>
          <input
            type="text"
            name="full_legal_company_name"
            value={formData.full_legal_company_name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Street Number *
            </label>
            <input
              type="text"
              name="street_number"
              value={formData.street_number}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Street Name *
            </label>
            <input
              type="text"
              name="street_name"
              value={formData.street_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Province *
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Province</option>
              {CANADIAN_PROVINCES.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              required
              placeholder="A1A 1A1"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Country *
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Primary Point of Contact</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="contact_title"
                value={formData.contact_title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Service You Want to Provide *
          </label>
          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select a Service Type</option>
            {SERVICE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload Supporting Documents (e.g., ID, Certifications)
          </label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="vendor-documents"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              Choose files
            </label>
            <input
              id="vendor-documents"
              type="file"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
            />
            <span className="text-sm text-slate-600">
              {selectedFiles ? `${selectedFiles.length} file(s) selected` : 'No file chosen'}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Upload your identity proof, certifications, or other relevant documents. Allowed formats: Images, PDF, Word documents. You can select multiple files at once or add them one by one.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};
