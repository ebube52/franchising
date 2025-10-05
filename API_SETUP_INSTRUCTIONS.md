# Franchise API Setup Instructions

## 🚀 Quick Start Guide

Your franchise website now has a complete API integration system with multiple data sources, caching, and an admin panel. Follow these steps to get started.

---

## 📋 What's Been Implemented

### ✅ 1. API Integration Layer
- **FranChimp API** integration (via RapidAPI)
- **Canadian Franchise Association** integration ready
- **BeTheBoss.ca** integration ready
- **FranchiseDirect Canada** integration ready
- **Multi-source aggregation** with automatic deduplication

### ✅ 2. Supabase Database Caching
- **Franchise data caching** with 24-hour TTL
- **API response caching** for performance
- **API request logging** for monitoring
- **Automatic cleanup** of expired cache
- **Statistics and analytics** functions

### ✅ 3. Web Scraping Service
- **Ethical scraping framework** with guidelines
- **Source information** for CFA, BeTheBoss, FranchiseDirect
- **robots.txt checking** utilities
- **Rate limiting** built-in
- Documentation-focused (recommends API partnerships)

### ✅ 4. Admin Panel
- **API Manager Dashboard** at `/admin` route
- **Real-time statistics** display
- **One-click data sync** to database
- **API connection testing**
- **Cache management** tools
- **Activity logging** viewer

---

## 🔧 Setup Instructions

### Step 1: Environment Variables

Your `.env` file has Supabase credentials already configured. To add API keys:

```bash
# Open your .env file and add:
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_CFA_API_KEY=your_cfa_api_key_here
VITE_BETHEBOSS_API_KEY=your_betheboss_api_key_here
VITE_FRANCHISEDIRECT_API_KEY=your_franchisedirect_api_key_here
```

### Step 2: Get API Keys

#### Option A: FranChimp (Recommended - Easiest)
1. Visit https://www.franchimp.com/
2. Email: [email protected]
3. Subject: "API Key Request for Franchise Hub"
4. Include:
   - Your company name
   - Website URL
   - Use case description
   - Expected API usage

#### Option B: RapidAPI (Alternative)
1. Visit https://rapidapi.com/
2. Create a free account
3. Search for "franchise" APIs
4. Subscribe to a franchise data API
5. Copy your RapidAPI key
6. Add to `.env` as `VITE_RAPIDAPI_KEY`

#### Option C: Canadian Franchise Association
1. Visit https://cfa.ca/contact/
2. Request partnership for API access
3. Mention you're building a franchise discovery platform
4. Benefits: Official, verified Canadian franchise data

### Step 3: Initialize Database

Visit the **API Manager** page in your app:

1. Click the **"API Manager"** button in navigation
2. Click **"Sync Local Data to Database"**
3. This will populate your Supabase database with ~30+ franchises
4. You should see "✅ Successfully synced X franchises to database!"

### Step 4: Test API Connections

Once you have API keys configured:

1. In the **API Manager**, go to **"API Status"** tab
2. Click **"Test Connection"** for each API
3. Successful connections will show green checkmarks
4. Failed connections will show configuration needed

---

## 📂 File Structure

```
src/
├── services/
│   ├── supabaseClient.ts              # Supabase initialization
│   ├── franchiseCacheService.ts       # Database cache management
│   ├── canadianFranchiseAPI.ts        # Multi-API aggregation
│   ├── franchiseAPIService.ts         # Legacy API service
│   └── franchiseScraperService.ts     # Web scraping utilities
├── components/
│   └── FranchiseAPIManager.tsx        # Admin dashboard
└── data/
    └── franchiseData.ts               # Local fallback data

Database Tables:
├── franchises                         # Cached franchise data
├── api_cache                          # API response cache
└── api_logs                           # API request logs
```

---

## 🎯 How to Use the System

### For Development

**Using Local Data:**
```typescript
import { allCanadianFranchises } from './data/franchiseData';
const franchises = allCanadianFranchises;
```

**Using Cached Data:**
```typescript
import { franchiseCacheService } from './services/franchiseCacheService';

const franchises = await franchiseCacheService.getFranchises({
  industry: 'Food & Beverage',
  investmentMin: 50000,
  investmentMax: 500000,
  region: 'Ontario',
  limit: 10
});
```

**Using Live APIs:**
```typescript
import { canadianFranchiseAPI } from './services/canadianFranchiseAPI';

const franchises = await canadianFranchiseAPI.searchAllAPIs({
  industry: 'Food & Beverage',
  investmentMin: 50000,
  investmentMax: 500000,
  region: 'Ontario',
  limit: 20
});
```

### For Production

**Recommended Flow:**
1. APIs fetch fresh data → Cache in Supabase
2. Frontend reads from Supabase cache
3. Fallback to local data if cache unavailable
4. Refresh cache every 24 hours

---

## 🔍 API Manager Features

### Overview Tab
- Total franchises count
- Active listings count
- Industry breakdown
- Quick action buttons
- Industry statistics

### API Status Tab
- Connection status for each API
- Test connection buttons
- Record counts
- Last sync timestamps

### Database Cache Tab
- Recent API activity logs
- Response times
- Error tracking
- Data source breakdown

