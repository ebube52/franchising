# Real-Time MLS Listings Setup Guide

Your application now supports **LIVE real-time MLS listings** from Realtor.ca through the RapidAPI platform.

## Quick Start

### Step 1: Get Your RapidAPI Key

1. Go to [RapidAPI](https://rapidapi.com) and create a free account
2. Search for **"Realty in CA"** API
3. Subscribe to the API (they offer a free tier)
4. Copy your API key from the dashboard

### Step 2: Fetch Live Listings

Once you have your API key, you can fetch live listings by calling:

```bash
curl "https://lvzxamnvtkiqjbzuwcxk.supabase.co/functions/v1/fetch-realtor-ca?city=toronto&apiKey=YOUR_RAPIDAPI_KEY"
```

Replace `YOUR_RAPIDAPI_KEY` with your actual key.

### Step 3: Supported Cities

You can fetch listings for any Canadian city:

- Toronto
- Vancouver
- Calgary
- Montreal
- Ottawa
- Edmonton
- Winnipeg
- And more...

Example:
```bash
# Vancouver listings
curl "https://lvzxamnvtkiqjbzuwcxk.supabase.co/functions/v1/fetch-realtor-ca?city=vancouver&apiKey=YOUR_KEY"

# Calgary listings
curl "https://lvzxamnvtkiqjbzuwcxk.supabase.co/functions/v1/fetch-realtor-ca?city=calgary&apiKey=YOUR_KEY"
```

## What You Get

Each API call fetches up to 20 live MLS listings including:

- **Live pricing** - Current market prices
- **High-resolution photos** - Professional listing images
- **Complete details** - Bedrooms, bathrooms, square footage
- **MLS numbers** - Official MLS listing numbers
- **Realtor.ca links** - Direct links to full listings
- **Address information** - Full civic addresses
- **Property specs** - Building details, lot size, year built

## Automatic Features

The system automatically:

- Removes duplicate listings (by MLS number)
- Updates property information
- Categorizes properties (Condo, Townhouse, Single Family, etc.)
- Formats descriptions
- Links to official Realtor.ca pages

## Cost

The RapidAPI "Realty in CA" API offers:

- **Free Tier**: 100 requests/month
- **Basic Plan**: 1,000 requests/month (~$10/month)
- **Pro Plan**: 10,000 requests/month (~$50/month)

For most applications, the free tier is sufficient for initial testing.

## Testing Without API Key

If you don't have an API key yet, the system currently displays 12 sample MLS-style listings to demonstrate the interface.

Once you add your API key, these will be replaced with live data from Realtor.ca.

## Need Help?

The API documentation is available at:
https://rapidapi.com/apidojo/api/realty-in-ca1

Common issues:
- **401 Error**: Invalid API key
- **403 Error**: Exceeded rate limit
- **No results**: Try different city names

## Example Response

When successful, you'll see:

```json
{
  "success": true,
  "message": "Live MLS listings fetched",
  "stats": {
    "added": 15,
    "skipped": 5,
    "total": 20
  },
  "city": "toronto",
  "timestamp": "2025-11-05T20:45:00.000Z"
}
```

The listings will immediately appear in your Real Estate category!
