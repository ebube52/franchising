export interface VendorApplication {
  id?: string;
  full_legal_company_name: string;
  street_number: string;
  street_name: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  service_type: string;
  documents?: any[];
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface AdvertisingApplication {
  id?: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  advertising_type: string;
  budget_range?: string;
  message?: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface ApprovedVendor {
  id: string;
  full_legal_company_name: string;
  street_number: string;
  street_name: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  service_type: string;
  logo_url?: string;
  description?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export const SERVICE_TYPES = [
  'Accounting & Financial Services',
  'Legal Services',
  'Marketing & Advertising',
  'Real Estate Services',
  'Construction & Renovation',
  'IT & Technology Services',
  'Consulting Services',
  'Training & Education',
  'Equipment & Supply',
  'Other'
];

export const ADVERTISING_TYPES = [
  'Banner Ads',
  'Featured Listing',
  'Newsletter Sponsorship',
  'Content Partnership',
  'Event Sponsorship',
  'Other'
];

export const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  'Over $25,000',
  'To Be Discussed'
];

export const CANADIAN_PROVINCES = [
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
