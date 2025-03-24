import { apiRequest } from "./queryClient";

/**
 * Calls the backend API to calculate CRS score
 * @param formData Form data containing all CRS input fields
 * @returns API response with CRS score and recommendations
 */
export async function calculateCrsScore(formData: any) {
  try {
    const response = await apiRequest('POST', '/api/calculate-score', formData);
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to calculate CRS score");
  }
}

/**
 * Gets provincial program information based on NOC code and score
 * @param nocCode NOC code for the job
 * @param score CRS score
 * @returns API response with provincial program options
 */
export async function getProvincialPrograms(nocCode: string, score: number) {
  try {
    const response = await apiRequest('GET', `/api/provincial-programs?nocCode=${nocCode}&score=${score}`, undefined);
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to get provincial programs");
  }
}

/**
 * Gets detailed information about a NOC job
 * @param nocCode NOC code to look up
 * @returns API response with NOC job details
 */
export async function getNocJobInfo(nocCode: string) {
  try {
    const response = await apiRequest('GET', `/api/noc-job/${nocCode}`, undefined);
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to get NOC job information");
  }
}

/**
 * Saves a CRS profile to the database
 * @param profileData CRS profile data
 * @returns API response with saved profile
 */
export async function saveProfile(profileData: any) {
  try {
    const response = await apiRequest('POST', '/api/profiles', profileData);
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to save profile");
  }
}

/**
 * Saves CRS result to the database
 * @param resultData CRS result data
 * @returns API response with saved result
 */
export async function saveResult(resultData: any) {
  try {
    const response = await apiRequest('POST', '/api/results', resultData);
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to save result");
  }
}
