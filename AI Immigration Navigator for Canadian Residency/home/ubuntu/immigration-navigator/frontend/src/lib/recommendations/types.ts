// Types for recommendation engine

import { UserProfile, CRSScoreBreakdown, ImmigrationPathway, ImprovementSuggestion } from '../crs/types';

export interface ProgramRequirement {
  name: string;
  description: string;
  isMet: boolean;
  details: string;
}

export interface ImmigrationProgram {
  id: string;
  name: string;
  category: 'express_entry' | 'provincial_nominee' | 'other';
  description: string;
  requirements: ProgramRequirement[];
  eligibilityScore: number; // 0-100 score indicating how well the profile matches
  minimumRequirementsMet: boolean;
  crsScoreRequired?: number;
  provincialStream?: string;
  occupation?: string[];
  nextSteps: string[];
  officialLink: string;
}

export interface RecommendationResult {
  topPathways: ImmigrationPathway[];
  allPrograms: ImmigrationProgram[];
  improvementSuggestions: ImprovementSuggestion[];
  recentTrends: {
    averageScore: number;
    lowestScore: number;
    highestScore: number;
    userPercentile: number;
    drawFrequency: string;
  };
  alerts: {
    type: 'info' | 'warning' | 'success';
    message: string;
  }[];
}
