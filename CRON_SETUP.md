# Real Estate Listings Cron Setup

## Automated Sync Schedule

The real estate listings are configured to sync automatically every 3 hours using Supabase Cron Jobs.

## Setup Instructions

### 1. Using Supabase Dashboard

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Extensions**
3. Enable the `pg_cron` extension if not already enabled
4. Go to **SQL Editor**
5. Run the following SQL:

```sql
-- Enable the pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a cron job to sync real estate listings every 3 hours
SELECT cron.schedule(
  'sync-real-estate-listings',
  '0 */3 * * *',  -- Every 3 hours
  $$
  SELECT
    net.http_post(
      url := 'YOUR_SUPABASE_URL/functions/v1/sync-real-estate?action=sync',
      headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb
    ) AS request_id;
  $$
);

-- View scheduled jobs
SELECT * FROM cron.job;

-- View job run history
SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
```

### 2. Environment Variables

Make sure these are set in your Supabase project:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Alternative: GitHub Actions

If you prefer GitHub Actions for scheduling, create `.github/workflows/sync-real-estate.yml`:

```yaml
name: Sync Real Estate Listings

on:
  schedule:
    - cron: '0 */3 * * *'  # Every 3 hours
  workflow_dispatch:  # Allow manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync Real Estate Listings
        run: |
          curl -X GET "${{ secrets.SUPABASE_URL }}/functions/v1/sync-real-estate?action=sync" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

### 4. Manual Sync

You can manually trigger a sync from:

1. **Admin Panel**: Click the "Sync Real Estate" button
2. **API Call**: `GET /functions/v1/sync-real-estate?action=sync`
3. **Command Line**:
   ```bash
   curl -X GET "YOUR_SUPABASE_URL/functions/v1/sync-real-estate?action=sync"
   ```

## Monitoring

### Check Sync Status

```bash
curl -X GET "YOUR_SUPABASE_URL/functions/v1/sync-real-estate?action=status"
```

### View Recent Listings

```sql
SELECT
  title,
  location,
  investment_min,
  investment_max,
  created_at,
  updated_at
FROM opportunities
WHERE type = 'real_estate'
  AND source = 'real_estate_api'
ORDER BY updated_at DESC
LIMIT 20;
```

## Duplicate Prevention

The sync function includes built-in duplicate detection:

- Checks for existing listings by `title` + `location`
- Only updates listings older than 7 days
- Skips duplicates created within the last 7 days

## Troubleshooting

### Cron Not Running

1. Verify `pg_cron` extension is enabled
2. Check cron job is scheduled: `SELECT * FROM cron.job;`
3. Review error logs: `SELECT * FROM cron.job_run_details WHERE status = 'failed';`

### No New Listings

1. Check edge function logs in Supabase Dashboard
2. Verify API credentials are correct
3. Test manual sync from admin panel
4. Check network connectivity

## Performance Notes

- Sync typically takes 5-15 seconds
- Processes listings in batches
- Automatic retry on transient failures
- Rate limiting respects API quotas
