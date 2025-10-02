# Bolt AI Prompt: Franchise Matching System for BuyersAlike

Build a comprehensive Franchise Matching platform for BuyersAlike - a Canadian business opportunity marketplace.

## 🎯 Project Overview
Create a full-stack franchise matching system that connects potential franchisees with Canadian franchise opportunities through an intelligent quiz-based matching algorithm, with monetization through paid listings.

## 🛠 Tech Stack Requirements
- **Frontend**: React 18+ with TypeScript, Tailwind CSS, Lucide React icons
- **Backend**: Node.js + Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens, bcrypt for passwords
- **Payments**: Stripe integration for paid listings
- **Caching**: Redis for API response caching
- **File Upload**: Multer for franchise logos/images
- **Deployment**: Docker containers (optional but preferred)

## 🎨 Frontend Requirements

### 1. Multi-Step Quiz Wizard (4 Steps)
Create a beautiful, responsive quiz with progress tracking:

**Step 1: Industry Selection**
```
Options: Food & Beverage, Business Services, Health & Senior Care, Real Estate, Education, Retail, Automotive, Transportation, Fitness & Wellness, Any Industry
UI: Large clickable cards with icons and descriptions
```

**Step 2: Investment Budget**
```
Options: $5,000 - $25,000, $25,000 - $100,000, $100,000 - $500,000, $500,000+
UI: Investment range cards with descriptions of typical franchise types
```

**Step 3: Lifestyle Preference**
```
Options: Work from Home, Retail Storefront, Service-Based, B2B Operations, Mobile/Field Service
UI: Lifestyle cards with business model descriptions
```

**Step 4: Geographic Region**
```
Options: Ontario, Quebec, British Columbia, Alberta, Canada-Wide, Other (dropdown with all provinces)
UI: Map-style selection or province cards
Special: Prioritize Ontario matches when selected
```

### 2. Results Display System
After quiz completion, display matching franchises:

**Franchise Cards Design:**
- Franchise logo/image (fallback to placeholder)
- Franchise name and brand
- Industry badge with color coding
- Investment range prominently displayed
- Region availability
- Match percentage (85% Match, 92% Match, etc.)
- 150-200 character description
- "Learn More" and "Contact Franchisor" buttons
- Featured badge for paid listings (⭐ Featured)

**Results Features:**
- Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Sort by match percentage, investment amount, alphabetical
- Filter by industry, region, investment range
- "No matches found" state with suggestions
- Pagination for large result sets

### 3. Franchise Detail Modal/Page
Detailed franchise information:
- Hero image with franchise branding
- Complete franchise details (investment, fees, territories, established year)
- Support provided (training, marketing, operations, etc.)
- Financial requirements (liquid capital, net worth, experience)
- Territory information and availability
- Contact form integration
- Related/similar franchises section

### 4. Franchisor Self-Service Portal
**Franchise Submission Form (Multi-step):**

Step 1: Basic Information
- Franchise name and brand
- Industry selection
- Investment range (min/max)
- Franchise fee amount
- Royalty fee percentage
- Regions available

Step 2: Detailed Information
- Company description (500+ chars)
- Business model type
- Support provided (checkboxes)
- Financial requirements
- Territory count
- Established year
- Website URL

Step 3: Contact & Media
- Contact person name
- Email and phone
- Logo/image upload (with preview)
- Additional images (gallery)

Step 4: Listing Type & Payment
- Free listing (standard placement)
- Featured listing ($199/month - premium placement, highlighted design)
- Payment integration with Stripe
- Terms and conditions acceptance

## 🔧 Backend API Requirements

### 1. Core API Endpoints

```typescript
// Franchise Matching
POST /api/franchise-match
Body: { industry, investmentRange, lifestyle, region }
Response: { matches: Franchise[], totalMatches: number, searchCriteria }

// Franchise Management
GET /api/franchises
Query: ?industry=&region=&minInvestment=&maxInvestment=&featured=true
Response: { franchises: Franchise[], pagination, filters }

GET /api/franchises/:id
Response: { franchise: FranchiseDetail }

// Franchisor Portal
POST /api/franchises/submit
Body: FranchiseSubmission
Response: { submissionId, status: 'pending' }

// Admin Endpoints
GET /api/admin/franchises/pending
Response: { pendingFranchises: Franchise[] }

PATCH /api/admin/franchises/:id/approve
PATCH /api/admin/franchises/:id/reject

// Payment Processing
POST /api/payments/create-checkout
Body: { franchiseId, listingType: 'featured' }
Response: { checkoutUrl, sessionId }

POST /api/payments/webhook
Body: Stripe webhook payload
```

