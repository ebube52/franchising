# Franchise API Integration Guide 2025

## Overview
This guide provides comprehensive information about franchise data APIs, implementation strategies, and best practices for integrating real franchise data into your application.

---

## 🎯 Recommended API Providers

### 1. **FranChimp API** ⭐ RECOMMENDED
**Status:** Available (Direct Contact Required)
**Coverage:** US & Canadian Franchises
**Cost:** Contact for pricing

**Features:**
- Get all franchises (bulk retrieval)
- Get specific franchise details
- Investment range data
- Net worth requirements
- Status tracking

**How to Get Access:**
```
Email: [email protected]
Subject: API Key Request for [Your Company Name]
Request: Developer API access for franchise data integration
```

**API Endpoints:**
- `GET /franchises` - List all franchisors
- `GET /franchises/{id}` - Get franchise details

**Sample Response:**
```json
{
  "id": "franchise-123",
  "name": "Tim Hortons",
  "investment": {
    "min": 438000,
    "max": 2200000
  },
  "netWorthRequired": 1500000,
  "status": "active",
  "category": "food-beverage"
}
```

---

### 2. **FRANdata Multi-Metric API** ⭐ ENTERPRISE
**Status:** Available (US Focus)
**Coverage:** All US Franchise Brands
**Cost:** Enterprise Pricing

**Features:**
- Average unit revenue
- System size by geography
- Key executive information
- Initial investment data
- Financial metrics & P&Ls
- Historic growth metrics
- Turnover rates
- Unit continuity
- Executive contacts (phone, email, LinkedIn)

**Website:** https://frandata.com/products-solutions/database-solutions/

**Best For:**
- Enterprise applications
- Financial analysis platforms
- Market research tools
- Franchise comparison sites

---

### 3. **RapidAPI Marketplace**
**Status:** Available (Limited franchise-specific APIs)
**Coverage:** Various
**Cost:** Varies by API

**Note:** RapidAPI was recently acquired by Nokia. Monitor for changes.

**Available Categories:**
- Company Information APIs
- Business Data APIs
- Market Data APIs

**How to Access:**
1. Visit https://rapidapi.com/
2. Search for "franchise" or "business data"
3. Subscribe to relevant APIs
4. Copy your API key

**Integration:**
```javascript
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'franchise-api.p.rapidapi.com'
  }
};
```

---

### 4. **Canadian Government APIs** 🇨🇦
**Status:** Free & Available
**Coverage:** Canadian Corporations
**Cost:** Free

**ISED Corporations API:**
- Corporate registry data
- Business status
- Registered office addresses
- Directors information
- Real-time access

**Statistics Canada API:**
- Economic data
- Market statistics
- Industry trends

**Documentation:**
- ISED: https://api.ised-isde.canada.ca/en/docs
- StatsCan: https://www.statcan.gc.ca/en/developers

---

### 5. **FranConnect API**
**Status:** Available (SaaS Platform)
**Coverage:** Platform-specific
**Cost:** SaaS subscription required

**Documentation:** https://docs.franconnect.net/

**Best For:**
- Existing FranConnect customers
- Franchise management systems
- Internal franchise networks

---

## 🔄 Alternative Data Sources

### Web Scraping Options

#### Canadian Franchise Association
**URL:** https://cfa.ca/franchisecanada/franchise-canada-directory-2025/
- Official franchise directory
- Updated annually
- Requires respectful scraping practices
- Consider partnership instead

#### BeTheBoss.ca
**URL:** https://www.betheboss.ca/franchise-opportunities
- Canadian franchise portal
- Public listings
- Categories and filters

#### FranchiseDirect Canada
**URL:** https://www.franchisedirect.ca/
- International franchise listings
- Canadian section
- Detailed franchise profiles

#### FranchiseGrade
**URL:** https://www.franchisegrade.com/
- 3,000+ franchise systems
- Ratings and reviews
- Comprehensive data
- No public API (yet)

---

## 📊 Implementation Strategy

### Phase 1: Quick Start (Week 1)
1. **Contact FranChimp** for API access
2. Implement basic API integration
3. Set up caching layer (Supabase)
4. Test with sample data

### Phase 2: Scale (Weeks 2-3)
1. Add additional API providers
2. Implement fallback systems
3. Create web scraping service
4. Set up data validation

### Phase 3: Optimize (Weeks 4+)
1. Build admin dashboard
2. Implement data refresh schedules
3. Add analytics and tracking
4. Monitor API usage and costs

---

## 💾 Data Caching Strategy

### Why Cache?
- Reduce API costs
- Improve performance
- Ensure availability
- Handle rate limits

