# API Credentials Setup for Real-Time Listings

This guide explains how to configure real API credentials to fetch real-time franchise and real estate listings.

## Current Status

The system is now configured to ONLY show listings from API sources:
- `demo_api` - Demo listings generator (active by default)
- `realty_in_ca` - Real Canadian real estate listings (requires API key)
- `canada_real_estate_api` - Alternative real estate API (requires API key)
- `franchimp_api` - Franchise listings API (requires API key)

## Step 1: Get Real Estate API Credentials

### Option A: Realty in CA (RapidAPI) - RECOMMENDED

1. **Sign up for RapidAPI:**
   - Go to https://rapidapi.com/
   - Create a free account

2. **Subscribe to Realty in CA API:**
   - Visit: https://rapidapi.com/apidojo/api/realty-in-ca1
   - Choose a plan (Free tier available with 500 requests/month)
   - Copy your API key from the dashboard

3. **Configure in Database:**
   ```sql
   UPDATE api_credentials
   SET
     api_key = 'YOUR_RAPIDAPI_KEY_HERE',
     is_active = true
   WHERE provider = 'realty_in_ca';
   ```

4. **Test the API:**
   - Go to your app → API Manager → Real Estate Sync
   - Click "Sync Now" for Realty in CA
   - Check sync logs for results

### Option B: Canada Real Estate API (Zyla API Hub)

1. **Sign up for Zyla:**
   - Go to https://zylalabs.com/
   - Create an account

2. **Subscribe to Canada Real Estate API:**
   - Find the Canada Real Estate API
   - Get your API key

3. **Configure in Database:**
   ```sql
   UPDATE api_credentials
   SET
     api_key = 'YOUR_ZYLA_API_KEY',
     is_active = true
   WHERE provider = 'canada_real_estate_api';
   ```

## Step 2: Get Franchise API Credentials

### FranChimp API (RapidAPI)

1. **Subscribe to FranChimp:**
   - Visit: https://rapidapi.com/datascraper/api/franchimp
   - Subscribe to a plan (Free tier available)
   - Copy your API key

2. **Configure in Database:**
   ```sql
   -- First, add the FranChimp provider
   INSERT INTO api_credentials (provider, endpoint, is_active, rate_limit, metadata) VALUES
     (
       'franchimp_api',
       'https://franchimp.p.rapidapi.com',
       false,
       1000,
       '{"description": "FranChimp - Franchise listings API", "requires_rapidapi_key": true}'::jsonb
     )
   ON CONFLICT (provider) DO NOTHING;

   -- Then update with your API key
   UPDATE api_credentials
   SET
     api_key = 'YOUR_RAPIDAPI_KEY',
     is_active = true
   WHERE provider = 'franchimp_api';
   ```

3. **Create Edge Function for Franchise Sync:**
   You'll need to create a similar edge function for franchise syncing
   (similar to the `sync-real-estate` function)

## Step 3: Trigger Initial Sync

### Using Admin Panel (Easiest)
1. Open your app
2. Navigate to: Top Menu → API Manager
3. Click on "Real Estate Sync" tab
4. Click "Sync Now" for each active provider
5. Check sync logs for success

### Using Direct API Call
```bash
# Sync real estate
curl -X GET \
  "https://YOUR_PROJECT_REF.supabase.co/functions/v1/sync-real-estate?provider=realty_in_ca&sync_type=manual" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Step 4: Set Up Automated Syncing (3-Hour Intervals)

See `REAL_ESTATE_SYNC_SETUP.md` for detailed instructions on setting up cron jobs.

Quick option - Supabase pg_cron:
```sql
SELECT
  cron.schedule(
    'sync-real-estate-listings',
    '0 */3 * * *',  -- Every 3 hours
    $$
    SELECT
      net.http_post(
        url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/sync-real-estate?provider=realty_in_ca&sync_type=scheduled',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
      ) as request_id;
    $$
  );
```

## Demo Mode (No API Keys Required)

If you don't have API keys yet, the system uses `demo_api` which generates realistic listings:
- Automatically generates 5 new real estate listings per sync
- Updates every time you click "Sync Now" in the admin panel
- Perfect for testing and development

To manually trigger demo sync:
```sql
-- You can call the edge function
SELECT net.http_post(
  url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/sync-real-estate?provider=demo_listings&sync_type=manual',
  headers:='{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
);
```

## Verifying API Listings

Check that only API-sourced listings are showing:
```sql
-- View all current listings by source
SELECT
  source,
  type,
  title,
  created_at
FROM opportunities
WHERE status = 'active'
ORDER BY created_at DESC;

-- Should only show sources: demo_api, realty_in_ca, canada_real_estate_api, franchimp_api
```

## Monitoring

### View Recent Syncs
```sql
SELECT
  provider,
  sync_type,
  status,
  records_fetched,
  records_added,
  records_updated,
  created_at
FROM sync_logs
ORDER BY created_at DESC
LIMIT 10;
```

### Check API Status
```sql
SELECT
  provider,
  is_active,
  last_sync,
  rate_limit,
  metadata->>'description' as description
FROM api_credentials
WHERE is_active = true;
```

## Troubleshooting

### No listings appearing?
1. Check that you've run at least one sync
2. Verify API credentials are correct
3. Check sync logs for errors
4. Try the demo_api provider first

### API errors?
1. Verify your API key is valid
2. Check you haven't exceeded rate limits
3. Ensure the API subscription is active
4. Review error messages in sync_logs table

### Want to test without real APIs?
The demo_api provider is perfect for this:
```sql
UPDATE api_credentials
SET is_active = true
WHERE provider = 'demo_listings';
```

Then sync via admin panel.

## Cost Considerations

### Free Tiers Available:
- **RapidAPI Realty in CA**: 500 requests/month free
- **Demo API**: Unlimited, always free
- **Supabase**: Free tier includes Edge Functions

### Recommended Setup:
- Start with demo_api (free)
- Add one real estate API when ready
- Monitor usage in RapidAPI dashboard
- Upgrade plans as needed

## Need Help?

1. Check sync logs in admin panel
2. Review Supabase Edge Function logs
3. Verify API credentials in database
4. Test with demo_api first