### 2. Database Schema (PostgreSQL + Prisma)

```prisma
model Franchise {
  id                String   @id @default(cuid())
  name              String
  brand             String?
  industry          String
  investmentMin     Int
  investmentMax     Int
  franchiseFee      Int?
  royaltyFee        String?
  regions           String[] // Array of provinces
  description       String
  businessModel     String
  supportProvided   String[]
  territories       Int?
  established       Int?
  website           String?
  logoUrl           String?
  images            String[]
  
  // Contact Information
  contactName       String
  contactEmail      String
  contactPhone      String
  
  // Requirements
  liquidCapital     Int?
  netWorth          Int?
  experienceReq     String?
  
  // Listing Management
  listingType       ListingType @default(FREE)
  status            FranchiseStatus @default(PENDING)
  featured          Boolean @default(false)
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  createdBy         String?
  
  // Relations
  payments          Payment[]
  
  @@map("franchises")
}

enum ListingType {
  FREE
  FEATURED
}

enum FranchiseStatus {
  PENDING
  APPROVED
  REJECTED
  EXPIRED
}

model Payment {
  id                String @id @default(cuid())
  franchiseId       String
  franchise         Franchise @relation(fields: [franchiseId], references: [id])
  
  amount            Int // Amount in cents
  currency          String @default("CAD")
  status            PaymentStatus
  stripeSessionId   String?
  stripePaymentId   String?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@map("payments")
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model User {
  id                String @id @default(cuid())
  email             String @unique
  password          String
  role              UserRole @default(FRANCHISOR)
  
  // Profile
  firstName         String?
  lastName          String?
  company           String?
  phone             String?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@map("users")
}

enum UserRole {
  ADMIN
  FRANCHISOR
  FRANCHISEE
}
```

### 3. Matching Algorithm Implementation

```typescript
interface MatchingCriteria {
  industry: string;
  investmentRange: string;
  lifestyle: string;
  region: string;
}

interface ScoredFranchise extends Franchise {
  matchScore: number;
  matchReasons: string[];
}

function calculateFranchiseMatch(
  franchise: Franchise, 
  criteria: MatchingCriteria
): ScoredFranchise {
  let score = 0;
  const reasons: string[] = [];
  
  // Industry Match (40% weight)
  if (criteria.industry === 'Any Industry' || franchise.industry === criteria.industry) {
    score += 40;
    reasons.push(`${franchise.industry} industry match`);
  }
  
  // Investment Range Match (20% weight)
  const [minBudget, maxBudget] = parseInvestmentRange(criteria.investmentRange);
  if (franchise.investmentMax >= minBudget && franchise.investmentMin <= maxBudget) {
    score += 20;
    reasons.push('Investment range fits budget');
  }
  
  // Region Match (30% weight) - Ontario Priority
  if (franchise.regions.includes(criteria.region)) {
    score += 30;
    if (criteria.region === 'Ontario') {
      score += 5; // Ontario bonus
    }
    reasons.push(`Available in ${criteria.region}`);
  } else if (franchise.regions.includes('Canada-Wide')) {
    score += 25;
    reasons.push('Available Canada-wide');
  }
  
  // Lifestyle Match (10% weight)
  const lifestyleMatch = matchLifestyle(franchise.businessModel, criteria.lifestyle);
  if (lifestyleMatch) {
    score += 10;
    reasons.push(`${criteria.lifestyle} compatible`);
  }
  
  return {
    ...franchise,
    matchScore: Math.min(score, 100),
    matchReasons: reasons
  };
}

// Redis Caching Implementation
async function getCachedMatches(criteria: MatchingCriteria): Promise<ScoredFranchise[] | null> {
  const cacheKey = `matches:${JSON.stringify(criteria)}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const matches = await findMatches(criteria);
  await redis.setex(cacheKey, 300, JSON.stringify(matches)); // 5 min cache
  
  return matches;
}
```

### 4. Third-Party Integration Templates

```typescript
// Partner API Connector Template
interface PartnerFranchiseData {
  // Normalized franchise data structure
  externalId: string;
  source: 'CFA' | 'FranchiseDirect' | 'BeTheBoss';
  rawData: any;
}

