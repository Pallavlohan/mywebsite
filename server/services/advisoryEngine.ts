import { Recommendation, ProvincialProgram, DetailedCrsScoreBreakdown } from "@shared/types";
import { getNocJobInformation } from "../lib/canadaData";

/**
 * Generates personalized recommendations based on profile and CRS score
 * @param profileData User profile data
 * @param crsScore Calculated CRS score breakdown
 * @param currentCutoff Current CRS cutoff for Express Entry
 * @returns Array of recommendations
 */
export async function getRecommendations(
  profileData: any, 
  crsScore: DetailedCrsScoreBreakdown,
  currentCutoff: number
): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];
  const pointsNeeded = Math.max(0, currentCutoff - crsScore.totalScore);
  
  // Recommendation 1: Improve language scores if below CLB 9
  if (profileData.primaryLanguageCLB < 9) {
    const potentialPoints = 24; // Example value, actual calculation would be more complex
    
    recommendations.push({
      title: "Improve Language Scores",
      description: `Retaking your ${profileData.primaryLanguageTest} test could increase your score by up to ${potentialPoints} points if you achieve CLB 9 in all abilities.`,
      potentialPoints,
      actionItems: [
        "Prepare for language test with online practice exams",
        "Consider language courses to improve skills",
        "Schedule a new test date within the next 3 months"
      ],
      priority: potentialPoints >= pointsNeeded ? 'high' : 'medium'
    });
  }
  
  // Recommendation 2: Pursue provincial nomination if score is below cutoff
  if (crsScore.totalScore < currentCutoff) {
    recommendations.push({
      title: "Consider Provincial Nomination",
      description: "Your profile may qualify for provincial nomination programs which could add 600 points to your CRS score.",
      potentialPoints: 600,
      actionItems: [
        "Research provincial programs aligned with your NOC code",
        "Prepare documentation for provincial application",
        "Review specific requirements for each province"
      ],
      priority: 'high'
    });
  }
  
  // Recommendation 3: Add French language if not present
  if (!profileData.hasSecondaryLanguage || 
      (profileData.hasSecondaryLanguage && profileData.secondaryLanguage !== 'French')) {
    recommendations.push({
      title: "Add French Language",
      description: "Demonstrating French language ability at CLB 7 could earn you an additional 50 points.",
      potentialPoints: 50,
      actionItems: [
        "Begin French language courses",
        "Prepare for TEF or TCF examination",
        "Aim for at least CLB 7 in all abilities"
      ],
      priority: 50 >= pointsNeeded ? 'high' : 'medium'
    });
  }
  
  // Recommendation 4: Additional education if applicable
  if (profileData.educationLevel !== 'masters' && profileData.educationLevel !== 'doctoral') {
    recommendations.push({
      title: "Pursue Higher Education",
      description: "Completing a Master's degree could add up to 25 additional points to your score.",
      potentialPoints: 25,
      actionItems: [
        "Research Canadian post-secondary institutions",
        "Explore programs related to your field",
        "Apply for further education in Canada"
      ],
      priority: 25 >= pointsNeeded ? 'high' : 'low'
    });
  }
  
  // Recommendation 5: Gain more Canadian work experience if applicable
  if (profileData.canadianWorkExperienceYears < 3) {
    const additionalYearsNeeded = 3 - (profileData.canadianWorkExperienceYears || 0);
    const potentialPoints = 35; // Simplified value
    
    recommendations.push({
      title: "Gain More Canadian Work Experience",
      description: `${additionalYearsNeeded} more ${additionalYearsNeeded === 1 ? 'year' : 'years'} of Canadian work experience could add up to ${potentialPoints} points to your score.`,
      potentialPoints,
      actionItems: [
        "Apply for work permits or extensions",
        "Seek employment in your NOC category",
        "Document all work experience carefully"
      ],
      priority: potentialPoints >= pointsNeeded ? 'high' : 'medium'
    });
  }
  
  return recommendations;
}

/**
 * Gets eligible provincial programs based on profile and CRS score
 * @param profileData User profile data
 * @param crsScore Calculated CRS score
 * @returns Array of eligible provincial programs
 */
export async function getProvincialPrograms(
  profileData: any,
  crsScore: any
): Promise<ProvincialProgram[]> {
  const provincialPrograms: ProvincialProgram[] = [];
  const totalScore = crsScore.totalScore || 0;
  
  // Get NOC information if available
  let nocCodes: string[] = [];
  
  if (profileData.canadianNocCodes && profileData.canadianNocCodes.length) {
    nocCodes = [...profileData.canadianNocCodes];
  } else if (profileData.foreignNocCodes && profileData.foreignNocCodes.length) {
    nocCodes = [...profileData.foreignNocCodes];
  } else if (profileData.nocCodes) {
    nocCodes = Array.isArray(profileData.nocCodes) ? 
      profileData.nocCodes : [profileData.nocCodes];
  }
  
  // Alberta Express Entry Stream
  provincialPrograms.push({
    province: "Alberta",
    programName: "Alberta Express Entry Stream",
    requirements: [
      "CRS score of 300+",
      "Work experience in eligible occupation",
      "Express Entry profile"
    ],
    eligibility: totalScore >= 300 ? 'likely_eligible' : 'not_eligible',
    processingTime: "3-6 months",
    description: "The Alberta Express Entry Stream allows Alberta to nominate candidates from the federal Express Entry pool who have strong ties to Alberta or who can support the province's economic development and diversification priorities."
  });
  
  // Ontario Human Capital Priorities Stream
  provincialPrograms.push({
    province: "Ontario",
    programName: "Human Capital Priorities Stream",
    requirements: [
      "CRS score of 400+",
      "Work experience",
      "Education",
      "Language proficiency"
    ],
    eligibility: totalScore >= 400 ? 'likely_eligible' : 'not_eligible',
    processingTime: "6-9 months",
    description: "The Human Capital Priorities Stream allows Ontario to search the federal Express Entry pool for candidates who meet the province's specific labor market needs."
  });
  
  // Saskatchewan Express Entry Category
  provincialPrograms.push({
    province: "Saskatchewan",
    programName: "International Skilled Worker: Express Entry",
    requirements: [
      "Express Entry profile",
      "Skilled work experience",
      "CLB 7 language"
    ],
    eligibility: (profileData.primaryLanguageCLB >= 7) ? 'likely_eligible' : 'not_eligible',
    processingTime: "4-6 months",
    description: "The Saskatchewan Express Entry category is aligned with the federal Express Entry system and is designed for skilled workers who want to live and work in Saskatchewan."
  });
  
  // Add more provincial programs here
  
  return provincialPrograms;
}
