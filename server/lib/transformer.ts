/**
 * This file integrates with Google Gemini API for intelligent analysis
 * We're using the @google/generative-ai library to generate personalized
 * immigration profile analyses for users
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Gemini API with API key
let genAI: GoogleGenerativeAI | null = null;

/**
 * Initializes the Google Gemini API client
 * Must be called before using generateAnalysis
 */
export function initGeminiAPI(apiKey: string): void {
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * Generates an analysis of a user's profile based on a prompt using Google Gemini API
 * @param prompt The detailed prompt containing user profile information
 * @returns Generated analysis text
 */
export async function generateAnalysis(prompt: string): Promise<string> {
  try {
    // If API key is missing or not yet set, fall back to the rule-based analysis
    if (!process.env.GEMINI_API_KEY || !genAI) {
      console.warn("Gemini API key not found, using rule-based analysis instead");
      // Parse key information from the prompt to generate a tailored response
      const profileInfo = extractProfileInfo(prompt);
      
      // Create a personalized analysis based on the extracted information
      return createPersonalizedAnalysis(profileInfo);
    }
    
    // Use Google Gemini API for generation
    return await generateGeminiAnalysis(prompt);
  } catch (error) {
    console.error("Error generating analysis:", error);
    
    // Fallback to rule-based analysis in case of API errors
    console.warn("Falling back to rule-based analysis due to API error");
    const profileInfo = extractProfileInfo(prompt);
    return createPersonalizedAnalysis(profileInfo);
  }
}

/**
 * Generates an analysis using Google Gemini API
 * @param prompt The input prompt
 * @returns Generated analysis text
 */
async function generateGeminiAnalysis(prompt: string): Promise<string> {
  try {
    if (!genAI) {
      initGeminiAPI(process.env.GEMINI_API_KEY || "");
      if (!genAI) {
        throw new Error("Failed to initialize Gemini API");
      }
    }
    
    // Create a model instance with the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create a complete prompt with specific instructions for the model
    const fullPrompt = `
    You are an expert Canadian immigration consultant analyzing a profile for Express Entry eligibility.
    Provide a detailed, professional analysis of the following profile information.
    Include strengths, areas for improvement, opportunities, and practical recommendations.
    Format your response in markdown with clear sections.
    
    ${prompt}
    
    Provide specific, actionable advice for improving their CRS score and eligibility.
    Be accurate, thorough, and helpful. Focus only on relevant immigration factors.
    `;
    
    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    throw new Error("Failed to generate profile analysis with Gemini");
  }
}

/**
 * Extracts key profile information from the prompt
 * @param prompt The input prompt containing profile information
 * @returns Extracted profile information
 */
function extractProfileInfo(prompt: string): any {
  const profileInfo: any = {
    age: null,
    education: null,
    languageCLB: null,
    canadianExperience: null,
    foreignExperience: null,
    nocCodes: []
  };
  
  // Extract age
  const ageMatch = prompt.match(/Age: (\d+)/);
  if (ageMatch) {
    profileInfo.age = parseInt(ageMatch[1]);
  }
  
  // Extract education
  const educationMatch = prompt.match(/Education Level: ([^\n]+)/);
  if (educationMatch) {
    profileInfo.education = educationMatch[1].trim();
  }
  
  // Extract language CLB
  const languageMatch = prompt.match(/Language Proficiency \(CLB\): (\d+)/);
  if (languageMatch) {
    profileInfo.languageCLB = parseInt(languageMatch[1]);
  }
  
  // Extract Canadian work experience
  const canadianExpMatch = prompt.match(/Canadian Work Experience: (\d+)/);
  if (canadianExpMatch) {
    profileInfo.canadianExperience = parseInt(canadianExpMatch[1]);
  }
  
  // Extract foreign work experience
  const foreignExpMatch = prompt.match(/Foreign Work Experience: (\d+)/);
  if (foreignExpMatch) {
    profileInfo.foreignExperience = parseInt(foreignExpMatch[1]);
  }
  
  // Extract NOC codes
  const nocMatch = prompt.match(/Canadian NOC Codes: ([^\n]+)/);
  if (nocMatch && nocMatch[1] !== "None") {
    profileInfo.nocCodes = nocMatch[1].split(',').map((code: string) => code.trim());
  }
  
  return profileInfo;
}

/**
 * Creates a personalized analysis based on profile information
 * @param profileInfo Extracted profile information
 * @returns Personalized analysis text
 */
function createPersonalizedAnalysis(profileInfo: any): string {
  const { age, education, languageCLB, canadianExperience, foreignExperience, nocCodes } = profileInfo;
  
  // Initialize sections of the analysis
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze age
  if (age >= 20 && age <= 29) {
    strengths.push("Your age (20-29) is optimal for CRS scoring, giving you maximum age points.");
  } else if (age >= 30 && age <= 35) {
    strengths.push("Your age (30-35) is still favorable for CRS scoring.");
  } else if (age > 35) {
    weaknesses.push(`Your age (${age}) results in fewer CRS points, as candidates over 35 receive decreasing points with age.`);
    recommendations.push("Consider applying as soon as possible, as age points decrease over time.");
  }
  
  // Analyze education
  if (education) {
    if (education.includes("masters") || education.includes("doctoral")) {
      strengths.push("Your advanced degree significantly boosts your CRS score.");
    } else if (education.includes("bachelors")) {
      strengths.push("Your bachelor's degree provides solid educational points.");
      opportunities.push("Pursuing a graduate degree could increase your education points.");
    } else {
      weaknesses.push("Your current education level may limit your CRS points.");
      recommendations.push("Consider upgrading your education, particularly through Canadian institutions.");
    }
  }
  
  // Analyze language
  if (languageCLB) {
    if (languageCLB >= 9) {
      strengths.push(`Your strong language proficiency (CLB ${languageCLB}) maximizes your language points.`);
    } else if (languageCLB >= 7) {
      strengths.push(`Your language proficiency (CLB ${languageCLB}) meets Express Entry requirements.`);
      opportunities.push("Improving to CLB 9+ would significantly increase your language points.");
    } else {
      weaknesses.push(`Your language score (CLB ${languageCLB}) is below optimal levels for Express Entry.`);
      recommendations.push("Focus on improving language skills to achieve CLB 9 or higher.");
    }
  }
  
  // Analyze work experience
  if (canadianExperience > 0) {
    if (canadianExperience >= 3) {
      strengths.push(`Your ${canadianExperience} years of Canadian work experience provides substantial CRS points.`);
    } else {
      strengths.push(`Your ${canadianExperience} years of Canadian work experience is valuable.`);
      opportunities.push("Continuing to gain Canadian work experience will increase your points.");
    }
  } else {
    weaknesses.push("You have no Canadian work experience, which limits your CRS points.");
    recommendations.push("Explore pathways to gain Canadian work experience such as work permits.");
  }
  
  if (foreignExperience > 0) {
    strengths.push(`Your ${foreignExperience} years of foreign work experience contributes to your CRS score.`);
    if (foreignExperience >= 3 && !canadianExperience) {
      opportunities.push("Your foreign experience could be leveraged for certain PNP streams.");
    }
  }
  
  // Analyze NOC codes
  if (nocCodes && nocCodes.length > 0) {
    if (nocCodes.some((code: string) => code.startsWith('0') || code.startsWith('2') || code.startsWith('3'))) {
      strengths.push("Your experience in high-demand NOC categories (management, technical, or healthcare) is advantageous.");
      opportunities.push("Your occupation may qualify for specific provincial nominee programs.");
    }
  }
  
  // Provincial recommendations based on profile
  let provincialRecommendation = "Based on your profile, ";
  if (languageCLB >= 7 && (canadianExperience > 0 || foreignExperience >= 2)) {
    provincialRecommendation += "you may be a good candidate for the Alberta Advantage Immigration Program.";
  } else if (education && education.includes("masters") && languageCLB >= 7) {
    provincialRecommendation += "Ontario's Human Capital Priorities stream might be suitable for you.";
  } else if (languageCLB >= 4 && foreignExperience >= 2) {
    provincialRecommendation += "Saskatchewan's International Skilled Worker program could be an option.";
  } else {
    provincialRecommendation += "improving your language skills and gaining relevant work experience would open more provincial pathways.";
  }
  
  recommendations.push(provincialRecommendation);
  
  // Compile the analysis
  return `
# Canadian Immigration Profile Analysis

## Strengths
${strengths.map(s => `- ${s}`).join('\n')}

## Areas for Improvement
${weaknesses.map(w => `- ${w}`).join('\n')}

## Opportunities
${opportunities.map(o => `- ${o}`).join('\n')}

## Recommendations
${recommendations.map(r => `- ${r}`).join('\n')}

This analysis is based on your provided information and current Canadian immigration programs. Immigration policies change frequently, so consider consulting with a registered immigration consultant for the most current advice tailored to your situation.
  `;
}
