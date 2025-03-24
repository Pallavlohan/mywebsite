import { DetailedCrsScoreBreakdown } from './types';

// Implements the Comprehensive Ranking System (CRS) criteria
// Based on official Government of Canada guidelines

/**
 * Calculate CRS points for age based on marital status
 * @param age Applicant's age
 * @param hasSpouse Whether applicant has a spouse
 * @returns Points awarded for age
 */
export function calculateAgePoints(age: number, hasSpouse: boolean): number {
  if (age < 18 || age > 45) return 0;
  
  // With spouse
  if (hasSpouse) {
    if (age <= 35) return 100;
    else if (age === 36) return 95;
    else if (age === 37) return 90;
    else if (age === 38) return 85;
    else if (age === 39) return 80;
    else if (age === 40) return 75;
    else if (age === 41) return 70;
    else if (age === 42) return 65;
    else if (age === 43) return 60;
    else if (age === 44) return 55;
    else return 50;
  }
  
  // Without spouse
  else {
    if (age <= 35) return 110;
    else if (age === 36) return 105;
    else if (age === 37) return 100;
    else if (age === 38) return 95;
    else if (age === 39) return 90;
    else if (age === 40) return 85;
    else if (age === 41) return 80;
    else if (age === 42) return 75;
    else if (age === 43) return 70;
    else if (age === 44) return 65;
    else return 60;
  }
}

/**
 * Calculate CRS points for education level based on marital status
 * @param educationLevel Education level code
 * @param hasSpouse Whether applicant has a spouse
 * @returns Points awarded for education
 */
export function calculateEducationPoints(educationLevel: string, hasSpouse: boolean): number {
  const points = {
    less_than_secondary: 0,
    secondary: hasSpouse ? 28 : 30,
    one_year_post_secondary: hasSpouse ? 84 : 90,
    two_year_post_secondary: hasSpouse ? 91 : 98,
    bachelors: hasSpouse ? 112 : 120,
    two_or_more_post_secondary: hasSpouse ? 119 : 128,
    masters: hasSpouse ? 126 : 135,
    doctoral: hasSpouse ? 140 : 150
  };
  
  return points[educationLevel as keyof typeof points] || 0;
}

/**
 * Calculate CRS points for language proficiency
 * @param clbLevel CLB level for the language (1-12)
 * @param isFirstLanguage Whether it's the first official language
 * @param hasSpouse Whether applicant has a spouse
 * @returns Points awarded for language proficiency
 */
export function calculateLanguagePoints(clbLevel: number, isFirstLanguage: boolean, hasSpouse: boolean): number {
  if (clbLevel < 1 || clbLevel > 12) return 0;
  
  // First official language
  if (isFirstLanguage) {
    if (hasSpouse) {
      if (clbLevel < 4) return 0;
      else if (clbLevel === 4) return 6;
      else if (clbLevel === 5) return 6;
      else if (clbLevel === 6) return 8;
      else if (clbLevel === 7) return 16;
      else if (clbLevel === 8) return 22;
      else if (clbLevel === 9) return 29;
      else return 32; // CLB 10 or higher
    } else {
      if (clbLevel < 4) return 0;
      else if (clbLevel === 4) return 6;
      else if (clbLevel === 5) return 6;
      else if (clbLevel === 6) return 9;
      else if (clbLevel === 7) return 17;
      else if (clbLevel === 8) return 23;
      else if (clbLevel === 9) return 31;
      else return 34; // CLB 10 or higher
    }
  }
  
  // Second official language
  else {
    if (clbLevel < 4) return 0;
    else if (clbLevel === 4) return 1;
    else if (clbLevel === 5) return 1;
    else if (clbLevel === 6) return 1;
    else if (clbLevel === 7) return 3;
    else if (clbLevel === 8) return 3;
    else return 6; // CLB 9 or higher
  }
}

/**
 * Calculate CRS points for Canadian work experience
 * @param years Years of Canadian work experience
 * @param hasSpouse Whether applicant has a spouse
 * @returns Points awarded for Canadian work experience
 */
export function calculateCanadianWorkExperiencePoints(years: number, hasSpouse: boolean): number {
  if (years < 1) return 0;
  
  if (hasSpouse) {
    if (years === 1) return 35;
    else if (years === 2) return 46;
    else if (years === 3) return 56;
    else if (years === 4) return 63;
    else return 70; // 5 or more years
  } else {
    if (years === 1) return 40;
    else if (years === 2) return 53;
    else if (years === 3) return 64;
    else if (years === 4) return 72;
    else return 80; // 5 or more years
  }
}

/**
 * Calculate CRS points for spouse's factors
 * @param spouseEducation Spouse's education level code
 * @param spouseLanguageCLB Spouse's language CLB level
 * @param spouseCanadianWorkExperience Spouse's Canadian work experience in years
 * @returns Points awarded for spouse factors
 */
