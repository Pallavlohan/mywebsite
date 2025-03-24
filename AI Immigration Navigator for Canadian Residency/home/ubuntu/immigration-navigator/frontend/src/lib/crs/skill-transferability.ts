// Skill transferability factors calculation

import { UserProfile, CRSScoreBreakdown } from './types';

// Helper function to determine if language proficiency is "good"
function hasGoodLanguageProficiency(
  firstLanguage: string,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number
): boolean {
  // CLB 7 or higher is considered "good"
  const threshold = 7;
  
  // Check if first language meets threshold
  const isEnglishFirst = firstLanguage === 'english';
  
  const firstLangScores = isEnglishFirst 
    ? [englishReading, englishWriting, englishSpeaking, englishListening]
    : [frenchReading, frenchWriting, frenchSpeaking, frenchListening];
  
  // All abilities must be at CLB 7 or higher
  return firstLangScores.every(score => score >= threshold);
}

// Helper function to determine if language proficiency is "strong"
function hasStrongLanguageProficiency(
  firstLanguage: string,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number
): boolean {
  // CLB 9 or higher is considered "strong"
  const threshold = 9;
  
  // Check if first language meets threshold
  const isEnglishFirst = firstLanguage === 'english';
  
  const firstLangScores = isEnglishFirst 
    ? [englishReading, englishWriting, englishSpeaking, englishListening]
    : [frenchReading, frenchWriting, frenchSpeaking, frenchListening];
  
  // All abilities must be at CLB 9 or higher
  return firstLangScores.every(score => score >= threshold);
}

// Education with language proficiency points
export function calculateEducationLanguagePoints(
  educationLevel: string,
  firstLanguage: string,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number
): number {
  // Check if education is post-secondary
  const isPostSecondary = ['one-year', 'two-year', 'bachelors', 'two-or-more', 'masters', 'doctoral'].includes(educationLevel);
  
  if (!isPostSecondary) {
    return 0;
  }
  
  // Check language proficiency level
  const hasGoodLanguage = hasGoodLanguageProficiency(
    firstLanguage, englishReading, englishWriting, englishSpeaking, englishListening,
    frenchReading, frenchWriting, frenchSpeaking, frenchListening
  );
  
  const hasStrongLanguage = hasStrongLanguageProficiency(
    firstLanguage, englishReading, englishWriting, englishSpeaking, englishListening,
    frenchReading, frenchWriting, frenchSpeaking, frenchListening
  );
  
  // Determine points based on education level and language proficiency
  if (hasStrongLanguage) {
    if (['bachelors', 'two-or-more', 'masters', 'doctoral'].includes(educationLevel)) {
      return 50;
    } else {
      return 25;
    }
  } else if (hasGoodLanguage) {
    if (['bachelors', 'two-or-more', 'masters', 'doctoral'].includes(educationLevel)) {
      return 25;
    } else {
      return 13;
    }
  }
  
  return 0;
}

// Education with Canadian work experience points
export function calculateEducationCanadianWorkPoints(
  educationLevel: string,
  canadianWorkExperience: number
): number {
  // Check if education is post-secondary
  const isPostSecondary = ['one-year', 'two-year', 'bachelors', 'two-or-more', 'masters', 'doctoral'].includes(educationLevel);
  
  if (!isPostSecondary || canadianWorkExperience === 0) {
    return 0;
  }
  
  // Determine points based on education level and Canadian work experience
  if (canadianWorkExperience >= 2) {
    if (['bachelors', 'two-or-more', 'masters', 'doctoral'].includes(educationLevel)) {
      return 50;
    } else {
      return 25;
    }
  } else if (canadianWorkExperience === 1) {
    if (['bachelors', 'two-or-more', 'masters', 'doctoral'].includes(educationLevel)) {
      return 25;
    } else {
      return 13;
    }
  }
  
  return 0;
}

// Foreign work experience with language proficiency points
export function calculateForeignWorkLanguagePoints(
  foreignWorkExperience: number,
  firstLanguage: string,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number
): number {
  if (foreignWorkExperience === 0) {
    return 0;
  }
  
  // Check language proficiency level
  const hasGoodLanguage = hasGoodLanguageProficiency(
    firstLanguage, englishReading, englishWriting, englishSpeaking, englishListening,
    frenchReading, frenchWriting, frenchSpeaking, frenchListening
  );
  
  const hasStrongLanguage = hasStrongLanguageProficiency(
    firstLanguage, englishReading, englishWriting, englishSpeaking, englishListening,
    frenchReading, frenchWriting, frenchSpeaking, frenchListening
  );
  
  // Determine points based on foreign work experience and language proficiency
  if (hasStrongLanguage) {
    if (foreignWorkExperience >= 3) {
      return 50;
    } else if (foreignWorkExperience >= 1) {
      return 25;
    }
  } else if (hasGoodLanguage) {
    if (foreignWorkExperience >= 3) {
      return 25;
    } else if (foreignWorkExperience >= 1) {
      return 13;
    }
  }
  
  return 0;
}

