// Core human capital factors calculation

import { UserProfile, CRSScoreBreakdown } from './types';

// Age points calculation
export function calculateAgePoints(age: number, hasSpouse: boolean): number {
  if (age < 18 || age > 45) return 0;
  
  const agePoints = {
    withSpouse: {
      18: 90, 19: 95,
      20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100,
      30: 95, 31: 90, 32: 85, 33: 80, 34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50,
      40: 45, 41: 35, 42: 25, 43: 15, 44: 5
    },
    withoutSpouse: {
      18: 99, 19: 105,
      20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110,
      30: 105, 31: 99, 32: 94, 33: 88, 34: 83, 35: 77, 36: 72, 37: 66, 38: 61, 39: 55,
      40: 50, 41: 39, 42: 28, 43: 17, 44: 6
    }
  };

  const category = hasSpouse ? 'withSpouse' : 'withoutSpouse';
  return agePoints[category][age] || 0;
}

// Education points calculation
export function calculateEducationPoints(educationLevel: string, hasSpouse: boolean): number {
  const educationPoints = {
    withSpouse: {
      'less-than-secondary': 0,
      'secondary': 28,
      'one-year': 84,
      'two-year': 91,
      'bachelors': 112,
      'two-or-more': 119,
      'masters': 126,
      'doctoral': 140
    },
    withoutSpouse: {
      'less-than-secondary': 0,
      'secondary': 30,
      'one-year': 90,
      'two-year': 98,
      'bachelors': 120,
      'two-or-more': 128,
      'masters': 135,
      'doctoral': 150
    }
  };

  const category = hasSpouse ? 'withSpouse' : 'withoutSpouse';
  return educationPoints[category][educationLevel] || 0;
}

// Language points calculation
export function calculateLanguagePoints(
  firstLanguage: string,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number,
  hasSpouse: boolean
): { firstLanguage: number; secondLanguage: number } {
  // Determine which language is first and second
  const isEnglishFirst = firstLanguage === 'english';
  
  // Get scores for first language
  const firstLangScores = isEnglishFirst 
    ? [englishReading, englishWriting, englishSpeaking, englishListening]
    : [frenchReading, frenchWriting, frenchSpeaking, frenchListening];
  
  // Get scores for second language
  const secondLangScores = isEnglishFirst
    ? [frenchReading, frenchWriting, frenchSpeaking, frenchListening]
    : [englishReading, englishWriting, englishSpeaking, englishListening];

  // Calculate points for first language
  const firstLangPoints = calculateFirstLanguagePoints(firstLangScores, hasSpouse);
  
  // Calculate points for second language
  const secondLangPoints = calculateSecondLanguagePoints(secondLangScores, hasSpouse);

  return {
    firstLanguage: firstLangPoints,
    secondLanguage: secondLangPoints
  };
}

function calculateFirstLanguagePoints(scores: number[], hasSpouse: boolean): number {
  const pointsPerAbility = {
    withSpouse: {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 6, 5: 6,
      6: 8, 7: 16, 8: 22, 9: 29, 10: 32, 11: 32, 12: 32
    },
    withoutSpouse: {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 6, 5: 6,
      6: 9, 7: 17, 8: 23, 9: 31, 10: 34, 11: 34, 12: 34
    }
  };

  const category = hasSpouse ? 'withSpouse' : 'withoutSpouse';
  
  let totalPoints = 0;
  for (const score of scores) {
    totalPoints += pointsPerAbility[category][score] || 0;
  }
  
  return totalPoints;
}

function calculateSecondLanguagePoints(scores: number[], hasSpouse: boolean): number {
  const pointsPerAbility = {
    withSpouse: {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
      5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6, 11: 6, 12: 6
    },
    withoutSpouse: {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
      5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6, 11: 6, 12: 6
    }
  };

  const category = hasSpouse ? 'withSpouse' : 'withoutSpouse';
  
  let totalPoints = 0;
  for (const score of scores) {
    totalPoints += pointsPerAbility[category][score] || 0;
  }
  
  // Cap at maximum points
  const maxPoints = hasSpouse ? 22 : 24;
  return Math.min(totalPoints, maxPoints);
}

// Canadian work experience points calculation
export function calculateCanadianWorkExperiencePoints(years: number, hasSpouse: boolean): number {
  const workExpPoints = {
    withSpouse: {
      0: 0, 1: 35, 2: 46, 3: 56, 4: 63, 5: 70
    },
    withoutSpouse: {
      0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80
    }
  };

  const category = hasSpouse ? 'withSpouse' : 'withoutSpouse';
  // If more than 5 years, cap at 5 years
  const cappedYears = Math.min(years, 5);
  return workExpPoints[category][cappedYears] || 0;
}

// Calculate core human capital factors
export function calculateCoreHumanCapitalFactors(profile: UserProfile): CRSScoreBreakdown['coreHumanCapital'] {
  const hasSpouse = profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law';
  const spouseComingToCanada = hasSpouse && profile.spouseComingToCanada;
  
  // For CRS calculation, we consider "has spouse" only if spouse is coming to Canada
  const hasSpouseForCRS = spouseComingToCanada;
  
  const agePoints = calculateAgePoints(profile.age, hasSpouseForCRS);
  const educationPoints = calculateEducationPoints(profile.educationLevel, hasSpouseForCRS);
  
  const languagePoints = calculateLanguagePoints(
    profile.firstLanguage,
    profile.englishReading,
    profile.englishWriting,
    profile.englishSpeaking,
    profile.englishListening,
    profile.frenchReading,
    profile.frenchWriting,
    profile.frenchSpeaking,
    profile.frenchListening,
    hasSpouseForCRS
  );
  
  const canadianWorkExperiencePoints = calculateCanadianWorkExperiencePoints(
    profile.canadianWorkExperience,
    hasSpouseForCRS
  );
  
  const subtotal = agePoints + educationPoints + languagePoints.firstLanguage + 
                  languagePoints.secondLanguage + canadianWorkExperiencePoints;
  
  return {
    age: agePoints,
    education: educationPoints,
    firstLanguage: languagePoints.firstLanguage,
    secondLanguage: languagePoints.secondLanguage,
    canadianWorkExperience: canadianWorkExperiencePoints,
    subtotal: subtotal
  };
}
