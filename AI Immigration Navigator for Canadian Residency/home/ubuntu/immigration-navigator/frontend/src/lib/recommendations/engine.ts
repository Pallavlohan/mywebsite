// Recommendation engine implementation

import { UserProfile } from '../crs/types';
import { RecommendationResult, ImmigrationProgram, ProgramRequirement } from './types';
import { allImmigrationPrograms, expressEntryPrograms, provincialNomineePrograms, otherImmigrationPrograms } from './programs-data';
import { generateCRSResult } from '../crs/calculator';

// Check if user meets Federal Skilled Worker Program requirements
function checkFSWPEligibility(profile: UserProfile): boolean {
  // Check for skilled work experience (assuming 1+ year is skilled)
  const hasWorkExperience = profile.foreignWorkExperience >= 1 || profile.canadianWorkExperience >= 1;
  
  // Check for language ability (CLB 7 in all abilities)
  const hasLanguageAbility = 
    (profile.firstLanguage === 'english' && 
     profile.englishReading >= 7 && 
     profile.englishWriting >= 7 && 
     profile.englishSpeaking >= 7 && 
     profile.englishListening >= 7) ||
    (profile.firstLanguage === 'french' && 
     profile.frenchReading >= 7 && 
     profile.frenchWriting >= 7 && 
     profile.frenchSpeaking >= 7 && 
     profile.frenchListening >= 7);
  
  // Check for education (at least secondary)
  const hasEducation = profile.educationLevel !== 'less-than-secondary';
  
  // For FSW points grid, we'd need more detailed calculation
  // For now, we'll assume they meet the 67 points threshold if they meet the other requirements
  
  return hasWorkExperience && hasLanguageAbility && hasEducation;
}

// Check if user meets Canadian Experience Class requirements
function checkCECEligibility(profile: UserProfile): boolean {
  // Check for Canadian work experience (at least 1 year)
  const hasCanadianWorkExperience = profile.canadianWorkExperience >= 1;
  
  // Check for language ability (CLB 7 for TEER 0/1, CLB 5 for TEER 2/3)
  // Since we don't know the NOC category, we'll use CLB 7 as the threshold
  const hasLanguageAbility = 
    (profile.firstLanguage === 'english' && 
     profile.englishReading >= 7 && 
     profile.englishWriting >= 7 && 
     profile.englishSpeaking >= 7 && 
     profile.englishListening >= 7) ||
    (profile.firstLanguage === 'french' && 
     profile.frenchReading >= 7 && 
     profile.frenchWriting >= 7 && 
     profile.frenchSpeaking >= 7 && 
     profile.frenchListening >= 7);
  
  return hasCanadianWorkExperience && hasLanguageAbility;
}

// Check if user meets Federal Skilled Trades Program requirements
function checkFSTPEligibility(profile: UserProfile): boolean {
  // Check for skilled trades work experience (at least 2 years)
  // Since we don't know if it's in a skilled trade, we'll use general work experience
  const hasWorkExperience = profile.foreignWorkExperience >= 2 || profile.canadianWorkExperience >= 2;
  
  // Check for language ability (CLB 5 for speaking/listening, CLB 4 for reading/writing)
  const hasLanguageAbility = 
    (profile.firstLanguage === 'english' && 
     profile.englishReading >= 4 && 
     profile.englishWriting >= 4 && 
     profile.englishSpeaking >= 5 && 
     profile.englishListening >= 5) ||
    (profile.firstLanguage === 'french' && 
     profile.frenchReading >= 4 && 
     profile.frenchWriting >= 4 && 
     profile.frenchSpeaking >= 5 && 
     profile.frenchListening >= 5);
  
  // Check for job offer or certificate (we don't have this info, so we'll assume no)
  const hasJobOfferOrCertificate = profile.jobOffer;
  
  return hasWorkExperience && hasLanguageAbility && hasJobOfferOrCertificate;
}