class CFAConnector {
  private apiKey: string;
  private baseUrl = 'https://api.cfa.ca/v1';
  
  async fetchFranchises(): Promise<PartnerFranchiseData[]> {
    const response = await fetch(`${this.baseUrl}/franchises`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    
    const data = await response.json();
    return data.franchises.map(this.normalizeData);
  }
  
  private normalizeData(rawFranchise: any): PartnerFranchiseData {
    return {
      externalId: rawFranchise.id,
      source: 'CFA',
      rawData: rawFranchise,
      // Map to our schema
      name: rawFranchise.franchiseName,
      industry: this.mapIndustry(rawFranchise.category),
      investmentMin: rawFranchise.minInvestment,
      investmentMax: rawFranchise.maxInvestment,
      // ... other field mappings
    };
  }
}

// Webhook Handler for Partner Updates
app.post('/api/webhooks/partner-update', async (req, res) => {
  const { source, action, franchiseData } = req.body;
  
  switch (action) {
    case 'created':
      await createFranchiseFromPartner(franchiseData, source);
      break;
    case 'updated':
      await updateFranchiseFromPartner(franchiseData, source);
      break;
    case 'deleted':
      await deleteFranchiseFromPartner(franchiseData.id, source);
      break;
  }
  
  res.status(200).json({ received: true });
});
```

## 💰 Monetization Features

### 1. Paid Listing System
- **Free Listings**: Standard placement, basic features
- **Featured Listings**: $199/month with:
  - ⭐ Featured badge
  - Top placement in search results
  - Highlighted card design with premium styling
  - Priority in matching algorithm (+5 bonus points)
  - Enhanced analytics dashboard
  - Priority customer support

### 2. Stripe Integration
```typescript
// Stripe Checkout Session
app.post('/api/payments/create-checkout', async (req, res) => {
  const { franchiseId, listingType } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'cad',
        product_data: {
          name: 'Featured Franchise Listing',
          description: 'Premium placement for 30 days'
        },
        unit_amount: 19900, // $199.00 CAD
        recurring: {
          interval: 'month'
        }
      },
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata: {
      franchiseId,
      listingType
    }
  });
  
  res.json({ checkoutUrl: session.url });
});
```

## 🔐 Security & Authentication

### 1. JWT Authentication
```typescript
// JWT middleware
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

### 2. API Key Authentication for Partners
```typescript
const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || !await isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
};
```

## 🏗 Admin Dashboard Requirements

### 1. Franchise Management
- View all pending franchise submissions
- Approve/reject submissions with notes
- Edit franchise details
- Manage featured listings
- View payment history
- Analytics dashboard (submissions, approvals, revenue)

### 2. User Management
- View registered franchisors
- Manage user roles and permissions
- View user activity logs

### 3. Revenue Analytics
- Monthly recurring revenue tracking
- Featured listing performance metrics
- Conversion rates (free to paid upgrades)
- Geographic revenue distribution

## 📊 Sample Seed Data

Create seed data with 15+ Canadian franchises including:

**Food & Beverage:**
- Tim Hortons (Ontario, $438K-$2.2M)
- Subway Canada (Canada-Wide, $116K-$263K)
- Boston Pizza (Canada-Wide, $1.2M-$1.8M)

**Business Services:**
- Molly Maid (Canada-Wide, $90K-$120K)
- Jani-King (Ontario, $11K-$35K)
- TWO MEN AND A TRUCK (Canada-Wide, $158K-$584K)

**Education:**
- Kumon (Canada-Wide, $70K-$140K)
- Oxford Learning (Ontario, $125K-$200K)
- Sylvan Learning (Canada-Wide, $179K-$305K)

**Real Estate:**
- RE/MAX (Canada-Wide, $25K-$200K)
- Century 21 (Canada-Wide, $35K-$150K)

## 🚀 MVP Development Plan

