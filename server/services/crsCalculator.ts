import { calculateComprehensiveCrsScore } from "@shared/crs";
import { DetailedCrsScoreBreakdown } from "@shared/types";
import { getCurrentCrsCutoff } from "../lib/canadaData";

/**
 * Converts language test scores to Canadian Language Benchmark (CLB) levels
 * @param test Language test type (IELTS, CELPIP, etc.)
 * @param scores Test scores for each ability
 * @returns CLB levels for each ability
 */
function convertToCLB(test: string, scores: any): { 
  listening: number, 
  speaking: number, 
  reading: number, 
  writing: number,
  overall: number  // Average CLB level
} {
  // Implementation would map test scores to CLB levels
  // This is a simplified version
  
  let clb = {
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
    overall: 0
  };
  
  // Actual implementation would use lookup tables from IELTS/CELPIP/TEF scores to CLB
  // For now, we'll assume the scores are directly provided as CLB levels
  clb.listening = scores.listening || 0;
  clb.speaking = scores.speaking || 0;
  clb.reading = scores.reading || 0;
  clb.writing = scores.writing || 0;
  
  // Calculate average CLB level
  clb.overall = Math.floor((clb.listening + clb.speaking + clb.reading + clb.writing) / 4);
  
  return clb;
}

/**
 * Calculates age from birthdate
 * @param birthdate Date of birth
 * @returns Age in years
 */
function calculateAge(birthdate: string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  
  console.log(`Calculating age from birthdate: ${birthdate}`);
  console.log(`Current date: ${today.toISOString()}`);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  console.log(`Calculated age: ${age} years`);
  return age;
}

/**
 * Prepares profile data for CRS calculation
 * @param profileData Raw profile data from the frontend
 * @returns Processed profile data for CRS calculation
 */
function prepareProfileData(profileData: any): any {
  console.log("Preparing profile data for CRS calculation");
  
  // Calculate age from birthdate
  const age = calculateAge(profileData.birthdate);
  
  // Convert language test scores to CLB levels
  let primaryLanguageCLB = null;
  if (profileData.primaryLanguageTest && profileData.primaryLanguageListening) {
    console.log(`Processing primary language: ${profileData.primaryLanguage}, test: ${profileData.primaryLanguageTest}`);
    primaryLanguageCLB = convertToCLB(
      profileData.primaryLanguageTest,
      {
        listening: profileData.primaryLanguageListening,
        speaking: profileData.primaryLanguageSpeaking,
        reading: profileData.primaryLanguageReading,
        writing: profileData.primaryLanguageWriting
      }
    ).overall;
    console.log(`Primary language CLB: ${primaryLanguageCLB}`);
  } else {
    console.log("No primary language test scores provided");
  }
  
  let secondaryLanguageCLB = null;
  if (profileData.hasSecondaryLanguage && 
      profileData.secondaryLanguageTest && 
      profileData.secondaryLanguageListening) {
    console.log(`Processing secondary language: ${profileData.secondaryLanguage}, test: ${profileData.secondaryLanguageTest}`);
    secondaryLanguageCLB = convertToCLB(
      profileData.secondaryLanguageTest,
      {
        listening: profileData.secondaryLanguageListening,
        speaking: profileData.secondaryLanguageSpeaking,
        reading: profileData.secondaryLanguageReading,
        writing: profileData.secondaryLanguageWriting
      }
    ).overall;
    console.log(`Secondary language CLB: ${secondaryLanguageCLB}`);
  }
  
  // Process spouse data if applicable
  let spouseEducationLevel = null;
  let spouseLanguageCLB = null;
  let spouseCanadianWorkExperience = 0;
  
  if (profileData.hasSpouse) {
    console.log("Processing spouse data");
    // These would be populated in a real application
    spouseEducationLevel = profileData.spouseEducationLevel || 'less_than_secondary';
    spouseLanguageCLB = profileData.spouseLanguageCLB || 0;
    spouseCanadianWorkExperience = profileData.spouseCanadianWorkExperience || 0;
  }
  
  // Log education level
  console.log(`Education level: ${profileData.educationLevel}`);
  
  // Log work experience
  if (profileData.hasCanadianWorkExperience) {
    console.log(`Canadian work experience: ${profileData.canadianWorkExperienceYears} years`);
  }
  
  if (profileData.hasForeignWorkExperience) {
    console.log(`Foreign work experience: ${profileData.foreignWorkExperienceYears} years`);
  }
  
  // Return processed data
  const processedData = {
    ...profileData,
    age,
    primaryLanguageCLB,
    secondaryLanguageCLB,
    spouseEducationLevel,
    spouseLanguageCLB,
    spouseCanadianWorkExperience
  };
  
  console.log("Profile data prepared successfully");
  return processedData;
}

/**
 * Calculates comprehensive CRS score based on profile data
 * @param profileData Profile data from the frontend
 * @returns Detailed CRS score breakdown
 */
export async function calculateCrsScore(profileData: any): Promise<DetailedCrsScoreBreakdown> {
  // Prepare data for calculation
  const processedData = prepareProfileData(profileData);
  
  // Calculate CRS score
  const crsScore = calculateComprehensiveCrsScore(processedData);
  
  return crsScore;
}
