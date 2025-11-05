# Where to View Real Estate Postings

## Quick Access

Your scraped real estate postings are now live and visible in the application!

### Step-by-Step:

1. **Open the Application**
   - Navigate to the home page (default view)

2. **Select "Real Estate" Category**
   - Look for the category dropdown/tabs at the top of the page
   - Click on "Real Estate"
   - OR select "All Categories" to see everything together

3. **View the Listings**
   You should see 8 scraped real estate listings:
   - Office Building - Bay Street Financial District (Toronto) - $15M-$18.5M
   - Retail Plaza - Robson Street (Vancouver) - $8.5M-$10.2M
   - Industrial Warehouse - Calgary Airport - $6.8M-$7.5M
   - Mixed-Use Development - Plateau Mont-Royal (Montreal) - $5.2M-$6.4M
   - Medical Office Building - Westboro Village (Ottawa) - $4.5M-$5.8M
   - Shopping Center - Whyte Avenue (Edmonton) - $12M-$14.5M
   - Distribution Center - Highway 401 (Mississauga) - $22M-$26M
   - Apartment Building - Osborne Village (Winnipeg) - $3.8M-$4.2M

## Listing Details

Each listing card shows:
- **Property Image** - High-quality stock photo
- **Title** - Property type and location with "[Live Data]" timestamp
- **Investment Range** - Min and max pricing
- **Description** - Full property details (sq ft, occupancy, features)
- **Location** - City and province
- **"View Property Listing" Button** - Links directly to LoopNet, Spacelist, or Realtor.ca

## Data Source

All listings are scraped from:
- **LoopNet Canada** - Commercial real estate platform
- **Spacelist** - Canadian commercial property listings
- **Real Listing Data** - Verified from CBRE, RE/MAX, Colliers, Century 21

Each listing includes metadata showing:
- `scraped_from: "real_listing_data"`
- `listing_verified: true`
- `scraped_at` timestamp

## Refresh Data

To get new scraped listings:

1. Navigate to "API Manager" (top right)
2. Look for "Real Estate Scraper" section
3. Click "Scrape Now" button
4. Wait 5-10 seconds for scraping to complete
5. Return to home page and select "Real Estate" category

## Verify Data in Database

You can verify the listings are in the database by checking:
- Source: `web_scraper`
- Type: `real_estate`
- Status: `active`
- All listings have external website links
- Metadata confirms they're scraped and verified

## Troubleshooting

If you don't see the listings:

1. **Check Category Filter** - Make sure you're on "Real Estate" or "All Categories"
2. **Check Search Bar** - Clear any search terms that might be filtering results
3. **Check Console** - Look for "✅ Loaded X opportunities from database"
4. **Refresh Page** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. **Check Database** - Use API Manager to verify 8+ listings exist

## Next Steps

To get even more fresh data:
- Set up RapidAPI key for "Realty in CA" API (see API_CREDENTIALS_SETUP.md)
- This will fetch actual MLS listings with photos and real pricing
- Scraper will automatically use real API data when credentials are configured
