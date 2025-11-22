# Backend Setup Guide

## Overview

The franchise and real estate features are now integrated into your Express.js backend with Supabase database.

## File Structure

```
/
├── models/
│   ├── Franchise.js          # Franchise database model
│   └── RealEstate.js          # Real estate database model
├── controllers/
│   ├── franchise.js           # Franchise business logic
│   └── realEstate.js          # Real estate business logic
├── routes/
│   ├── franchise.js           # Franchise API routes
│   └── realEstate.js          # Real estate API routes
└── src/
    └── app.js                 # Updated with new routes
```

## Environment Setup

Add these variables to your `.env` file:

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## API Endpoints

### Franchise Endpoints

**Base URL:** `http://localhost:5000/api/v1/franchise`

- `GET /` - Get all franchises (with optional filters)
  - Query params: `industry`, `minInvestment`, `maxInvestment`, `region`
- `GET /:id` - Get franchise by ID
- `POST /` - Create new franchise (requires authentication)
- `PUT /:id` - Update franchise (requires authentication)
- `DELETE /:id` - Delete franchise (requires authentication + admin)
- `POST /search` - Search franchises with quiz criteria
- `GET /stats` - Get franchise statistics

### Real Estate Endpoints

**Base URL:** `http://localhost:5000/api/v1/realEstate`

- `GET /` - Get all real estate listings (with optional filters)
  - Query params: `category`, `province`, `location`, `minPrice`, `maxPrice`
- `GET /:id` - Get listing by ID
- `POST /` - Create new listing (requires authentication)
- `PUT /:id` - Update listing (requires authentication)
- `DELETE /:id` - Delete listing (requires authentication + admin)
- `GET /categories` - Get all real estate categories
- `GET /province/:province` - Get listings by province

## Example API Calls

### Get All Franchises

```javascript
fetch('http://localhost:5000/api/v1/franchise')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Search Franchises

```javascript
fetch('http://localhost:5000/api/v1/franchise/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    industry: 'Food & Beverage',
    investmentRange: '$100k+',
    region: 'Ontario'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Get Real Estate Listings

```javascript
fetch('http://localhost:5000/api/v1/realEstate?province=Ontario')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Database

The backend uses Supabase for data storage. Make sure you've run the migrations:

1. `supabase/migrations/20251005153951_create_franchise_cache_tables.sql`
2. `supabase/migrations/20251104222107_create_opportunities_tables.sql`

## Frontend Integration

Update your frontend services to call the Express backend instead of directly calling external APIs:

```javascript
// src/features/franchises/services/franchiseAPIService.ts
const API_BASE = 'http://localhost:5000/api/v1';

export const fetchFranchises = async (filters) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE}/franchise?${params}`);
  return response.json();
};

export const searchFranchises = async (criteria) => {
  const response = await fetch(`${API_BASE}/franchise/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(criteria)
  });
  return response.json();
};
```

## Authentication

Protected routes require:
- JWT token in Authorization header: `Bearer <token>`
- User must be authenticated
- Some routes require admin role

## Testing

Start your backend server:

```bash
npm run dev
```

Test endpoints:

```bash
# Get franchises
curl http://localhost:5000/api/v1/franchise

# Get real estate listings
curl http://localhost:5000/api/v1/realEstate

# Search franchises
curl -X POST http://localhost:5000/api/v1/franchise/search \
  -H "Content-Type: application/json" \
  -d '{"industry":"Food & Beverage","region":"Ontario"}'
```
