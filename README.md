# BuyersAlike - Canadian Franchise Matching Platform

A comprehensive franchise matching system that connects potential franchisees with Canadian franchise opportunities through an intelligent quiz-based matching algorithm.

## 🚀 Features

- **Smart Franchise Matching**: 4-step quiz wizard with weighted scoring algorithm
- **Real-Time API Integration**: Connects to 6+ major Canadian franchise platforms
- **Self-Service Portal**: Franchisors can submit opportunities with free/paid options
- **Admin Dashboard**: Manage submissions, approvals, and revenue
- **Monetization**: Featured listings with premium placement ($199/month)
- **Responsive Design**: Works on all devices with modern UI

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## 📊 Canadian Franchise API Integrations

The platform integrates with 6+ major Canadian franchise data providers with real-time data synchronization:

### Supported APIs:
1. **Canadian Franchise Association (CFA)**
   - Endpoint: `https://api.cfa.ca/v1/franchises`
   - Features: Official franchise directory, search, categories, detailed info
   - Rate Limit: 100 requests/hour

2. **BeTheBoss.ca**
   - Endpoint: `https://api.betheboss.ca/v2/franchises`
   - Features: Search, featured listings, industry categories
   - Rate Limit: 150 requests/hour

3. **Franchise Canada Directory**
   - Endpoint: `https://api.franchisecanada.online/v1/opportunities`
   - Features: Comprehensive franchise listings, provincial data
   - Rate Limit: 200 requests/hour

4. **FranchiseDirect Canada**
   - Endpoint: `https://api.franchisedirect.ca/v1/opportunities`
   - Features: Search, details, lead management
   - Rate Limit: 100 requests/hour

5. **FranchiseGlobal Canada**
   - Endpoint: `https://api.franchiseglobal.com/canada/v1`
   - Features: Franchises, search, regional data
   - Rate Limit: 120 requests/hour

6. **BizBuySell Canada**
   - Endpoint: `https://api.bizbuysell.ca/v1/franchises`
   - Features: Search, featured listings, categories
   - Rate Limit: 80 requests/hour

### API Features:
- **Automatic Fallback**: Uses local data when APIs are unavailable
- **Data Normalization**: Converts different API formats to unified structure
- **Caching System**: 5-minute cache to optimize performance
- **Duplicate Removal**: Intelligent deduplication across multiple sources
- **Relevance Sorting**: Smart sorting based on search criteria

## 🔧 Setup Instructions

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Add your API keys to `.env`:
```env
# Canadian Franchise API Keys
VITE_CFA_API_KEY=your_cfa_api_key_here
VITE_BETHEBOSS_API_KEY=your_betheboss_api_key_here
VITE_FRANCHISE_CANADA_API_KEY=your_franchise_canada_api_key_here
VITE_FRANCHISEDIRECT_API_KEY=your_franchisedirect_api_key_here
VITE_FRANCHISEGLOBAL_API_KEY=your_franchiseglobal_api_key_here
VITE_BIZBUYSELL_API_KEY=your_bizbuysell_api_key_here
```

### 2. API Key Acquisition

Contact the following providers to obtain API access:

- **CFA**: https://www.cfa.ca/api-access
- **BeTheBoss**: https://www.betheboss.ca/api
- **Franchise Canada**: https://franchisecanada.online/api
- **FranchiseDirect**: https://www.franchisedirect.ca/api
- **FranchiseGlobal**: https://www.franchiseglobal.com/api
- **BizBuySell**: https://www.bizbuysell.ca/api

### 3. Local Development

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

## 🔍 API Integration Details

### Real-Time Data Loading
The platform automatically loads franchise data from all configured APIs on startup:

```typescript
// Automatic API data loading
const loadFranchiseData = async () => {
  const apiResults = await searchCanadianFranchises({
    industry: 'Any Industry',
    region: 'Canada-Wide'
  });
  
  // Convert and display results
  setApiOpportunities(convertedOpportunities);
};
```

### Fallback System
If APIs are unavailable, the system automatically falls back to local data:

```typescript
// Intelligent fallback
catch (error) {
  console.error('API Error:', error);
  return this.getFallbackFranchises('all');
}
```

### Data Normalization
All API responses are normalized to a consistent format:

