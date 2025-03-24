// Additional points calculation

import { UserProfile, CRSScoreBreakdown } from './types';

// Provincial nomination points
export function calculateProvincialNominationPoints(hasNomination: boolean): number {
  return hasNomination ? 600 : 0;
}

// Job offer points
export function calculateJobOfferPoints(hasJobOffer: boolean, nocCategory: string): number {
  if (!hasJobOffer) {
    return 0;
  }
  
  // TEER 0 (NOC 00) job offers are worth 200 points
  if (nocCategory === 'teer-0') {
    return 200;
  }
  
  // TEER 1, 2, 3 job offers are worth 50 points
  if (['teer-1', 'teer-2', 'teer-3'].includes(nocCategory)) {
    return 50;
  }
  
  return 0;
}

// Canadian education points
export function calculateCanadianEducationPoints(
  hasCanadianEducation: boolean,
  canadianEducationLevel: string
): number {
  if (!hasCanadianEducation) {
    return 0;
  }
  
  // One or two-year post-secondary program
  if (['one-year', 'two-year'].includes(canadianEducationLevel)) {
    return 15;
  }
  
  // Three-year or longer post-secondary program, master's, or doctorate
  if (['bachelors', 'two-or-more', 'masters', 'doctoral'].includes(canadianEducationLevel)) {
    return 30;
  }
  
  return 0;
}

// French language skills points
export function calculateFrenchLanguagePoints(
  firstLanguage: string,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number
): number {
  // Check if French proficiency is at least CLB 7 in all abilities
  const hasFrenchCLB7 = [frenchReading, frenchWriting, frenchSpeaking, frenchListening].every(score => score >= 7);
  
  if (!hasFrenchCLB7) {
    return 0;
  }
  
  // Check if English proficiency is at least CLB 5 in all abilities
  const hasEnglishCLB5 = [englishReading, englishWriting, englishSpeaking, englishListening].every(score => score >= 5);
  
  // If French is CLB 7+ and English is CLB 5+, award 50 points
  if (hasEnglishCLB5) {
    return 50;
  }
  
  // If French is CLB 7+ but English is less than CLB 5, award 25 points
  return 25;
}

// Sibling in Canada points
export function calculateSiblingPoints(hasSibling: boolean): number {
  return hasSibling ? 15 : 0;
}

// Calculate additional points
export function calculateAdditionalPoints(profile: UserProfile): CRSScoreBreakdown['additionalPoints'] {
  // Provincial nomination
  const provincialNominationPoints = calculateProvincialNominationPoints(profile.provincialNomination);
  
  // Job offer
  const jobOfferPoints = calculateJobOfferPoints(profile.jobOffer, profile.jobOfferNOC);
  
  // Canadian education
  const canadianEducationPoints = calculateCanadianEducationPoints(
    profile.canadianEducation,
    profile.canadianEducationLevel
  );
  
  // French language skills
  const frenchLanguagePoints = calculateFrenchLanguagePoints(
    profile.firstLanguage,
    profile.frenchReading,
    profile.frenchWriting,
    profile.frenchSpeaking,
    profile.frenchListening,
    profile.englishReading,
    profile.englishWriting,
    profile.englishSpeaking,
    profile.englishListening
  );
  
  // Sibling in Canada
  const siblingPoints = calculateSiblingPoints(profile.canadianSibling);
  
  // Calculate subtotal
  const subtotal = provincialNominationPoints + jobOfferPoints + 
                  canadianEducationPoints + frenchLanguagePoints + siblingPoints;
  
  return {
    provincialNomination: provincialNominationPoints,
    jobOffer: jobOfferPoints,
    canadianEducation: canadianEducationPoints,
    frenchLanguageSkills: frenchLanguagePoints,
    sibling: siblingPoints,
    subtotal: subtotal
  };
}
