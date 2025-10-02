# BuyersAlike - Canadian Franchise Matching Platform

A comprehensive franchise matching system that connects potential franchisees with Canadian franchise opportunities through an intelligent quiz-based matching algorithm.

## 🚀 Features

- **Smart Franchise Matching**: 4-step quiz wizard with weighted scoring algorithm
- **Real-Time API Integration**: Connects to major Canadian franchise platforms
- **Self-Service Portal**: Franchisors can submit opportunities with free/paid options
- **Admin Dashboard**: Manage submissions, approvals, and revenue
- **Monetization**: Featured listings with premium placement ($199/month)
- **Responsive Design**: Works on all devices with modern UI

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## 📊 Franchise API Integrations

The platform integrates with major Canadian franchise data providers:

### Supported APIs:
1. **Canadian Franchise Association (CFA)**
   - Endpoint: `https://api.cfa.ca/v1/franchises`
   - Features: Search, categories, detailed franchise info

2. **BeTheBoss.ca**
   - Endpoint: `https://api.betheboss.ca/v2/franchises`
   - Features: Search, featured listings, industry categories

3. **FranchiseDirect Canada**
   - Endpoint: `https://api.franchisedirect.ca/v1/opportunities`
   - Features: Search, details, lead management

4. **FranchiseGlobal Canada**
   - Endpoint: `https://api.franchiseglobal.com/canada/v1`
   - Features: Franchises, search, regional data

5. **BizBuySell Canada**
   - Endpoint: `https://api.bizbuysell.ca/v1/franchises`
   - Features: Search, featured listings, categories

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
VITE_FRANCHISEDIRECT_API_KEY=your_franchisedirect_api_key_here
VITE_FRANCHISEGLOBAL_API_KEY=your_franchiseglobal_api_key_here
VITE_BIZBUYSELL_API_KEY=your_bizbuysell_api_key_here
```

### 2. API Key Acquisition

Contact the following providers to obtain API access:

- **CFA**: https://www.cfa.ca/api-access
- **BeTheBoss**: https://www.betheboss.ca/api
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

## 🎯 Matching Algorithm

The franchise matching system uses a weighted scoring algorithm:

- **Industry Match**: 40% weight
- **Region Match**: 30% weight (Ontario gets +5 bonus)
- **Investment Range**: 20% weight
- **Lifestyle Preference**: 10% weight

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

## 🏗 Architecture

### Frontend Components
- `FranchiseQuiz`: 4-step matching wizard
- `FranchiseResults`: Display matching franchises
- `FranchiseSubmissionForm`: Self-service portal
- `AdminDashboard`: Management interface
- `BusinessOpportunities`: Main marketplace

### API Service Layer
- `FranchiseAPIService`: Handles all external API calls
- Data normalization for different API formats
- Fallback to local data when APIs unavailable
- Duplicate removal and relevance sorting

### Data Management
- Local franchise database with 50+ Canadian franchises
- Real-time API integration with caching
- Comprehensive franchise details and requirements

## 🔐 Security Considerations

- API keys stored in environment variables
- Rate limiting for external API calls
- Input validation and sanitization
- Secure payment processing integration ready

## 📈 Analytics & Monitoring

- Track quiz completion rates
- Monitor API response times
- Revenue tracking for featured listings
- User engagement metrics

## 🚀 Deployment

The application is deployed on Bolt Hosting with automatic builds and deployments.

Production URL: https://enhanced-colorful-ne-h177.bolt.host

## 📝 API Documentation

### Franchise Matching Endpoint
```typescript
POST /api/franchise-match
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for BuyersAlike platform.

## 📞 Support

For API access issues or technical support, contact the development team.