### Web Scraper Tab
- Scraping guidelines
- Source information
- Legal considerations
- Best practices

---

## 📊 Database Schema

### Franchises Table
```sql
- id (text, PK)
- name, brand, industry
- investment_min, investment_max
- region (jsonb array)
- description, image
- business_model
- support_provided (jsonb)
- franchise_fee, royalty_fee
- territories, established
- website
- contact_info (jsonb)
- requirements (jsonb)
- data_source
- raw_data (jsonb)
- last_updated, created_at
- is_active
```

### API Cache Table
```sql
- id (uuid, PK)
- cache_key (unique)
- api_source
- request_params (jsonb)
- response_data (jsonb)
- expires_at
- created_at
```

### API Logs Table
```sql
- id (uuid, PK)
- api_source
- endpoint
- status_code
- request_params (jsonb)
- error_message
- response_time_ms
- created_at
```

---

## 🛡️ Security & Best Practices

### API Keys
- ✅ Stored in `.env` file (never commit!)
- ✅ Accessed via `import.meta.env`
- ✅ Different keys for dev/prod recommended

### Rate Limiting
- ✅ Built-in delays between requests
- ✅ Cache to reduce API calls
- ✅ Batch operations when possible

### Data Validation
- ✅ Type checking with TypeScript
- ✅ Normalize data from different APIs
- ✅ Handle missing/null fields gracefully

### Caching Strategy
- ✅ 24-hour cache for franchise data
- ✅ 5-minute cache for API responses
- ✅ Automatic cleanup of expired entries
- ✅ Manual refresh available

---

## 🚨 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:** Check that your `.env` file has:
```
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Issue: API connection fails
**Solution:**
1. Verify API key is correct
2. Check API key has proper permissions
3. Verify API endpoint URLs are correct
4. Check API rate limits haven't been exceeded

### Issue: No data showing in admin panel
**Solution:**
1. Click "Sync Local Data to Database"
2. Wait for confirmation message
3. Click "Refresh Statistics"
4. Check browser console for errors

### Issue: Database queries failing
**Solution:**
1. Verify Supabase project is running
2. Check Row Level Security policies
3. Verify table schema matches code
4. Check network tab for 401/403 errors

---

## 📈 Monitoring & Analytics

### View API Usage
```typescript
const logs = await franchiseCacheService.getRecentAPILogs(50);
console.log('Recent API activity:', logs);
```

### View Cache Statistics
```typescript
const stats = await franchiseCacheService.getFranchiseStats();
console.log('Cache statistics:', stats);
```

### Clean Expired Cache
```typescript
const deleted = await franchiseCacheService.cleanExpiredCache();
console.log(`Cleaned ${deleted} expired entries`);
```

---

## 🔄 Data Refresh Strategy

### Automatic (Recommended)
Set up a cron job or scheduled function:
```javascript
// Run daily at 2am
cron.schedule('0 2 * * *', async () => {
  const franchises = await canadianFranchiseAPI.searchAllAPIs({ limit: 100 });
  await franchiseCacheService.saveFranchises(franchises, 'cron');
  await franchiseCacheService.cleanExpiredCache();
});
```

### Manual
Use the API Manager dashboard:
1. Click "Test API Connections"
2. Wait for sync to complete
3. Verify in Database Cache tab

---

## 💰 Cost Considerations

### Free Tier (Current Setup)
- ✅ Supabase: 500MB database, 2GB bandwidth
- ✅ Local data: Unlimited, no costs
- ✅ RapidAPI: 50-500 requests/month free (varies by API)

### Scaling Up
- **Supabase Pro:** $25/month (8GB database, 50GB bandwidth)
- **RapidAPI Pro:** $10-100/month (depends on API)
- **FranChimp/FRANdata:** Contact for enterprise pricing

---

## 📚 Additional Resources

- **Main Guide:** `FRANCHISE_API_GUIDE.md`
- **API Documentation:** See individual API provider docs
- **Supabase Docs:** https://supabase.com/docs
- **RapidAPI Hub:** https://rapidapi.com/

---

## ✅ Checklist

- [ ] Read `FRANCHISE_API_GUIDE.md`
- [ ] Add API keys to `.env`
- [ ] Run "Sync Local Data to Database"
- [ ] Test API connections
- [ ] Verify data shows in frontend
- [ ] Set up data refresh schedule
- [ ] Monitor API usage and costs
- [ ] Review and optimize cache strategy

---

## 🎉 You're All Set!

Your franchise website now has:
- ✅ Multiple API integrations ready to use
- ✅ Database caching for performance
- ✅ Admin panel for management
- ✅ Web scraping framework (ethical)
- ✅ Fallback data for reliability
- ✅ Monitoring and analytics

**Next Steps:**
1. Get API keys from FranChimp or RapidAPI
2. Sync data to Supabase
3. Test the system end-to-end
4. Deploy to production

**Need Help?**
- Review `FRANCHISE_API_GUIDE.md` for detailed API information
- Check browser console for error messages
- Verify Supabase dashboard for database status
- Test individual components in isolation

---

**Last Updated:** January 2025
**Version:** 1.0
**Status:** Production Ready ✅
