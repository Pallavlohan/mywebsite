// Main CRS calculator

import { UserProfile, CRSScoreBreakdown, CRSResult, ExpressEntryDraw, ImmigrationPathway, ImprovementSuggestion } from './types';
import { calculateCoreHumanCapitalFactors } from './core-factors';
import { calculateSpouseFactors } from './spouse-factors';
import { calculateSkillTransferabilityFactors } from './skill-transferability';
import { calculateAdditionalPoints } from './additional-points';

// Recent Express Entry draws data
// This would ideally be fetched from an API or database
const recentDraws: ExpressEntryDraw[] = [
  { date: "March 21, 2025", type: "French language proficiency", score: 379, invitations: 7500 },
  { date: "March 14, 2025", type: "Provincial Nominee Program", score: 736, invitations: 536 },
  { date: "March 7, 2025", type: "General", score: 485, invitations: 5000 },
  { date: "February 28, 2025", type: "Healthcare occupations", score: 431, invitations: 3500 },
  { date: "February 21, 2025", type: "STEM occupations", score: 462, invitations: 3000 },
];

// Calculate the complete CRS score
export function calculateCRSScore(profile: UserProfile): CRSScoreBreakdown {
  // Calculate core human capital factors
  const coreFactors = calculateCoreHumanCapitalFactors(profile);
  
  // Calculate spouse factors
  const spouseFactors = calculateSpouseFactors(profile);
  
  // Calculate skill transferability factors
  const skillTransferability = calculateSkillTransferabilityFactors(profile);
  
  // Calculate additional points
  const additionalPoints = calculateAdditionalPoints(profile);
  
  // Calculate total score
  const total = coreFactors.subtotal + spouseFactors.subtotal + 
                skillTransferability.subtotal + additionalPoints.subtotal;
  
  return {
    coreHumanCapital: coreFactors,
    spouseFactors: spouseFactors,
    skillTransferability: skillTransferability,
    additionalPoints: additionalPoints,
    total: total
  };
}

// Generate recommended immigration pathways
function generateRecommendedPathways(score: number, profile: UserProfile): ImmigrationPathway[] {
  const pathways: ImmigrationPathway[] = [];
  
  // Federal Skilled Worker Program
  const fswEligible = 
    profile.educationLevel !== 'less-than-secondary' && // Has at least secondary education
    profile.englishReading >= 7 && profile.englishWriting >= 7 && 
    profile.englishSpeaking >= 7 && profile.englishListening >= 7; // CLB 7 in all English abilities
  
  pathways.push({
    name: "Express Entry - Federal Skilled Worker",
    eligibility: fswEligible ? "Eligible" : "Not Eligible",
    score: fswEligible ? score : "N/A",
    description: fswEligible 
      ? "You meet all the minimum requirements for the Federal Skilled Worker program."
      : "You need at least secondary education and CLB 7 in all English language abilities.",
    nextSteps: fswEligible
      ? [
          "Create an Express Entry profile",
          "Wait for an invitation to apply",
          "Submit a complete application within 60 days of invitation",
        ]
      : [
          "Improve your English language scores to reach CLB 7 in all abilities",
          "Ensure you have at least secondary education",
        ]
  });
  
  // Canadian Experience Class
  const cecEligible = profile.canadianWorkExperience >= 1;
  
  pathways.push({
    name: "Express Entry - Canadian Experience Class",
    eligibility: cecEligible ? "Eligible" : "Not Eligible",
    score: cecEligible ? score : "N/A",
    description: cecEligible
      ? "You meet the Canadian work experience requirement for the Canadian Experience Class."
      : "You need at least 1 year of skilled work experience in Canada within the last 3 years.",
    nextSteps: cecEligible
      ? [
          "Create an Express Entry profile",
          "Wait for an invitation to apply",
          "Submit a complete application within 60 days of invitation",
        ]
      : [
          "Gain at least 1 year of skilled work experience in Canada",
          "Ensure your language scores meet the minimum requirements",
        ]
  });
  
  // Federal Skilled Trades Program
  const fstEligible = 
    profile.englishReading >= 5 && profile.englishWriting >= 5 && 
    profile.englishSpeaking >= 5 && profile.englishListening >= 5; // CLB 5 in all English abilities
  
  pathways.push({
    name: "Express Entry - Federal Skilled Trades",
    eligibility: fstEligible ? "Potentially Eligible" : "Not Eligible",
    score: fstEligible ? score : "N/A",
    description: fstEligible
      ? "You meet the language requirements. If you have a valid job offer or certification in a skilled trade, you may qualify."
      : "You need at least CLB 5 in all English language abilities and either a valid job offer or certification in a skilled trade.",
    nextSteps: fstEligible
      ? [
          "Verify your trade qualification is eligible",
          "Obtain a valid job offer or provincial/territorial certification",
          "Create an Express Entry profile",
        ]
      : [
          "Improve your English language scores to reach CLB 5 in all abilities",
          "Obtain a valid job offer or certification in a skilled trade",
        ]
  });
  
  // Provincial Nominee Programs
  // Ontario
  pathways.push({
    name: "Provincial Nominee Program - Ontario Skilled Worker",
    eligibility: "Potentially Eligible",
    score: score,
    description: "You may qualify for nomination from Ontario based on your skills and experience.",
    nextSteps: [
      "Create an Express Entry profile",
      "Indicate interest in Ontario",
      "Wait for a Notification of Interest from Ontario",
    ]
  });
  
  // British Columbia
  pathways.push({
    name: "Provincial Nominee Program - British Columbia Tech",
    eligibility: "Potentially Eligible",
    score: score,
    description: "If you have experience in tech occupations, you may qualify for BC's Tech stream.",
    nextSteps: [
      "Verify your occupation is on BC's tech occupations list",
      "Create an Express Entry profile",
      "Apply directly to BC PNP Tech stream",
    ]
  });
  
  return pathways;
}

