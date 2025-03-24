// CRS Score breakdown
export interface CrsScoreBreakdown {
  coreHumanCapitalPoints: number;
  spouseFactorsPoints: number;
  skillTransferabilityPoints: number;
  additionalPoints: number;
  totalCrsScore: number;
}

// Core Human Capital factors breakdown
export interface CoreHumanCapitalBreakdown {
  age: number;
  education: number;
  firstOfficialLanguage: number;
  secondOfficialLanguage: number;
  canadianWorkExperience: number;
  total: number;
}

// Spouse factors breakdown
export interface SpouseFactorsBreakdown {
  education: number;
  firstOfficialLanguage: number;
  canadianWorkExperience: number;
  total: number;
}

// Skill Transferability breakdown
export interface SkillTransferabilityBreakdown {
  educationLanguage: number;
  educationCanadianExperience: number;
  foreignWorkLanguage: number;
  foreignWorkCanadianExperience: number;
  certificateOfQualification: number;
  total: number;
}

// Additional Points breakdown
export interface AdditionalPointsBreakdown {
  provincialNomination: number;
  jobOffer: number;
  canadianEducation: number;
  frenchLanguageAbility: number;
  sibling: number;
  total: number;
}

// Detailed CRS Score breakdown
export interface DetailedCrsScoreBreakdown {
  core: CoreHumanCapitalBreakdown;
  spouse: SpouseFactorsBreakdown;
  skillTransferability: SkillTransferabilityBreakdown;
  additional: AdditionalPointsBreakdown;
  totalScore: number;
}

// CLB (Canadian Language Benchmark) levels
export interface CLBLevel {
  clb: number;
  speaking: number;
  listening: number;
  reading: number;
  writing: number;
}

// Provincial Program
export interface ProvincialProgram {
  province: string;
  programName: string;
  requirements: string[];
  eligibility: 'eligible' | 'likely_eligible' | 'not_eligible';
  processingTime: string;
  description: string;
  minimumScore?: number;
  occupationsInDemand?: string[];
}

// Recommendation
export interface Recommendation {
  title: string;
  description: string;
  potentialPoints: number;
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
}

// NOC (National Occupational Classification) job
export interface NOCJob {
  code: string;
  title: string;
  skillLevel: string;
  skillType: string;
  description: string;
  mainDuties: string[];
  requirements: string[];
  inDemandProvinces?: string[];
}

// CRS Eligibility Result
export interface CrsEligibilityResult {
  profileId: number;
  score: CrsScoreBreakdown;
  detailedBreakdown: DetailedCrsScoreBreakdown;
  currentCutoff: number;
  recommendations: Recommendation[];
  provincialPrograms: ProvincialProgram[];
  eligibility: 'eligible' | 'close' | 'not_eligible';
  aiAnalysis?: string;
}

// Form Steps
export enum FormStep {
  PersonalInfo = 1,
  Education = 2,
  Language = 3,
  WorkExperience = 4,
  Results = 5
}

// API Responses
export interface CalculateScoreResponse {
  success: boolean;
  data?: CrsEligibilityResult;
  error?: string;
}

export interface ProvincialProgramsResponse {
  success: boolean;
  data?: ProvincialProgram[];
  error?: string;
}

export interface RecommendationsResponse {
  success: boolean;
  data?: Recommendation[];
  error?: string;
}

export interface NOCJobResponse {
  success: boolean;
  data?: NOCJob;
  error?: string;
}