export function calculateSpouseFactorsPoints(
  spouseEducation: string,
  spouseLanguageCLB: number,
  spouseCanadianWorkExperience: number
): number {
  let points = 0;
  
  // Education points
  const educationPoints = {
    less_than_secondary: 0,
    secondary: 2,
    one_year_post_secondary: 6,
    two_year_post_secondary: 7,
    bachelors: 8,
    two_or_more_post_secondary: 9,
    masters: 10,
    doctoral: 10
  };
  
  points += educationPoints[spouseEducation as keyof typeof educationPoints] || 0;
  
  // Language points
  if (spouseLanguageCLB < 4) points += 0;
  else if (spouseLanguageCLB === 4 || spouseLanguageCLB === 5) points += 5;
  else if (spouseLanguageCLB === 6 || spouseLanguageCLB === 7) points += 10;
  else if (spouseLanguageCLB >= 8) points += 20;
  
  // Canadian work experience points
  if (spouseCanadianWorkExperience < 1) points += 0;
  else if (spouseCanadianWorkExperience === 1) points += 5;
  else if (spouseCanadianWorkExperience === 2) points += 7;
  else if (spouseCanadianWorkExperience === 3) points += 8;
  else if (spouseCanadianWorkExperience === 4) points += 9;
  else points += 10; // 5 or more years
  
  return points;
}

/**
 * Calculate skill transferability points for education and language
 * @param educationLevel Education level code
 * @param clbLevel Language CLB level
 * @returns Points awarded for education + language combination
 */
export function calculateEducationLanguagePoints(educationLevel: string, clbLevel: number): number {
  if (clbLevel < 7) return 0;
  
  const highEducation = [
    'bachelors', 
    'two_or_more_post_secondary', 
    'masters', 
    'doctoral'
  ];
  
  if (highEducation.includes(educationLevel)) {
    return (clbLevel >= 9) ? 50 : 25;
  }
  
  return (clbLevel >= 9) ? 25 : 13;
}

/**
 * Calculate skill transferability points for education and Canadian work experience
 * @param educationLevel Education level code
 * @param canadianWorkExperience Years of Canadian work experience
 * @returns Points awarded for education + Canadian work experience combination
 */
export function calculateEducationCanadianWorkPoints(educationLevel: string, canadianWorkExperience: number): number {
  if (canadianWorkExperience < 1) return 0;
  
  const highEducation = [
    'bachelors', 
    'two_or_more_post_secondary', 
    'masters', 
    'doctoral'
  ];
  
  if (highEducation.includes(educationLevel)) {
    return (canadianWorkExperience >= 2) ? 50 : 25;
  }
  
  return (canadianWorkExperience >= 2) ? 25 : 13;
}

/**
 * Calculate skill transferability points for foreign work experience and language
 * @param foreignWorkExperience Years of foreign work experience
 * @param clbLevel Language CLB level
 * @returns Points awarded for foreign work experience + language combination
 */
export function calculateForeignWorkLanguagePoints(foreignWorkExperience: number, clbLevel: number): number {
  if (foreignWorkExperience < 1 || clbLevel < 7) return 0;
  
  if (foreignWorkExperience >= 3) {
    return (clbLevel >= 9) ? 50 : 25;
  }
  
  return (clbLevel >= 9) ? 25 : 13;
}

/**
 * Calculate skill transferability points for foreign work experience and Canadian work experience
 * @param foreignWorkExperience Years of foreign work experience
 * @param canadianWorkExperience Years of Canadian work experience
 * @returns Points awarded for foreign work + Canadian work combination
 */
export function calculateForeignCanadianWorkPoints(foreignWorkExperience: number, canadianWorkExperience: number): number {
  if (foreignWorkExperience < 1 || canadianWorkExperience < 1) return 0;
  
  if (foreignWorkExperience >= 3) {
    return (canadianWorkExperience >= 2) ? 50 : 25;
  }
  
  return (canadianWorkExperience >= 2) ? 25 : 13;
}

/**
 * Calculate additional points
 * @param hasProvincialNomination Whether applicant has provincial nomination
 * @param hasValidJobOffer Whether applicant has valid job offer
 * @param jobOfferNocCode NOC code for job offer
 * @param hasSiblingInCanada Whether applicant has sibling in Canada
 * @param hasFrenchProficiency Whether applicant has French language proficiency
 * @param hasCanadianEducation Whether applicant has Canadian education
 * @returns Points awarded for additional factors
 */
export function calculateAdditionalPoints(
  hasProvincialNomination: boolean,
  hasValidJobOffer: boolean,
  jobOfferNocCode: string,
  hasSiblingInCanada: boolean,
  hasFrenchProficiency: boolean,
  hasCanadianEducation: boolean
): number {
  let points = 0;
  
  // Provincial nomination: 600 points
  if (hasProvincialNomination) points += 600;
  
  // Job offer: up to 200 points
  if (hasValidJobOffer) {
    // Job offer points depend on NOC code
    // For senior management positions (NOC 00)
    if (jobOfferNocCode.startsWith('00')) {
      points += 200;
    }
    // For other skilled jobs
    else {
      points += 50;
    }
  }
  
  // Sibling in Canada: 15 points
  if (hasSiblingInCanada) points += 15;
  
  // French language ability: up to 30 points
  if (hasFrenchProficiency) points += 30;
  
  // Canadian education: up to 30 points
  if (hasCanadianEducation) points += 30;
  
  return points;
}

