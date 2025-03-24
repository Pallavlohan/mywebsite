import { generateAnalysis } from "../lib/transformer";

/**
 * Analyzes a user's profile using AI to provide personalized insights
 * @param profileData User profile data
 * @returns Analysis string with personalized insights
 */
export async function analyzeProfile(profileData: any): Promise<string> {
  try {
    // Prepare prompt for the AI model
    const prompt = buildAnalysisPrompt(profileData);
    
    // Generate analysis using transformer model
    const analysis = await generateAnalysis(prompt);
    
    return analysis;
  } catch (error) {
    console.error("Error analyzing profile:", error);
    // Provide a fallback analysis if AI fails
    return generateFallbackAnalysis(profileData);
  }
}

/**
 * Builds a prompt for the AI model based on profile data
 * @param profileData User profile data
 * @returns Formatted prompt for AI analysis
 */
function buildAnalysisPrompt(profileData: any): string {
  // Extract key information from profile
  const {
    fullName,
    age,
    maritalStatus,
    countryOfCitizenship,
    educationLevel,
    primaryLanguageCLB,
    canadianWorkExperienceYears,
    foreignWorkExperienceYears,
    canadianNocCodes,
    foreignNocCodes,
    profileDescription
  } = profileData;
  
  // Build profile summary
  const profileSummary = `
Profile Summary:
- Name: ${fullName}
- Age: ${age || "Unknown"}
- Marital Status: ${maritalStatus || "Unknown"}
- Country of Citizenship: ${countryOfCitizenship || "Unknown"}
- Education Level: ${educationLevel || "Unknown"}
- Language Proficiency (CLB): ${primaryLanguageCLB || "Unknown"}
- Canadian Work Experience: ${canadianWorkExperienceYears || 0} years
- Foreign Work Experience: ${foreignWorkExperienceYears || 0} years
- Canadian NOC Codes: ${canadianNocCodes ? canadianNocCodes.join(", ") : "None"}
- Foreign NOC Codes: ${foreignNocCodes ? foreignNocCodes.join(", ") : "None"}
- Profile Description: ${profileDescription || "None provided"}
  `;
  
  // Build the prompt
  const prompt = `
Analyze the following immigration candidate profile for Canadian immigration:

${profileSummary}

Provide a concise analysis of the candidate's strengths and weaknesses for Canadian immigration.
Include specific recommendations based on their profile to improve their chances.
Focus on:
1. Their strengths and how they align with Canadian immigration priorities
2. Areas where they could improve their profile
3. Specific provincial programs that might be suitable for them
4. Any unique aspects of their profile that might be advantageous
  `;
  
  return prompt;
}

/**
 * Generates a fallback analysis if AI analysis fails
 * @param profileData User profile data
 * @returns Fallback analysis based on basic rules
 */
function generateFallbackAnalysis(profileData: any): string {
  const {
    primaryLanguageCLB,
    educationLevel,
    canadianWorkExperienceYears,
    age
  } = profileData;
  
  // Default analysis sections
  let strengths = [];
  let weaknesses = [];
  let recommendations = [];
  
  // Analyze language skills
  if (primaryLanguageCLB >= 9) {
    strengths.push("Strong language proficiency that exceeds the minimum requirements for Express Entry.");
  } else if (primaryLanguageCLB >= 7) {
    strengths.push("Adequate language proficiency that meets the minimum requirements for Express Entry.");
  } else if (primaryLanguageCLB >= 5) {
    weaknesses.push("Language proficiency is below optimal levels for Express Entry.");
    recommendations.push("Focus on improving language skills to achieve CLB 9 or higher in all abilities.");
  } else {
    weaknesses.push("Language proficiency is a significant barrier to eligibility.");
    recommendations.push("Prioritize language improvement before applying for Express Entry.");
  }
  
  // Analyze education
  if (educationLevel === 'masters' || educationLevel === 'doctoral') {
    strengths.push("Advanced education that is highly valued in the CRS system.");
  } else if (educationLevel === 'bachelors') {
    strengths.push("Undergraduate degree that provides a solid foundation for immigration.");
  } else {
    weaknesses.push("Educational qualifications could be improved for higher CRS points.");
    recommendations.push("Consider pursuing further education, especially from a Canadian institution.");
  }
  
  // Analyze work experience
  if (canadianWorkExperienceYears >= 3) {
    strengths.push("Significant Canadian work experience that enhances CRS score.");
  } else if (canadianWorkExperienceYears > 0) {
    strengths.push("Some Canadian work experience, which is valuable for immigration.");
    recommendations.push("Continue gaining Canadian work experience to maximize points.");
  } else {
    weaknesses.push("Lack of Canadian work experience may reduce competitiveness.");
    recommendations.push("Explore pathways to gain Canadian work experience such as work permits or the International Experience Canada program.");
  }
  
  // Analyze age
  if (age >= 20 && age <= 29) {
    strengths.push("Age is in the optimal range for maximum CRS points.");
  } else if (age >= 30 && age <= 35) {
    strengths.push("Age is still favorable for strong CRS points.");
  } else if (age > 35) {
    weaknesses.push("Age may result in fewer CRS points as candidates over 35 receive decreasing points.");
    recommendations.push("Consider applying as soon as possible, as age points decrease over time.");
  }
  
  // Compile analysis
  const analysis = `
Profile Analysis:

Strengths:
${strengths.map(s => `- ${s}`).join('\n')}

Areas for Improvement:
${weaknesses.map(w => `- ${w}`).join('\n')}

Recommendations:
${recommendations.map(r => `- ${r}`).join('\n')}

This analysis is based on general immigration patterns and official CRS criteria. For a more detailed assessment, please consult with a licensed immigration consultant or lawyer.
  `;
  
  return analysis;
}