### Recommended Setup (Supabase)
```sql
CREATE TABLE franchises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  industry TEXT,
  investment_min DECIMAL,
  investment_max DECIMAL,
  data JSONB,
  source TEXT,
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_franchises_industry ON franchises(industry);
CREATE INDEX idx_franchises_investment ON franchises(investment_min, investment_max);
CREATE INDEX idx_franchises_updated ON franchises(last_updated);
```

### Refresh Schedule
- **Critical data:** Daily
- **Static data:** Weekly
- **Historical data:** Monthly

---

## 🛡️ Best Practices

### API Key Management
- Store keys in environment variables
- Never commit keys to git
- Rotate keys regularly
- Use different keys for dev/prod

### Rate Limiting
- Implement request throttling
- Use caching extensively
- Batch requests when possible
- Monitor usage dashboards

### Data Quality
- Validate all API responses
- Normalize data formats
- Handle missing fields gracefully
- Keep fallback data current

### Legal & Ethical
- Review Terms of Service
- Respect robots.txt
- Implement rate limiting
- Consider data licensing

---

## 🔧 Code Examples

### Environment Setup
```bash
# .env file
VITE_FRANCHIMP_API_KEY=your_franchimp_key
VITE_FRANDATA_API_KEY=your_frandata_key
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Basic API Integration
```typescript
// franchiseAPIClient.ts
export class FranchiseAPIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getFranchises(params: SearchParams): Promise<Franchise[]> {
    const response = await fetch('https://api.franchimp.com/franchises', {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }
}
```

### Caching Implementation
```typescript
// cacheService.ts
export class CacheService {
  async getFranchise(id: string): Promise<Franchise | null> {
    const cached = await supabase
      .from('franchises')
      .select('*')
      .eq('id', id)
      .single();

    if (cached.data && this.isFresh(cached.data.last_updated)) {
      return cached.data;
    }

    return null;
  }

  async setFranchise(franchise: Franchise): Promise<void> {
    await supabase
      .from('franchises')
      .upsert({
        id: franchise.id,
        data: franchise,
        last_updated: new Date().toISOString()
      });
  }

  private isFresh(lastUpdated: string): boolean {
    const age = Date.now() - new Date(lastUpdated).getTime();
    return age < 24 * 60 * 60 * 1000; // 24 hours
  }
}
```

---

## 📈 Cost Estimation

### FranChimp API
- **Starter:** Contact for pricing
- **Professional:** Contact for pricing
- **Enterprise:** Custom pricing

### FRANdata
- **Enterprise Only:** Custom pricing
- Typically $5,000 - $25,000/year

### RapidAPI
- **Free Tier:** Limited requests
- **Basic:** $10-50/month
- **Pro:** $100-500/month
- **Ultra:** $1,000+/month

### Web Scraping Costs
- Development: $2,000 - $5,000
- Maintenance: $500 - $1,000/month
- Legal review: $1,000 - $3,000

---

## 🎓 Additional Resources

### Documentation
- [FranChimp Developer Page](https://www.franchimp.com/?page=developer)
- [FRANdata Solutions](https://frandata.com/)
- [RapidAPI Hub](https://rapidapi.com/)
- [ISED API Catalogue](https://api.ised-isde.canada.ca/)

### Communities
- Canadian Franchise Association
- Franchise Business Review
- International Franchise Association

### Tools
- Postman (API testing)
- Insomnia (API client)
- Supabase (Database)
- Vercel (Hosting)

---

## 📞 Contact Information

### FranChimp
- Email: [email protected]
- Website: https://www.franchimp.com/

### FRANdata
- Website: https://frandata.com/
- Phone: Contact via website

### Canadian Franchise Association
- Website: https://cfa.ca/
- Email: Check website for contact

---

## ⚠️ Important Notes

1. **API Availability:** Some APIs require direct contact and may not be publicly available
2. **Pricing:** Most franchise data APIs are enterprise-focused with custom pricing
3. **Legal:** Always review Terms of Service before scraping or using APIs
4. **Updates:** API providers and pricing can change; verify information before committing
5. **Fallback:** Always maintain fallback data sources

---

## 🚀 Quick Start Checklist

- [ ] Review this guide completely
- [ ] Contact FranChimp for API access
- [ ] Set up Supabase database
- [ ] Implement basic caching
- [ ] Test with sample data
- [ ] Add error handling
- [ ] Implement rate limiting
- [ ] Set up monitoring
- [ ] Create admin dashboard
- [ ] Document your setup

---

**Last Updated:** January 2025
**Version:** 1.0
**Maintainer:** Franchise Hub Development Team