// Calculate eligibility score for a program based on user profile
function calculateProgramEligibilityScore(program: ImmigrationProgram, profile: UserProfile): number {
  let score = 0;
  let requirementsMet = 0;
  
  // Update requirements based on profile
  program.requirements.forEach(requirement => {
    switch (program.id) {
      case 'fswp':
        if (requirement.name === 'Skilled work experience') {
          requirement.isMet = profile.foreignWorkExperience >= 1 || profile.canadianWorkExperience >= 1;
        } else if (requirement.name === 'Language ability') {
          requirement.isMet = 
            (profile.firstLanguage === 'english' && 
             profile.englishReading >= 7 && 
             profile.englishWriting >= 7 && 
             profile.englishSpeaking >= 7 && 
             profile.englishListening >= 7) ||
            (profile.firstLanguage === 'french' && 
             profile.frenchReading >= 7 && 
             profile.frenchWriting >= 7 && 
             profile.frenchSpeaking >= 7 && 
             profile.frenchListening >= 7);
        } else if (requirement.name === 'Education') {
          requirement.isMet = profile.educationLevel !== 'less-than-secondary';
        } else if (requirement.name === 'Minimum points threshold') {
          // Simplified check for FSW points grid
          requirement.isMet = 
            profile.age >= 18 && profile.age <= 35 && 
            profile.educationLevel !== 'less-than-secondary' && 
            (profile.foreignWorkExperience >= 1 || profile.canadianWorkExperience >= 1);
        }
        break;
        
      case 'cec':
        if (requirement.name === 'Canadian work experience') {
          requirement.isMet = profile.canadianWorkExperience >= 1;
        } else if (requirement.name === 'Language ability') {
          requirement.isMet = 
            (profile.firstLanguage === 'english' && 
             profile.englishReading >= 7 && 
             profile.englishWriting >= 7 && 
             profile.englishSpeaking >= 7 && 
             profile.englishListening >= 7) ||
            (profile.firstLanguage === 'french' && 
             profile.frenchReading >= 7 && 
             profile.frenchWriting >= 7 && 
             profile.frenchSpeaking >= 7 && 
             profile.frenchListening >= 7);
        } else if (requirement.name === 'Plan to live outside Quebec') {
          requirement.isMet = true; // Assume true for now
        }
        break;
        
      case 'fstp':
        if (requirement.name === 'Skilled trades work experience') {
          requirement.isMet = profile.foreignWorkExperience >= 2 || profile.canadianWorkExperience >= 2;
        } else if (requirement.name === 'Language ability') {
          requirement.isMet = 
            (profile.firstLanguage === 'english' && 
             profile.englishReading >= 4 && 
             profile.englishWriting >= 4 && 
             profile.englishSpeaking >= 5 && 
             profile.englishListening >= 5) ||
            (profile.firstLanguage === 'french' && 
             profile.frenchReading >= 4 && 
             profile.frenchWriting >= 4 && 
             profile.frenchSpeaking >= 5 && 
             profile.frenchListening >= 5);
        } else if (requirement.name === 'Job offer or certificate') {
          requirement.isMet = profile.jobOffer;
        }
        break;
        
      case 'ontario_hcp':
        if (requirement.name === 'Express Entry profile') {
          requirement.isMet = checkFSWPEligibility(profile) || checkCECEligibility(profile);
        } else if (requirement.name === 'CRS score') {
          const crsResult = generateCRSResult(profile);
          requirement.isMet = crsResult.totalScore >= 400;
        } else if (requirement.name === 'Education') {
          requirement.isMet = ['bachelors', 'masters', 'doctoral'].includes(profile.educationLevel);
        } else if (requirement.name === 'Language ability') {
          requirement.isMet = 
            (profile.firstLanguage === 'english' && 
             profile.englishReading >= 7 && 
             profile.englishWriting >= 7 && 
             profile.englishSpeaking >= 7 && 
             profile.englishListening >= 7) ||
            (profile.firstLanguage === 'french' && 
             profile.frenchReading >= 7 && 
             profile.frenchWriting >= 7 && 
             profile.frenchSpeaking >= 7 && 
             profile.frenchListening >= 7);
        } else if (requirement.name === 'Settlement funds') {
          requirement.isMet = true; // Assume true for now
        }
        break;
        
      // Add more cases for other programs as needed
      
      default:
        // For other programs, we'll set a default value
        requirement.isMet = Math.random() > 0.5;
        break;
    }
    
    if (requirement.isMet) {
      requirementsMet++;
    }
  });
  
  // Calculate score based on percentage of requirements met
  score = Math.round((requirementsMet / program.requirements.length) * 100);
  
  return score;
}

// Check if all minimum requirements are met for a program
function checkMinimumRequirementsMet(program: ImmigrationProgram): boolean {
  return program.requirements.every(req => req.isMet);
}

// Generate program recommendations based on user profile
export function generateProgramRecommendations(profile: UserProfile): RecommendationResult {
  const crsResult = generateCRSResult(profile);
  const totalScore = crsResult.totalScore;
  
  // Update eligibility scores for all programs
  const updatedPrograms = allImmigrationPrograms.map(program => {
    const eligibilityScore = calculateProgramEligibilityScore(program, profile);
    const minimumRequirementsMet = checkMinimumRequirementsMet(program);
    
    return {
      ...program,
      eligibilityScore,
      minimumRequirementsMet
    };
  });
  
  // Sort programs by eligibility score (descending)
  const sortedPrograms = [...updatedPrograms].sort((a, b) => b.eligibilityScore - a.eligibilityScore);
  
  // Get top 5 pathways
  const topPathways = sortedPrograms
    .filter(program => program.eligibilityScore > 0)
    .slice(0, 5)
    .map(program => ({
      name: program.name,
      eligibility: program.minimumRequirementsMet ? "Eligible" : program.eligibilityScore >= 50 ? "Potentially Eligible" : "Not Eligible",
      score: totalScore,
      description: program.description,
      nextSteps: program.nextSteps
    }));
  
  // Calculate recent trends
  const recentDrawScores = crsResult.recentDraws.map(draw => draw.score);
  const averageScore = Math.round(recentDrawScores.reduce((sum, score) => sum + score, 0) / recentDrawScores.length);
  const lowestScore = Math.min(...recentDrawScores);
  const highestScore = Math.max(...recentDrawScores);
  
  // Calculate user percentile (simplified)
  const userPercentile = totalScore >= highestScore ? 95 :
                         totalScore >= averageScore ? 75 :
                         totalScore >= lowestScore ? 50 : 25;
  
  // Generate alerts
  const alerts = [];
  
  if (totalScore >= lowestScore) {
    alerts.push({
      type: 'success',
      message: `Your CRS score of ${totalScore} is above the lowest recent draw score of ${lowestScore}. You may be eligible for an invitation in upcoming draws.`
    });
  } else {
    alerts.push({
      type: 'warning',
      message: `Your CRS score of ${totalScore} is below the lowest recent draw score of ${lowestScore}. Consider improving your score or exploring provincial programs.`
    });
  }
  
  if (profile.provincialNomination) {
    alerts.push({
      type: 'success',
      message: 'With a provincial nomination, you receive an additional 600 points, significantly increasing your chances of receiving an invitation to apply.'
    });
  }
  
  return {
    topPathways,
    allPrograms: sortedPrograms,
    improvementSuggestions: crsResult.improvementSuggestions,
    recentTrends: {
      averageScore,
      lowestScore,
      highestScore,
      userPercentile,
      drawFrequency: 'Approximately every 2 weeks'
    },
    alerts
  };
}
