import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, MapPin, Star, Clock, TrendingUp, Menu, MessageSquare, Users, FileText, Bell, Search, Filter, Phone, Mail, Globe, Award, CheckCircle, ArrowRight } from 'lucide-react';

const BuyersAlikeWebsite = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Provinces');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPartnerSlide, setCurrentPartnerSlide] = useState(0);

  const bannerAds = [
    {
      id: 1,
      advertiserName: "AMD Ryzen",
      tagline: "Save up to $300 on select Windows 11 laptops powered by AMD Ryzen processors.",
      logo: "AMD",
      ctaText: "Shop Now",
      ctaUrl: "https://amd.com",
      bgColor: "from-blue-700 to-blue-900"
    },
    {
      id: 2,
      advertiserName: "Microsoft Azure",
      tagline: "Get $200 Azure credit for new business accounts. Scale your startup with enterprise-grade cloud.",
      logo: "CLOUD",
      ctaText: "Start Free",
      ctaUrl: "#",
      bgColor: "from-cyan-600 to-blue-800"
    },
    {
      id: 3,
      advertiserName: "Salesforce",
      tagline: "CRM solutions trusted by 150,000+ companies. Try Salesforce free for 30 days.",
      logo: "CRM",
      ctaText: "Try Free",
      ctaUrl: "#",
      bgColor: "from-blue-500 to-cyan-700"
    }
  ];

  const sidebarAds = [
    {
      id: 4,
      advertiserName: "QuickBooks",
      description: "Accounting software for small business",
      highlight: "30% Off Annual Plan",
      logo: "QB",
      ctaUrl: "#"
    },
    {
      id: 5,
      advertiserName: "Zoom Business",
      description: "Professional video conferencing",
      highlight: "Free 30-Day Trial",
      logo: "ZOOM",
      ctaUrl: "#"
    }
  ];

  const vendorPartners = [
    {
      id: 101,
      businessName: "Premium Law Associates",
      displayName: "Premium Law Associates",
      category: "Legal Services",
      subcategory: "Business Law",
      bio: "Expert business law services for growing companies. Specializing in corporate law, contracts, intellectual property protection, and business formations. Over 15 years of experience serving Ontario businesses.",
      logoUrl: "LAW",
      coverImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop",
      tier: "premium",
      avgRating: 4.9,
      totalReviews: 127,
      location: {
        city: "Toronto",
        province: "ON",
        address: "123 Bay Street, Suite 1500"
      },
      contact: {
        phone: "(416) 555-0123",
        email: "contact@premiumlaw.ca",
        website: "https://www.premiumlaw.ca"
      },
      services: [
        { name: "Corporate Law", description: "Business formation and governance", priceRange: "$2,000 - $10,000" },
        { name: "Contract Drafting", description: "Custom business contracts", priceRange: "$500 - $5,000" },
        { name: "IP Protection", description: "Trademark and patent services", priceRange: "$1,500 - $8,000" },
        { name: "Business Formations", description: "Incorporate your business", priceRange: "$1,000 - $3,000" }
      ],
      backgroundCheckStatus: "approved",
      status: "active",
      featured: true
    },
    {
      id: 102,
      businessName: "Elite Accounting Group",
      displayName: "Elite Accounting Group",
      category: "Accounting",
      subcategory: "Tax Services",
      bio: "Professional accounting and tax services for businesses and individuals. Certified CPA firm with expertise in tax planning, bookkeeping, and financial consulting. We help you maximize savings and stay compliant.",
      logoUrl: "ACCT",
      coverImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=400&fit=crop",
      tier: "featured",
      avgRating: 4.8,
      totalReviews: 89,
      location: {
        city: "Ottawa",
        province: "ON",
        address: "456 Laurier Avenue"
      },
      contact: {
        phone: "(613) 555-0456",
        email: "info@eliteaccounting.ca",
        website: "https://www.eliteaccounting.ca"
      },
      services: [
        { name: "Tax Preparation", description: "Personal and business tax returns", priceRange: "$200 - $2,000" },
        { name: "Bookkeeping", description: "Monthly financial management", priceRange: "$300 - $1,500/month" },
        { name: "Financial Consulting", description: "Strategic financial planning", priceRange: "$150 - $300/hour" }
      ],
      backgroundCheckStatus: "approved",
      status: "active",
      featured: true
    },
    {
      id: 103,
      businessName: "Modern Marketing Studio",
      displayName: "Modern Marketing Studio",
      category: "Marketing",
      subcategory: "Digital Marketing",
      bio: "Full-service digital marketing agency helping ambitious brands grow online. We specialize in SEO, social media management, content creation, and paid advertising campaigns that deliver measurable results.",
      logoUrl: "MKT",
      coverImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop",
      tier: "featured",
      avgRating: 4.7,
      totalReviews: 56,
      location: {
        city: "Montreal",
        province: "QC",
        address: "789 Saint-Catherine Street"
      },
      contact: {
        phone: "(514) 555-0789",
        email: "hello@modernmarketing.ca",
        website: "https://www.modernmarketing.ca"
      },
      services: [
        { name: "SEO Services", description: "Improve search engine rankings", priceRange: "$1,000 - $5,000/month" },
        { name: "Social Media Management", description: "Full social media strategy", priceRange: "$800 - $3,000/month" },
        { name: "Content Creation", description: "Blog posts, videos, graphics", priceRange: "$500 - $2,500/month" }
      ],
      backgroundCheckStatus: "approved",
      status: "active",
      featured: true
    },
    {
      id: 104,
      businessName: "TechStart Legal",
      displayName: "TechStart Legal",
      category: "Legal Services",
      subcategory: "Startup Law",
      bio: "Startup-focused legal services with transparent pricing. We help entrepreneurs navigate the legal complexities of building a business, from incorporation to funding rounds.",
      logoUrl: "TECH",
      coverImageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=400&fit=crop",
      tier: "featured",
      avgRating: 4.9,
      totalReviews: 73,
      location: {
        city: "Toronto",
        province: "ON",
        address: "100 King Street West"
      },
      contact: {
        phone: "(416) 555-0100",
        email: "info@techstartlegal.ca",
        website: "https://www.techstartlegal.ca"
      },
      services: [
        { name: "Startup Incorporation", description: "Form your startup properly", priceRange: "$1,500 - $3,000" },
        { name: "Founder Agreements", description: "Protect your partnership", priceRange: "$800 - $2,000" },
        { name: "Term Sheet Review", description: "Investment agreement review", priceRange: "$1,000 - $3,000" }
      ],
      backgroundCheckStatus: "approved",
      status: "active",
      featured: true
    },
    {
      id: 105,
      businessName: "Test Vendor",
      displayName: "Test Vendor",
      category: "Legal Services",
      subcategory: "General Practice",
      bio: "General legal services for businesses and individuals in the Whitby area.",
      logoUrl: "TEST",
      tier: "basic",
      avgRating: 4.5,
      totalReviews: 12,
      location: {
        city: "Whitby",
        province: "ON",
        address: "123 Main Street"
      },
      contact: {
        phone: "(905) 555-0111",
        email: "contact@testvendor.ca",
        website: "https://www.testvendor.ca"
      },
      services: [
        { name: "Legal Consultation", description: "General legal advice", priceRange: "$150 - $300/hour" }
      ],
      backgroundCheckStatus: "approved",
      status: "active",
      featured: false
    },
    {
      id: 106,
      businessName: "Nicety AI Inc.",
      displayName: "Nicety AI Inc.",
      category: "Franchise Agent",
      subcategory: "Business Consulting",
      bio: "Franchise consulting and business development services. Helping entrepreneurs find the right franchise opportunities.",
      logoUrl: "AI",
      tier: "basic",
      avgRating: 0,
      totalReviews: 0,
      location: {
        city: "Ottawa",
        province: "ON",
        address: "850 Crossgate Street"
      },
      contact: {
        phone: "(613) 555-0850",
        email: "info@nicetyai.com",
        website: "https://www.nicetyai.com"
      },
      services: [
        { name: "Franchise Consulting", description: "Find the right franchise", priceRange: "Contact for pricing" }
      ],
      backgroundCheckStatus: "approved",
      status: "active",
      featured: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % bannerAds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [bannerAds.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerSlide((prev) => (prev + 1) % featuredVendorsForHome.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % bannerAds.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + bannerAds.length) % bannerAds.length);
  };

  const filteredVendors = vendorPartners.filter(vendor => {
    const matchesCategory = selectedCategory === 'All Services' || vendor.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Provinces' || vendor.location.province === selectedLocation;
    const matchesSearch = searchQuery === '' ||
      vendor.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch && vendor.status === 'active';
  });

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    const tierOrder: Record<string, number> = { premium: 1, featured: 2, basic: 3 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  const featuredVendorsForHome = vendorPartners
    .filter(v => (v.tier === 'premium' || v.tier === 'featured') && v.status === 'active')
    .slice(0, 8);

  const nextPartnerSlide = () => {
    setCurrentPartnerSlide((prev) => (prev + 1) % featuredVendorsForHome.length);
  };

  const prevPartnerSlide = () => {
    setCurrentPartnerSlide((prev) => (prev - 1 + featuredVendorsForHome.length) % featuredVendorsForHome.length);
  };

  const categories = ['All Services', 'Legal Services', 'Accounting', 'Marketing', 'Franchise Agent'];
  const provinces = ['All Provinces', 'ON', 'QC', 'BC', 'AB'];

  const HomePageView = () => (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="relative">
          <div className="absolute top-2 left-4 z-10">
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
              Sponsored
            </span>
          </div>

          <div className={`relative bg-gradient-to-r ${bannerAds[currentAdIndex].bgColor} overflow-hidden`}>
            <div className="container mx-auto px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-8 flex-1">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-lg p-3 w-28 h-20 flex items-center justify-center">
                    <div className="text-red-600 font-bold text-xl">{bannerAds[currentAdIndex].logo}</div>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {bannerAds[currentAdIndex].tagline}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {bannerAds[currentAdIndex].advertiserName}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button className="bg-white hover:bg-gray-100 text-blue-700 px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg text-sm">
                    {bannerAds[currentAdIndex].ctaText}
                  </button>
                </div>
              </div>

              <button
                onClick={prevAd}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-full transition-all z-10"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextAd}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-full transition-all z-10"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-br from-cyan-400/20 to-transparent transform skew-x-12"></div>

            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {bannerAds.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAdIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentAdIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Connect with<br />
                <span className="text-yellow-400">Like-Minded</span><br />
                Business Partners
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Join the premier platform for entrepreneurs, investors, and business professionals to discover partnerships, joint ventures, and investment opportunities.
              </p>
              <div className="flex gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold transition-all text-lg">
                  Start Networking Today →
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold transition-all text-lg">
                  Watch Demo
                </button>
              </div>
              <p className="mt-6 text-sm text-gray-400">See How Connections Lead to Success</p>

              <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="relative">
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 mb-8">Shared Goal</p>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-gray-400">Entrepreneur</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-gray-400">Investor</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-gray-400">Partner</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-gray-400">Expert</p>
                    </div>
                  </div>

                  <p className="text-center text-xs text-gray-500 mt-6">Initial Connections Form</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {(() => {
                const vendor = featuredVendorsForHome[currentPartnerSlide];
                if (!vendor) return null;

                return (
                  <div
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setSelectedPage('vendor-profile');
                    }}
                    className={`cursor-pointer relative ${
                      vendor.tier === 'premium' ? 'ring-2 ring-yellow-400' : ''
                    }`}
                    style={{ height: '500px' }}
                  >
                    {vendor.coverImageUrl && (
                      <div className="relative h-full overflow-hidden">
                        <img
                          src={vendor.coverImageUrl}
                          alt={vendor.displayName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent"></div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 bg-orange-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {vendor.logoUrl}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-white mb-1">{vendor.displayName}</h3>
                          <p className="text-sm text-gray-300">{vendor.category}</p>
                        </div>
                      </div>

                      {vendor.avgRating > 0 && (
                        <div className="flex items-center gap-2 text-white mb-4">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{vendor.avgRating}</span>
                          <span className="text-gray-400 text-sm">({vendor.totalReviews} reviews)</span>
                        </div>
                      )}

                      <div className="flex justify-center gap-2">
                        {featuredVendorsForHome.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPartnerSlide(idx);
                            }}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentPartnerSlide ? 'bg-white w-6' : 'bg-white/40 w-2'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPartnerSlide();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700/80 hover:bg-gray-600 backdrop-blur-sm p-2 rounded-full transition-all z-10"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPartnerSlide();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-700/80 hover:bg-gray-600 backdrop-blur-sm p-2 rounded-full transition-all z-10"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Create Profile</h3>
                  <p className="text-sm text-gray-600">Join our network and showcase your business</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Find Partners</h3>
                  <p className="text-sm text-gray-600">Discover like-minded professionals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2">Grow Together</h3>
                  <p className="text-sm text-gray-600">Build partnerships that drive success</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {sidebarAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded-bl-lg">
                  AD
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-3xl font-bold text-orange-600">{ad.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">{ad.advertiserName}</h3>
                    <p className="text-gray-600 text-xs mb-2">{ad.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-sm">{ad.highlight}</span>
                      <button className="text-orange-600 hover:text-orange-700 font-semibold text-xs">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Become a Vendor</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Join our network of trusted service providers
                </p>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold transition-all text-sm">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VendorDirectoryView = () => (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-12">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-3">Vendor Directory</h1>
          <p className="text-xl text-white/90">Explore our trusted network of verified service providers</p>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {provinces.map(prov => (
                    <option key={prov}>{prov}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {sortedVendors.length} Vendor{sortedVendors.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setSelectedPage('vendor-profile');
                  }}
                  className={`bg-white rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer relative ${
                    vendor.tier === 'premium' ? 'border-2 border-yellow-400' :
                    vendor.tier === 'featured' ? 'border-2 border-orange-200' : 'border border-gray-200'
                  }`}
                >
                  {(vendor.tier === 'premium' || vendor.tier === 'featured') && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {vendor.tier === 'premium' ? 'Premium' : 'Featured'}
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {vendor.logoUrl}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">{vendor.displayName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{vendor.category}</p>
                    <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{vendor.bio}</p>

                    <div className="flex flex-col gap-2 text-sm text-gray-600 mb-3 w-full">
                      <div className="flex items-center justify-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.location.city}, {vendor.location.province}</span>
                      </div>
                      {vendor.avgRating > 0 && (
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{vendor.avgRating}</span>
                          <span className="text-gray-400">({vendor.totalReviews})</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-medium">Verified</span>
                      </div>
                    </div>

                    {vendor.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {vendor.services.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {service.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {sortedVendors.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No vendors found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Services');
                    setSelectedLocation('All Provinces');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-xl p-6 sticky top-6">
              <div className="text-center">
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">
                  SPONSORED
                </div>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-3">Stand Out From The Crowd</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Get premium placement at the top of search results and increase your visibility by 10x
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="text-3xl font-bold text-orange-600 mb-1">$299</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all mb-3">
                  Upgrade to Featured
                </button>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Priority placement in search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Featured badge on profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>5x more profile views</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VendorProfileView = () => {
    if (!selectedVendor) return null;

    return (
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
          {selectedVendor.coverImageUrl && (
            <>
              <img
                src={selectedVendor.coverImageUrl}
                alt={selectedVendor.displayName}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </>
          )}
          <button
            onClick={() => setSelectedPage('vendors')}
            className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            ← Back to Directory
          </button>
        </div>

        <div className="container mx-auto px-8 -mt-20 relative z-10 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                      {selectedVendor.logoUrl}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-3xl font-bold">{selectedVendor.displayName}</h1>
                      {(selectedVendor.tier === 'premium' || selectedVendor.tier === 'featured') && (
                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                          {selectedVendor.tier === 'premium' ? 'PREMIUM' : 'FEATURED'}
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-3">
                      {selectedVendor.category}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      {selectedVendor.avgRating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{selectedVendor.avgRating}</span>
                          <span className="text-gray-500">({selectedVendor.totalReviews} reviews)</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{selectedVendor.location.city}, {selectedVendor.location.province}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle className="w-5 h-5" />
                        <span>Background Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{selectedVendor.bio}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Services Offered
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedVendor.services.map((service: any, idx: number) => (
                      <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <p className="text-sm font-semibold text-orange-600">{service.priceRange}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold">{selectedVendor.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{selectedVendor.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a href={selectedVendor.contact.website} className="font-semibold text-blue-600 hover:underline">
                          {selectedVendor.contact.website}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-semibold">{selectedVendor.location.address}</p>
                        <p className="text-sm text-gray-600">{selectedVendor.location.city}, {selectedVendor.location.province}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Book Consultation
                  </button>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Send Message
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                    <Globe className="w-5 h-5" />
                    Visit Website
                  </button>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bell className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Member Access Required</p>
                      <p className="text-xs text-gray-600 mb-2">
                        Upgrade to directly contact vendors and unlock all features
                      </p>
                      <button className="text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1.5 rounded font-bold transition-all">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Similar Vendors</h3>
                <div className="space-y-3">
                  {vendorPartners
                    .filter(v => v.category === selectedVendor.category && v.id !== selectedVendor.id)
                    .slice(0, 3)
                    .map((vendor) => (
                      <div
                        key={vendor.id}
                        onClick={() => setSelectedVendor(vendor)}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
                      >
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl font-bold text-orange-600">
                          {vendor.logoUrl}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{vendor.displayName}</h4>
                          <p className="text-xs text-gray-500">{vendor.location.city}, {vendor.location.province}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-3 border-b border-gray-700">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4">
          <span className="text-sm font-semibold">Demo Navigation:</span>
          <button
            onClick={() => setSelectedPage('home')}
            className={`px-4 py-1.5 rounded-lg font-semibold transition-all text-sm ${
              selectedPage === 'home'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            Homepage
          </button>
          <button
            onClick={() => setSelectedPage('vendors')}
            className={`px-4 py-1.5 rounded-lg font-semibold transition-all text-sm ${
              selectedPage === 'vendors'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            Vendor Directory
          </button>
          {selectedVendor && (
            <button
              onClick={() => setSelectedPage('vendor-profile')}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-all text-sm ${
                selectedPage === 'vendor-profile'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Vendor Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-52px)]">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-gray-900 text-xl">
                BA
              </div>
              <span className="font-bold text-lg">Buyers Alike</span>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <Users className="w-5 h-5" />
                <span>Partnerships</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <FileText className="w-5 h-5" />
                <span>Opportunities</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <MapPin className="w-5 h-5" />
                <span>Recommendation</span>
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setSelectedPage('vendors'); }}
                className="flex items-center gap-3 px-4 py-3 bg-yellow-50 text-gray-900 rounded-lg font-medium transition-all"
              >
                <FileText className="w-5 h-5" />
                <span>Vendors</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <MessageSquare className="w-5 h-5" />
                <span>Messaging</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <MessageSquare className="w-5 h-5" />
                <span>Forum</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                <span>News</span>
              </a>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <Users className="w-5 h-5" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </a>
          </div>
        </div>

        {selectedPage === 'home' && <HomePageView />}
        {selectedPage === 'vendors' && <VendorDirectoryView />}
        {selectedPage === 'vendor-profile' && <VendorProfileView />}
      </div>
    </div>
  );
};

export default BuyersAlikeWebsite;
