# Franchise & Real Estate Integration Complete ✅

## Summary

Successfully integrated franchise and real estate functionality into your BuyersAlike Express.js backend with Supabase database.

## What Was Added

### Backend Files Created

**Models** (Database layer):
- `models/Franchise.js` - Handles all franchise database operations
- `models/RealEstate.js` - Handles all real estate database operations

**Controllers** (Business logic):
- `controllers/franchise.js` - Franchise endpoints logic (search, CRUD, stats)
- `controllers/realEstate.js` - Real estate endpoints logic (listings, categories, CRUD)

**Routes** (API endpoints):
- `routes/franchise.js` - Franchise API routes
- `routes/realEstate.js` - Real estate API routes

**Configuration**:
- `src/app.js` - Updated with new route imports and registrations
- `.env.example` - Updated with Supabase configuration
- `BACKEND_SETUP.md` - Complete setup and API documentation

## API Endpoints Available

### Franchises
```
GET    /api/v1/franchise              - Get all franchises
GET    /api/v1/franchise/:id          - Get franchise by ID
POST   /api/v1/franchise              - Create franchise (auth required)
PUT    /api/v1/franchise/:id          - Update franchise (auth required)
DELETE /api/v1/franchise/:id          - Delete franchise (admin required)
POST   /api/v1/franchise/search       - Search franchises
GET    /api/v1/franchise/stats        - Get statistics
```

### Real Estate
```
GET    /api/v1/realEstate             - Get all listings
GET    /api/v1/realEstate/:id         - Get listing by ID
POST   /api/v1/realEstate             - Create listing (auth required)
PUT    /api/v1/realEstate/:id         - Update listing (auth required)
DELETE /api/v1/realEstate/:id         - Delete listing (admin required)
GET    /api/v1/realEstate/categories  - Get categories
GET    /api/v1/realEstate/province/:province - Get by province
```

## Frontend Integration

Your existing React frontend in `src/features/` already has the components and types:

**Franchises**:
- `src/features/franchises/components/` - All UI components
- `src/features/franchises/services/` - API service clients
- `src/features/franchises/types/` - TypeScript interfaces

**Real Estate**:
- `src/features/real-estate/services/` - API service clients

### Update Frontend to Call Backend

Modify your frontend services to call the Express backend instead of external APIs:

```typescript
// src/features/franchises/services/franchiseAPIService.ts
const API_BASE = 'http://localhost:5000/api/v1';

export const fetchFranchises = async (filters) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE}/franchise?${params}`, {
    credentials: 'include'
  });
  const result = await response.json();
  return result.data;
};

export const searchFranchises = async (criteria) => {
  const response = await fetch(`${API_BASE}/franchise/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(criteria)
  });
  const result = await response.json();
  return result.data;
};
```

## Environment Configuration

Add to your `.env` file:

```bash
# Backend
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string

# Supabase (Backend)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Frontend
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

Make sure you've applied these Supabase migrations:

1. `20251005153951_create_franchise_cache_tables.sql` - Franchise tables
2. `20251104222107_create_opportunities_tables.sql` - Real estate tables

These migrations create:
- `franchises` table with RLS policies
- `opportunities` table for real estate with RLS policies
- `api_cache` and `api_logs` tables
- Helper functions and indexes

## How It Works

### Data Flow

1. **Frontend** → Makes request to Express backend
2. **Express Routes** → Validates request, calls controller
3. **Controllers** → Business logic, calls model methods
4. **Models** → Queries Supabase database using `@supabase/supabase-js`
5. **Supabase** → Returns data with RLS policies applied
6. **Response** → Back through layers to frontend

### Authentication

Protected routes use your existing auth middleware:
- JWT token required in Authorization header
- `protect` middleware for authenticated users
- `authorize('admin')` for admin-only operations

### Benefits

✅ **Centralized API**: All external API calls happen server-side
✅ **Security**: API keys stay on backend, never exposed to frontend
✅ **Caching**: Built-in API caching in database
✅ **Logging**: All API calls logged for monitoring
✅ **RLS**: Row-level security policies protect data
✅ **Scalable**: Easy to add more franchise/real estate data sources

## Next Steps

1. **Configure Environment**:
   - Add Supabase credentials to `.env`
   - Ensure MongoDB connection is working

2. **Start Backend**:
   ```bash
   npm run dev
   ```

3. **Test Endpoints**:
   ```bash
   curl http://localhost:5000/api/v1/franchise
   curl http://localhost:5000/api/v1/realEstate
   ```

4. **Update Frontend Services**:
   - Modify API calls to use Express backend
   - Update base URL to `http://localhost:5000/api/v1`

5. **Deploy**:
   - Deploy Express backend to your hosting service
   - Update frontend API base URL to production URL

## Documentation

- **Backend Setup**: See `BACKEND_SETUP.md`
- **API Guide**: See `FRANCHISE_API_GUIDE.md`
- **Real Estate**: See `REAL_ESTATE_VIEWING_GUIDE.md`

## Support

The integration follows your existing Express.js patterns:
- Same middleware structure
- Same authentication flow
- Same error handling
- Same versioned API pattern (`/api/v1/`)

All franchise and real estate data is now managed through your backend with Supabase providing secure, scalable database storage!