### Week 1: Foundation
- Set up project structure (React + Node.js + PostgreSQL)
- Create database schema and seed data
- Build basic Express API with franchise endpoints
- Implement GET /api/franchises with filtering

### Week 2: Core Matching
- Build 4-step quiz wizard frontend
- Implement POST /api/franchise-match endpoint
- Create matching algorithm with weighted scoring
- Display results in responsive card layout
- Add Ontario prioritization logic

### Week 3: Self-Service Portal
- Build franchise submission form (multi-step)
- Implement admin approval workflow
- Add Stripe checkout for featured listings
- Create basic admin dashboard

### Week 4: Polish & Deploy
- Add partner API connector templates
- Implement Redis caching
- Add comprehensive error handling
- Deploy to staging environment
- Performance optimization

## 🌟 Advanced Features (Post-MVP)

### Phase 2 Enhancements:
- Advanced search with Elasticsearch
- Email marketing integration for leads
- Mobile app (React Native)
- Franchise comparison tool
- Lead management system for franchisors
- Automated partner data synchronization
- Multi-language support (French for Quebec)

### Phase 3 Scaling:
- Microservices architecture
- CDN for image delivery
- Advanced analytics with machine learning
- White-label solutions for franchise associations
- API marketplace for third-party integrations

## 📋 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/buyersalike"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Redis
REDIS_URL="redis://localhost:6379"

# Partner APIs
CFA_API_KEY="your-cfa-api-key"
FRANCHISE_DIRECT_API_KEY="your-fd-api-key"
BETHEBOSS_API_KEY="your-bb-api-key"

# File Upload
AWS_S3_BUCKET="franchise-logos"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"

# Email
SENDGRID_API_KEY="your-sendgrid-key"
FROM_EMAIL="noreply@buyersalike.com"

# App
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## 📚 Documentation Requirements

### 1. README.md
- Project overview and features
- Local development setup
- Docker deployment instructions
- API documentation
- Contributing guidelines

### 2. API Documentation
- OpenAPI/Swagger specification
- Endpoint descriptions with examples
- Authentication requirements
- Rate limiting information

### 3. Deployment Guide
- Production deployment checklist
- Environment configuration
- Database migration instructions
- Monitoring and logging setup

## ⚖️ Legal & Compliance Notes

### 1. Data Privacy
- PIPEDA compliance for Canadian personal data
- Cookie consent implementation
- Data retention policies
- User data export/deletion capabilities

### 2. Partner Agreements
- Respect robots.txt for any web scraping
- Comply with partner API terms of service
- Implement proper attribution for partner data
- Rate limiting to avoid API abuse

### 3. Franchise Regulations
- Disclaimer about franchise disclosure requirements
- Links to provincial franchise regulatory bodies
- Clear terms of service for listing submissions
- Fraud prevention measures

## 🎨 Design System Requirements