// Generate improvement suggestions
function generateImprovementSuggestions(profile: UserProfile, score: CRSScoreBreakdown): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = [];
  
  // Language improvement
  if (profile.frenchReading < 7 || profile.frenchWriting < 7 || 
      profile.frenchSpeaking < 7 || profile.frenchListening < 7) {
    suggestions.push({
      category: "Language",
      suggestion: "Improve your French language skills",
      potentialPoints: 50,
      description: "You can earn up to 50 additional points by achieving NCLC 7 or higher in all French abilities.",
    });
  }
  
  // Canadian education
  if (!profile.canadianEducation) {
    suggestions.push({
      category: "Education",
      suggestion: "Obtain Canadian educational credentials",
      potentialPoints: 30,
      description: "Complete a program of at least 3 years at a Canadian institution to earn 30 additional points.",
    });
  }
  
  // Canadian work experience
  if (profile.canadianWorkExperience < 3) {
    suggestions.push({
      category: "Work Experience",
      suggestion: "Gain additional Canadian work experience",
      potentialPoints: 40,
      description: "With 3 or more years of Canadian work experience, you can earn up to 80 points in this category.",
    });
  }
  
  // Provincial nomination
  if (!profile.provincialNomination) {
    suggestions.push({
      category: "Provincial Nomination",
      suggestion: "Secure a provincial nomination",
      potentialPoints: 600,
      description: "A provincial nomination adds 600 points to your CRS score, virtually guaranteeing an invitation to apply.",
    });
  }
  
  // Job offer
  if (!profile.jobOffer) {
    suggestions.push({
      category: "Job Offer",
      suggestion: "Obtain a valid job offer in Canada",
      potentialPoints: 200,
      description: "A job offer in TEER 0 occupations can add up to 200 points to your score.",
    });
  }
  
  return suggestions;
}

// Generate complete CRS result
export function generateCRSResult(profile: UserProfile): CRSResult {
  // Calculate detailed score breakdown
  const detailedBreakdown = calculateCRSScore(profile);
  
  // Generate recommended pathways
  const recommendedPathways = generateRecommendedPathways(detailedBreakdown.total, profile);
  
  // Generate improvement suggestions
  const improvementSuggestions = generateImprovementSuggestions(profile, detailedBreakdown);
  
  return {
    totalScore: detailedBreakdown.total,
    breakdown: {
      coreHumanCapital: detailedBreakdown.coreHumanCapital.subtotal,
      spouseFactors: detailedBreakdown.spouseFactors.subtotal,
      skillTransferability: detailedBreakdown.skillTransferability.subtotal,
      additionalPoints: detailedBreakdown.additionalPoints.subtotal,
    },
    detailedBreakdown: detailedBreakdown,
    recentDraws: recentDraws,
    recommendedPathways: recommendedPathways,
    improvementSuggestions: improvementSuggestions,
  };
}