// Foreign work experience with Canadian work experience points
export function calculateForeignCanadianWorkPoints(
  foreignWorkExperience: number,
  canadianWorkExperience: number
): number {
  if (foreignWorkExperience === 0 || canadianWorkExperience === 0) {
    return 0;
  }
  
  // Determine points based on foreign and Canadian work experience
  if (canadianWorkExperience >= 2) {
    if (foreignWorkExperience >= 3) {
      return 50;
    } else if (foreignWorkExperience >= 1) {
      return 25;
    }
  } else if (canadianWorkExperience === 1) {
    if (foreignWorkExperience >= 3) {
      return 25;
    } else if (foreignWorkExperience >= 1) {
      return 13;
    }
  }
  
  return 0;
}

// Certificate of qualification points
export function calculateCertificatePoints(
  hasCertificate: boolean,
  firstLanguage: string,
  englishReading: number,
  englishWriting: number,
  englishSpeaking: number,
  englishListening: number,
  frenchReading: number,
  frenchWriting: number,
  frenchSpeaking: number,
  frenchListening: number
): number {
  if (!hasCertificate) {
    return 0;
  }
  
  // Check language proficiency level
  const hasGoodLanguage = hasGoodLanguageProficiency(
    firstLanguage, englishReading, englishWriting, englishSpeaking, englishListening,
    frenchReading, frenchWriting, frenchSpeaking, frenchListening
  );
  
  const hasStrongLanguage = hasStrongLanguageProficiency(
    firstLanguage, englishReading, englishWriting, englishSpeaking, englishListening,
    frenchReading, frenchWriting, frenchSpeaking, frenchListening
  );
  
  // Determine points based on certificate and language proficiency
  if (hasStrongLanguage) {
    return 50;
  } else if (hasGoodLanguage) {
    return 25;
  }
  
  return 0;
}

// Calculate skill transferability factors
export function calculateSkillTransferabilityFactors(profile: UserProfile): CRSScoreBreakdown['skillTransferability'] {
  // Education with language
  const educationLanguagePoints = calculateEducationLanguagePoints(
    profile.educationLevel,
    profile.firstLanguage,
    profile.englishReading,
    profile.englishWriting,
    profile.englishSpeaking,
    profile.englishListening,
    profile.frenchReading,
    profile.frenchWriting,
    profile.frenchSpeaking,
    profile.frenchListening
  );
  
  // Education with Canadian work experience
  const educationCanadianWorkPoints = calculateEducationCanadianWorkPoints(
    profile.educationLevel,
    profile.canadianWorkExperience
  );
  
  // Foreign work experience with language
  const foreignWorkLanguagePoints = calculateForeignWorkLanguagePoints(
    profile.foreignWorkExperience,
    profile.firstLanguage,
    profile.englishReading,
    profile.englishWriting,
    profile.englishSpeaking,
    profile.englishListening,
    profile.frenchReading,
    profile.frenchWriting,
    profile.frenchSpeaking,
    profile.frenchListening
  );
  
  // Foreign work experience with Canadian work experience
  const foreignCanadianWorkPoints = calculateForeignCanadianWorkPoints(
    profile.foreignWorkExperience,
    profile.canadianWorkExperience
  );
  
  // Certificate of qualification (assuming this is not directly captured in the form)
  // For now, we'll assume no certificate
  const certificatePoints = 0;
  
  // Calculate subtotal (maximum 100 points)
  // Note: The maximum for education combinations is 50
  // The maximum for foreign work experience combinations is 50
  // The maximum for certificate of qualification is 50
  const educationSubtotal = Math.min(50, educationLanguagePoints + educationCanadianWorkPoints);
  const foreignWorkSubtotal = Math.min(50, foreignWorkLanguagePoints + foreignCanadianWorkPoints);
  
  const subtotal = Math.min(100, educationSubtotal + foreignWorkSubtotal + certificatePoints);
  
  return {
    education: {
      withLanguage: educationLanguagePoints,
      withCanadianWorkExperience: educationCanadianWorkPoints
    },
    foreignWorkExperience: {
      withLanguage: foreignWorkLanguagePoints,
      withCanadianWorkExperience: foreignCanadianWorkPoints
    },
    certificateOfQualification: certificatePoints,
    subtotal: subtotal
  };
}