### 1. Color Palette
- Primary: Blue (#2563EB) for trust and professionalism
- Secondary: Green (#059669) for success and money
- Accent: Orange (#EA580C) for featured listings
- Neutral: Gray scale for text and backgrounds

### 2. Typography
- Headings: Inter or similar modern sans-serif
- Body: System fonts for performance
- Consistent sizing scale (12px, 14px, 16px, 18px, 24px, 32px)

### 3. Component Library
- Reusable button components with variants
- Form input components with validation states
- Card components for franchises
- Modal/dialog components
- Loading states and skeletons

This comprehensive specification should provide everything needed to build a production-ready franchise matching platform with monetization capabilities, proper security, and scalability considerations.

---

# Franchise Feature Integration for BuyersAlike

## 🎯 Additional Feature Requirements

Implement a new 'Franchise Opportunities' feature within the BuyersAlike platform, mirroring the existing 'Business Opportunities' display structure.

### Core Requirements:

#### 1. Dedicated Franchise Section
Create a new primary category filter specifically for 'Franchises'. This filter should appear alongside existing categories (Real Estate, Gas Station, Entertainment, Logistics) and allow users to exclusively view franchise listings.

```typescript
// Enhanced category structure
const categories = [
  { name: 'All', count: allOpportunities.length },
  { name: 'Franchises', count: franchiseOpportunities.length }, // NEW
  { name: 'Real Estate', count: realEstateOpportunities.length },
  { name: 'Gas Station', count: gasStationOpportunities.length },
  { name: 'Entertainment', count: entertainmentOpportunities.length },
  { name: 'Logistics', count: logisticsOpportunities.length },
  { name: 'Business Services', count: businessServiceOpportunities.length }
];
```

#### 2. API Integration for Canadian Franchises

Develop an API that pulls franchise opportunities from designated Canadian franchise databases:

```typescript
// Enhanced API endpoints for Canadian franchise data
const canadianFranchiseAPIs = {
  cfa: {
    name: 'Canadian Franchise Association',
    baseUrl: 'https://api.cfa.ca/v1',
    endpoints: {
      search: '/franchises/search',
      details: '/franchises/{id}',
      categories: '/categories'
    }
  },
  franchiseCanada: {
    name: 'Franchise Canada Directory',
    baseUrl: 'https://api.franchisecanada.online/v1',
    endpoints: {
      opportunities: '/opportunities',
      provinces: '/locations/provinces'
    }
  },
  betheboss: {
    name: 'BeTheBoss.ca',
    baseUrl: 'https://api.betheboss.ca/v2',
    endpoints: {
      franchises: '/franchises',
      search: '/search'
    }
  }
};
```

**Required Franchise Data Fields:**
- Franchise Name
- Investment Range (e.g., $10,000 - $500,000)
- Detailed Description of the franchise opportunity
- Location (targeting all provinces and territories across Canada)
- Relevant Image for the franchise listing
- Date Posted
- Number of partners/locations (contact metric)
- Industry/Category classification
- Support provided (training, marketing, etc.)
- Franchise fee and royalty information

#### 3. On-Platform Display (No External Links)

All franchise listings must be displayed directly on the BuyersAlike platform with detailed internal views:

```typescript
// Franchise detail modal/page structure
interface FranchiseDetailView {
  basicInfo: {
    name: string;
    brand: string;
    industry: string;
    investmentRange: string;
    description: string;
    image: string;
  };
  financials: {
    franchiseFee: number;
    royaltyFee: string;
    liquidCapitalRequired: number;
    totalInvestment: string;
  };
  support: {
    training: boolean;
    marketing: boolean;
    operations: boolean;
    siteSelection: boolean;
    ongoingSupport: string[];
  };
  locations: {
    availableProvinces: string[];
    existingLocations: number;
    territoryRights: string;
  };
  contact: {
    franchiseDevelopment: string;
    phone: string;
    email: string;
  };
}
```

#### 4. Integrated Contact Mechanism

Provide multiple contact options within the BuyersAlike platform:

```typescript
// Contact system implementation
interface FranchiseContactSystem {
  // Internal messaging system
  sendMessage: (franchiseId: string, message: string, userInfo: UserInfo) => Promise<void>;
  
  // Information request system
  requestInfo: (franchiseId: string, requestType: 'brochure' | 'financials' | 'meeting') => Promise<void>;
  
  // Lead tracking
  trackInterest: (franchiseId: string, userId: string, interactionType: string) => Promise<void>;
  
  // Contact form
  submitContactForm: (franchiseId: string, contactData: ContactFormData) => Promise<void>;
}

// Contact form fields
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  investmentCapacity: string;
  timeframe: string;
  experience: string;
  preferredLocation: string;
  specificQuestions: string;
}
```

#### 5. Search and Filter Functionality

Enhanced search capabilities for franchise-specific needs:

```typescript
// Franchise-specific filters
interface FranchiseFilters {
  investmentRange: {
    min: number;
    max: number;
  };
  provinces: string[];
  industries: string[];
  franchiseFeeRange: {
    min: number;
    max: number;
  };
  supportTypes: string[];
  experienceRequired: 'none' | 'some' | 'extensive';
  businessModel: 'retail' | 'service' | 'restaurant' | 'b2b' | 'home-based';
}

// Enhanced search functionality
const searchFranchises = (query: string, filters: FranchiseFilters) => {
  return franchises.filter(franchise => {
    // Text search across multiple fields
    const textMatch = [
      franchise.name,
      franchise.description,
      franchise.industry,
      franchise.businessModel
    ].some(field => 
      field.toLowerCase().includes(query.toLowerCase())
    );
    
    // Investment range filter
    const investmentMatch = 
      franchise.investmentMin >= filters.investmentRange.min &&
      franchise.investmentMax <= filters.investmentRange.max;
    
    // Location filter
    const locationMatch = filters.provinces.length === 0 ||
      filters.provinces.some(province => 
        franchise.availableProvinces.includes(province)
      );
    
    return textMatch && investmentMatch && locationMatch;
  });
};
```

#### 6. Admin Approval Process

Implement comprehensive admin workflow for franchise listings:

```typescript
// Admin approval system
interface FranchiseApprovalSystem {
  // Approval statuses
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'requires_changes';
  
  // Admin actions
  approveListings: (franchiseIds: string[], adminId: string) => Promise<void>;
  rejectListings: (franchiseIds: string[], reason: string, adminId: string) => Promise<void>;
  requestChanges: (franchiseId: string, changes: string[], adminId: string) => Promise<void>;
  
  // Approval workflow
  submissionQueue: FranchiseSubmission[];
  reviewHistory: ApprovalAction[];
  
  // Automated checks
  validateSubmission: (submission: FranchiseSubmission) => ValidationResult;
  flagSuspiciousListings: (submission: FranchiseSubmission) => SuspiciousFlag[];
}

// Admin dashboard components
interface AdminDashboardFeatures {
  pendingApprovals: FranchiseSubmission[];
  approvalMetrics: {
    totalSubmissions: number;
    approvedThisMonth: number;
    rejectedThisMonth: number;
    averageReviewTime: number;
  };
  bulkActions: {
    approveSelected: (ids: string[]) => void;
    rejectSelected: (ids: string[], reason: string) => void;
  };
  qualityControls: {
    duplicateDetection: boolean;
    imageValidation: boolean;
    contactInfoVerification: boolean;
  };
}
```

#### 7. Design and UI/UX Requirements

Maintain visual consistency with existing BuyersAlike design:

```typescript
// Franchise card component structure
interface FranchiseCardProps {
  franchise: {
    id: string;
    name: string;
    image: string;
    investment: string;
    description: string;
    postedDate: string;
    partners: string; // or locations count
    industry: string;
    approvalStatus: 'approved' | 'pending' | 'under_review';
  };
  onLearnMore: (franchiseId: string) => void;
  onContact: (franchiseId: string) => void;
}

// Card layout matching existing business opportunities
const FranchiseCard = ({ franchise, onLearnMore, onContact }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
    {/* Image with approval status badge */}
    <div className="h-48 overflow-hidden relative">
      <img src={franchise.image} alt={franchise.name} className="w-full h-full object-cover" />
      {franchise.approvalStatus === 'pending' && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
          Please approve
        </div>
      )}
    </div>
    
    {/* Content matching existing layout */}
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          Franchise
        </span>
        <h3 className="text-xl font-bold text-gray-900">{franchise.name}</h3>
      </div>
      
      {/* Investment and details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <div>
            <span className="text-sm text-gray-600">Investment: </span>
            <span className="font-bold text-green-600 text-lg">{franchise.investment}</span>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
        {franchise.description}
      </p>
      
      {/* Action buttons */}
      <div className="flex gap-3 mb-4">
        <button 
          onClick={() => onLearnMore(franchise.id)}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
        >
          Learn More
        </button>
        <button 
          onClick={() => onContact(franchise.id)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Contact Franchise
        </button>
      </div>
      
      {/* Footer info */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Posted {franchise.postedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{franchise.partners}</span>
        </div>
      </div>
    </div>
  </div>
);
```

### Implementation Priority:

1. **Phase 1**: Basic franchise category filter and display
2. **Phase 2**: Canadian franchise API integration
3. **Phase 3**: Detailed franchise view and contact system
4. **Phase 4**: Admin approval workflow
5. **Phase 5**: Advanced search and filtering
6. **Phase 6**: Analytics and optimization

### Success Metrics:
- Number of franchise inquiries generated
- User engagement with franchise listings
- Conversion rate from view to contact
- Admin approval efficiency
- Search and filter usage patterns

This integration ensures BuyersAlike becomes a comprehensive platform for Canadian franchise opportunities while maintaining the existing user experience and design consistency.