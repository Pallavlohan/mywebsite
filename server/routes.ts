import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateCrsScore } from "./services/crsCalculator";
import { getRecommendations } from "./services/advisoryEngine";
import { analyzeProfile } from "./services/profileAnalysis";
import { getProvincialPrograms } from "./services/advisoryEngine";
import { getCurrentCrsCutoff, getNocJobInformation } from "./lib/canadaData";
import { insertCrsProfileSchema, insertCrsResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Calculate CRS score and provide recommendations
  app.post("/api/calculate-score", async (req: Request, res: Response) => {
    try {
      // Validate input data
      const profileData = req.body;
      
      // Log received data for debugging
      console.log("Received profile data for calculation:", JSON.stringify({
        name: profileData.fullName,
        birthdate: profileData.birthdate,
        educationLevel: profileData.educationLevel,
        primaryLanguage: profileData.primaryLanguage
      }));
      
      // Calculate CRS score
      const crsScore = await calculateCrsScore(profileData);
      console.log("Calculated CRS score:", crsScore.totalScore);
      
      // Get current CRS cutoff
      const currentCutoff = await getCurrentCrsCutoff();
      console.log("Current CRS cutoff:", currentCutoff);
      
      // Get recommendations based on score and profile
      const recommendations = await getRecommendations(profileData, crsScore, currentCutoff);
      
      // Analyze profile for additional insights if profileDescription is provided
      let aiAnalysis = null;
      if (profileData.profileDescription) {
        console.log("Generating AI analysis for profile");
        aiAnalysis = await analyzeProfile(profileData);
      }
      
      // Get eligible provincial programs
      const provincialPrograms = await getProvincialPrograms(profileData, crsScore);
      
      // Determine eligibility based on current cutoff
      let eligibility: 'eligible' | 'close' | 'not_eligible' = 'not_eligible';
      if (crsScore.totalScore >= currentCutoff) {
        eligibility = 'eligible';
      } else if (crsScore.totalScore >= currentCutoff - 50) {
        eligibility = 'close';
      }
      console.log("Eligibility determined:", eligibility);
      
      // Prepare response
      const result = {
        profileId: 1, // Would be associated with a real profile ID in production
        score: {
          coreHumanCapitalPoints: crsScore.core.total,
          spouseFactorsPoints: crsScore.spouse.total,
          skillTransferabilityPoints: crsScore.skillTransferability.total,
          additionalPoints: crsScore.additional.total,
          totalCrsScore: crsScore.totalScore
        },
        detailedBreakdown: crsScore,
        currentCutoff,
        recommendations,
        provincialPrograms,
        eligibility,
        aiAnalysis
      };
      
      res.json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error calculating CRS score:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to calculate CRS score" 
      });
    }
  });
  
  // Get provincial program details
  app.get("/api/provincial-programs", async (req: Request, res: Response) => {
    try {
      const { nocCode, score } = req.query;
      
      if (!nocCode || !score) {
        return res.status(400).json({ 
          success: false, 
          error: "NOC code and CRS score are required parameters" 
        });
      }
      
      const parsedScore = parseInt(score as string);
      
      const provincialPrograms = await getProvincialPrograms(
        { nocCodes: [nocCode as string] }, 
        { totalScore: parsedScore }
      );
      
      res.json({ success: true, data: provincialPrograms });
    } catch (error: any) {
      console.error("Error fetching provincial programs:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to fetch provincial programs" 
      });
    }
  });
  
  // Get NOC job information
  app.get("/api/noc-job/:nocCode", async (req: Request, res: Response) => {
    try {
      const { nocCode } = req.params;
      
      if (!nocCode) {
        return res.status(400).json({ 
          success: false, 
          error: "NOC code is required" 
        });
      }
      
      const jobInfo = await getNocJobInformation(nocCode);
      
      if (!jobInfo) {
        return res.status(404).json({ 
          success: false, 
          error: "NOC code not found" 
        });
      }
      
      res.json({ success: true, data: jobInfo });
    } catch (error: any) {
      console.error("Error fetching NOC job information:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to fetch NOC job information" 
      });
    }
  });
  
  // Save CRS profile
  app.post("/api/profiles", async (req: Request, res: Response) => {
    try {
      // Validate input data with Zod schema
      const validatedData = insertCrsProfileSchema.parse(req.body);
      
      // Save profile to storage
      const savedProfile = await storage.createCrsProfile(validatedData);
      
      res.json({ 
        success: true, 
        data: savedProfile
      });
    } catch (error: any) {
      console.error("Error saving CRS profile:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to save CRS profile" 
      });
    }
  });
  
  // Save CRS result
  app.post("/api/results", async (req: Request, res: Response) => {
    try {
      // Validate input data with Zod schema
      const validatedData = insertCrsResultSchema.parse(req.body);
      
      // Save result to storage
      const savedResult = await storage.createCrsResult(validatedData);
      
      res.json({ 
        success: true, 
        data: savedResult
      });
    } catch (error: any) {
      console.error("Error saving CRS result:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to save CRS result" 
      });
    }
  });
  
  // Get CRS profile by ID
  app.get("/api/profiles/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid profile ID"
        });
      }
      
      const profile = await storage.getCrsProfile(id);
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: "Profile not found"
        });
      }
      
      res.json({
        success: true,
        data: profile
      });
    } catch (error: any) {
      console.error("Error retrieving CRS profile:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to retrieve CRS profile"
      });
    }
  });
  
  // Get CRS result by profile ID
  app.get("/api/results/profile/:profileId", async (req: Request, res: Response) => {
    try {
      const profileId = parseInt(req.params.profileId);
      
      if (isNaN(profileId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid profile ID"
        });
      }
      
      const results = await storage.getCrsResultsByProfileId(profileId);
      
      res.json({
        success: true,
        data: results
      });
    } catch (error: any) {
      console.error("Error retrieving CRS results:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to retrieve CRS results"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