```typescript
// Unified franchise data structure
interface Franchise {
  id: string;
  name: string;
  industry: string;
  investmentMin: number;
  investmentMax: number;
  region: string[];
  description: string;
  // ... additional fields
}
```

## 🎯 Matching Algorithm

The franchise matching system uses a weighted scoring algorithm:

- **Industry Match**: 40% weight
- **Region Match**: 30% weight (Ontario gets +5 bonus)
- **Investment Range**: 20% weight
- **Lifestyle Preference**: 10% weight

## 🚀 Live API Status

The platform displays real-time API status:
- ✅ **Live Data Indicator**: Shows when API data is successfully loaded
- 🔄 **Loading States**: Visual feedback during API calls
- ⚠️ **Fallback Notifications**: Alerts when using local data
- 📊 **Data Counters**: Shows number of opportunities loaded from APIs

## 💰 Monetization Features

### Free Listings
- Standard placement in search results
- Basic franchise information
- Contact details included
- Manual approval process

### Featured Listings ($199/month)
- ⭐ Featured badge display
- Top placement in search results
- Highlighted card design
- Priority approval process
- Enhanced visibility

## 📊 API Performance Monitoring

The system includes comprehensive API monitoring:
- Response time tracking
- Success/failure rates
- Cache hit ratios
- Data freshness indicators
- Automatic retry mechanisms

## 🏗 Architecture

### Frontend Components
- `FranchiseQuiz`: 4-step matching wizard
- `FranchiseResults`: Display matching franchises
- `FranchiseSubmissionForm`: Self-service portal
- `AdminDashboard`: Management interface
- `BusinessOpportunities`: Main marketplace

### API Service Layer
- `CanadianFranchiseAPIService`: Handles all external API calls
- Data normalization for different API formats
- Fallback to local data when APIs unavailable
- Duplicate removal and relevance sorting
- Intelligent caching and rate limiting

### Data Management
- Local franchise database with 50+ Canadian franchises
- Real-time API integration with caching
- Comprehensive franchise details and requirements
- Automatic data synchronization

## 🔐 Security Considerations

- API keys stored in environment variables
- Rate limiting for external API calls
- Input validation and sanitization
- Secure payment processing integration ready
- CORS handling for API requests

## 📈 Analytics & Monitoring

- Track quiz completion rates
- Monitor API response times
- Revenue tracking for featured listings
- User engagement metrics
- API performance dashboards
- Data quality monitoring

## 🚀 Deployment

The application is deployed on Bolt Hosting with automatic builds and deployments.

Production URL: https://enhanced-colorful-ne-h177.bolt.host

## 🔧 API Testing

Test API connectivity:
```bash
# Test all APIs
npm run test:apis

# Test specific API
npm run test:api:cfa
npm run test:api:betheboss
```

## 📝 API Documentation

### Franchise Matching Endpoint
```typescript
// Search Canadian Franchises
searchCanadianFranchises({
  industry: 'Food & Beverage',
  investmentRange: '$25k - $100k',
  region: 'Ontario',
  lifestyle: 'Retail Storefront'
})

// Returns normalized franchise data
Body: {
  industry: string;
  investmentRange: string;
  lifestyle: string;
  region: string;
}
Response: {
  matches: Franchise[];
  totalMatches: number;
  searchCriteria: FranchiseMatchRequest;
}
```

### Franchise Submission
```typescript
POST /api/franchises/submit
Body: FranchiseSubmission
Response: {
  submissionId: string;
  status: 'pending';
}
```

## 🌟 API Integration Benefits

- **Real-Time Data**: Always up-to-date franchise opportunities
- **Comprehensive Coverage**: 6+ major Canadian franchise sources
- **Intelligent Matching**: Advanced algorithms for better results
- **Reliable Fallbacks**: Never fails due to API issues
- **Performance Optimized**: Caching and rate limiting
- **Scalable Architecture**: Easy to add new API sources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔍 Troubleshooting

### API Issues
- Check `.env` file for correct API keys
- Verify API endpoints are accessible
- Check rate limits and quotas
- Review console logs for detailed error messages

### Performance Issues
- Clear browser cache
- Check network connectivity
- Verify API response times
- Monitor cache hit rates

## 📄 License

This project is proprietary software for BuyersAlike platform.

## 📞 Support

For API access issues or technical support, contact the development team.