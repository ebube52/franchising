export interface FranchiseQuizAnswer {
  step: number;
  question: string;
  answer: string;
  weight: number;
}

export interface FranchiseQuizState {
  currentStep: number;
  answers: FranchiseQuizAnswer[];
  isComplete: boolean;
}

export interface Franchise {
  id: string;
  name: string;
  brand: string;
  industry: string;
  investmentMin: number;
  investmentMax: number;
  region: string[];
  description: string;
  logo?: string;
  image: string;
  businessModel: string;
  supportProvided: string[];
  franchiseFee: number;
  royaltyFee: string;
  territories: number;
  established: number;
  website: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  requirements: {
    liquidCapital: number;
    netWorth: number;
    experience: string;
  };
  matchScore?: number;
}

export interface FranchiseMatchRequest {
  industry: string;
  investmentRange: string;
  lifestyle: string;
  region: string;
  additionalPreferences?: {
    experience: string;
    timeCommitment: string;
    growthGoals: string;
  };
}

export interface FranchiseMatchResponse {
  matches: Franchise[];
  totalMatches: number;
  searchCriteria: FranchiseMatchRequest;
}