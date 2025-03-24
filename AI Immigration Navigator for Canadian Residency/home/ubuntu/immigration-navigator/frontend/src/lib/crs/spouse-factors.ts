// Spouse factors calculation

import { UserProfile, CRSScoreBreakdown } from './types';

// Spouse education points calculation
export function calculateSpouseEducationPoints(educationLevel: string): number {
  const educationPoints = {
    'less-than-secondary': 0,
    'secondary': 2,
    'one-year': 6,
    'two-year': 7,
    'bachelors': 8,
    'two-or-more': 9,
    'masters': 10,
    'doctoral': 10
  };

  return educationPoints[educationLevel] || 0;
}

// Spouse language points calculation
export function calculateSpouseLanguagePoints(
  reading: number,
  writing: number,
  speaking: number,
  listening: number
): number {
  const pointsPerAbility = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 1,
    6: 1, 7: 3, 8: 3, 9: 5, 10: 5, 11: 5, 12: 5
  };
  
  let totalPoints = 0;
  for (const score of [reading, writing, speaking, listening]) {
    totalPoints += pointsPerAbility[score] || 0;
  }
  
  return Math.min(totalPoints, 20); // Maximum 20 points
}

// Spouse Canadian work experience points calculation
export function calculateSpouseWorkExperiencePoints(years: number): number {
  const workExpPoints = {
    0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10
  };

  // If more than 5 years, cap at 5 years
  const cappedYears = Math.min(years, 5);
  return workExpPoints[cappedYears] || 0;
}

// Calculate spouse factors
export function calculateSpouseFactors(profile: UserProfile): CRSScoreBreakdown['spouseFactors'] {
  const hasSpouse = profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law';
  const spouseComingToCanada = hasSpouse && profile.spouseComingToCanada;
  
  // If no spouse or spouse not coming to Canada, return zeros
  if (!spouseComingToCanada) {
    return {
      education: 0,
      languageProficiency: 0,
      canadianWorkExperience: 0,
      subtotal: 0
    };
  }
  
  // Calculate spouse education points
  const educationPoints = profile.spouseEducationLevel 
    ? calculateSpouseEducationPoints(profile.spouseEducationLevel)
    : 0;
  
  // Calculate spouse language points
  const languagePoints = profile.spouseLanguageProficiency
    ? calculateSpouseLanguagePoints(
        profile.spouseLanguageProficiency.reading,
        profile.spouseLanguageProficiency.writing,
        profile.spouseLanguageProficiency.speaking,
        profile.spouseLanguageProficiency.listening
      )
    : 0;
  
  // Calculate spouse work experience points
  const workExperiencePoints = profile.spouseCanadianWorkExperience
    ? calculateSpouseWorkExperiencePoints(profile.spouseCanadianWorkExperience)
    : 0;
  
  const subtotal = educationPoints + languagePoints + workExperiencePoints;
  
  return {
    education: educationPoints,
    languageProficiency: languagePoints,
    canadianWorkExperience: workExperiencePoints,
    subtotal: subtotal
  };
}