/**
 * Calculate comprehensive CRS score
 * @param profileData Complete profile data
 * @returns Detailed CRS score breakdown
 */
export function calculateComprehensiveCrsScore(profileData: any): DetailedCrsScoreBreakdown {
  // Initialize breakdown structures
  const core: any = {
    age: 0,
    education: 0,
    firstOfficialLanguage: 0,
    secondOfficialLanguage: 0,
    canadianWorkExperience: 0,
    total: 0
  };
  
  const spouse: any = {
    education: 0,
    firstOfficialLanguage: 0,
    canadianWorkExperience: 0,
    total: 0
  };
  
  const skillTransferability: any = {
    educationLanguage: 0,
    educationCanadianExperience: 0,
    foreignWorkLanguage: 0,
    foreignWorkCanadianExperience: 0,
    certificateOfQualification: 0,
    total: 0
  };
  
  const additional: any = {
    provincialNomination: 0,
    jobOffer: 0,
    canadianEducation: 0,
    frenchLanguageAbility: 0,
    sibling: 0,
    total: 0
  };

  // Calculate core points
  const age = profileData.age || 0;
  const hasSpouse = profileData.hasSpouse || false;
  
  // Age points
  core.age = calculateAgePoints(age, hasSpouse);
  
  // Education points
  core.education = calculateEducationPoints(profileData.educationLevel, hasSpouse);
  
  // First official language points
  const firstLanguageCLB = profileData.primaryLanguageCLB || 0;
  core.firstOfficialLanguage = calculateLanguagePoints(firstLanguageCLB, true, hasSpouse);
  
  // Second official language points
  const secondLanguageCLB = profileData.secondaryLanguageCLB || 0;
  core.secondOfficialLanguage = calculateLanguagePoints(secondLanguageCLB, false, hasSpouse);
  
  // Canadian work experience points
  const canadianWorkYears = profileData.canadianWorkExperienceYears || 0;
  core.canadianWorkExperience = calculateCanadianWorkExperiencePoints(canadianWorkYears, hasSpouse);
  
  // Calculate spouse factors (if applicable)
  if (hasSpouse) {
    // Spouse's education
    spouse.education = calculateSpouseFactorsPoints(
      profileData.spouseEducationLevel || 'less_than_secondary',
      profileData.spouseLanguageCLB || 0,
      profileData.spouseCanadianWorkExperience || 0
    );
    
    // Spouse total
    spouse.total = spouse.education + spouse.firstOfficialLanguage + spouse.canadianWorkExperience;
  }
  
  // Calculate skill transferability
  // Education and language
  skillTransferability.educationLanguage = calculateEducationLanguagePoints(
    profileData.educationLevel,
    firstLanguageCLB
  );
  
  // Education and Canadian work experience
  skillTransferability.educationCanadianExperience = calculateEducationCanadianWorkPoints(
    profileData.educationLevel,
    canadianWorkYears
  );
  
  // Foreign work experience and language
  const foreignWorkYears = profileData.foreignWorkExperienceYears || 0;
  skillTransferability.foreignWorkLanguage = calculateForeignWorkLanguagePoints(
    foreignWorkYears,
    firstLanguageCLB
  );
  
  // Foreign and Canadian work experience
  skillTransferability.foreignWorkCanadianExperience = calculateForeignCanadianWorkPoints(
    foreignWorkYears,
    canadianWorkYears
  );
  
  // Cap skill transferability at 100 points
  skillTransferability.total = Math.min(100, 
    skillTransferability.educationLanguage + 
    skillTransferability.educationCanadianExperience + 
    skillTransferability.foreignWorkLanguage + 
    skillTransferability.foreignWorkCanadianExperience + 
    skillTransferability.certificateOfQualification
  );
  
  // Calculate additional points
  const hasFrenchProficiency = 
    profileData.primaryLanguage === 'French' || 
    profileData.secondaryLanguage === 'French';
  
  additional.provincialNomination = profileData.hasProvincialNomination ? 600 : 0;
  
  if (profileData.hasValidJobOffer) {
    if (profileData.jobOfferNocCode?.startsWith('00')) {
      additional.jobOffer = 200;
    } else {
      additional.jobOffer = 50;
    }
  }
  
  additional.canadianEducation = profileData.hasCanadianEducation ? 30 : 0;
  additional.frenchLanguageAbility = hasFrenchProficiency ? 30 : 0;
  additional.sibling = profileData.hasSiblingInCanada ? 15 : 0;
  
  additional.total = 
    additional.provincialNomination + 
    additional.jobOffer + 
    additional.canadianEducation + 
    additional.frenchLanguageAbility + 
    additional.sibling;
  
  // Calculate totals
  core.total = core.age + core.education + core.firstOfficialLanguage + 
    core.secondOfficialLanguage + core.canadianWorkExperience;
  
  const totalScore = core.total + spouse.total + skillTransferability.total + additional.total;
  
  return {
    core,
    spouse,
    skillTransferability,
    additional,
    totalScore
  };
}
