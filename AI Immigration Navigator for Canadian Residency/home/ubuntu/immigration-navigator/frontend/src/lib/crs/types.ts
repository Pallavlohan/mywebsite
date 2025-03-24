// Types for CRS calculator

export interface UserProfile {
  // Personal Info
  age: number;
  maritalStatus: string;
  spouseComingToCanada: boolean;
  
  // Education
  educationLevel: string;
  canadianEducation: boolean;
  canadianEducationLevel: string;
  
  // Language
  firstLanguage: string;
  englishReading: number;
  englishWriting: number;
  englishSpeaking: number;
  englishListening: number;
  frenchReading: number;
  frenchWriting: number;
  frenchSpeaking: number;
  frenchListening: number;
  
  // Work Experience
  canadianWorkExperience: number;
  foreignWorkExperience: number;
  
  // Additional Factors
  provincialNomination: boolean;
  jobOffer: boolean;
  jobOfferNOC: string;
  canadianSibling: boolean;
  frenchEducation: boolean;

  // Spouse factors (if applicable)
  spouseEducationLevel?: string;
  spouseLanguageProficiency?: {
    reading: number;
    writing: number;
    speaking: number;
    listening: number;
  };
  spouseCanadianWorkExperience?: number;
}

export interface CRSScoreBreakdown {
  coreHumanCapital: {
    age: number;
    education: number;
    firstLanguage: number;
    secondLanguage: number;
    canadianWorkExperience: number;
    subtotal: number;
  };
  spouseFactors: {
    education: number;
    languageProficiency: number;
    canadianWorkExperience: number;
    subtotal: number;
  };
  skillTransferability: {
    education: {
      withLanguage: number;
      withCanadianWorkExperience: number;
    };
    foreignWorkExperience: {
      withLanguage: number;
      withCanadianWorkExperience: number;
    };
    certificateOfQualification: number;
    subtotal: number;
  };
  additionalPoints: {
    provincialNomination: number;
    jobOffer: number;
    canadianEducation: number;
    frenchLanguageSkills: number;
    sibling: number;
    subtotal: number;
  };
  total: number;
}

export interface ImmigrationPathway {
  name: string;
  eligibility: "Eligible" | "Potentially Eligible" | "Not Eligible";
  score: number | string;
  description: string;
  nextSteps: string[];
}

export interface ImprovementSuggestion {
  category: string;
  suggestion: string;
  potentialPoints: number;
  description: string;
}

export interface ExpressEntryDraw {
  date: string;
  type: string;
  score: number;
  invitations: number;
}

export interface CRSResult {
  totalScore: number;
  breakdown: {
    coreHumanCapital: number;
    spouseFactors: number;
    skillTransferability: number;
    additionalPoints: number;
  };
  detailedBreakdown: CRSScoreBreakdown;
  recentDraws: ExpressEntryDraw[];
  recommendedPathways: ImmigrationPathway[];
  improvementSuggestions: ImprovementSuggestion[];
}
