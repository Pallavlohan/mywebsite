import { 
  users, type User, type InsertUser, 
  crsProfiles, type CrsProfile, type InsertCrsProfile,
  crsResults, type CrsResult, type InsertCrsResult
} from "@shared/schema";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

// Modify the interface with all CRUD methods we need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // CRS Profile methods
  getCrsProfile(id: number): Promise<CrsProfile | undefined>;
  getCrsProfilesByUserId(userId: number): Promise<CrsProfile[]>;
  createCrsProfile(profile: InsertCrsProfile): Promise<CrsProfile>;
  updateCrsProfile(id: number, profile: Partial<InsertCrsProfile>): Promise<CrsProfile | undefined>;
  
  // CRS Results methods
  getCrsResult(id: number): Promise<CrsResult | undefined>;
  getCrsResultsByProfileId(profileId: number): Promise<CrsResult[]>;
  createCrsResult(result: InsertCrsResult): Promise<CrsResult>;
}

// For development/testing, use in-memory storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private crsProfiles: Map<number, CrsProfile>;
  private crsResults: Map<number, CrsResult>;
  private userCurrentId: number;
  private profileCurrentId: number;
  private resultCurrentId: number;

  constructor() {
    this.users = new Map();
    this.crsProfiles = new Map();
    this.crsResults = new Map();
    this.userCurrentId = 1;
    this.profileCurrentId = 1;
    this.resultCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // CRS Profile methods
  async getCrsProfile(id: number): Promise<CrsProfile | undefined> {
    return this.crsProfiles.get(id);
  }
  
  async getCrsProfilesByUserId(userId: number): Promise<CrsProfile[]> {
    return Array.from(this.crsProfiles.values()).filter(
      (profile) => profile.userId === userId
    );
  }
  
  async createCrsProfile(insertProfile: InsertCrsProfile): Promise<CrsProfile> {
    const id = this.profileCurrentId++;
    const now = new Date();
    
    // Ensure all required fields are present and optional fields have defaults
    const profile: CrsProfile = {
      id,
      userId: insertProfile.userId !== undefined ? insertProfile.userId : null,
      fullName: insertProfile.fullName,
      email: insertProfile.email,
      birthdate: insertProfile.birthdate,
      maritalStatus: insertProfile.maritalStatus,
      countryOfCitizenship: insertProfile.countryOfCitizenship,
      currentCountry: insertProfile.currentCountry,
      
      // Boolean flags with defaults
      hasSpouse: insertProfile.hasSpouse === true,
      hasCanadianEducation: insertProfile.hasCanadianEducation === true,
      hasSecondaryLanguage: insertProfile.hasSecondaryLanguage === true,
      hasCanadianWorkExperience: insertProfile.hasCanadianWorkExperience === true,
      hasForeignWorkExperience: insertProfile.hasForeignWorkExperience === true,
      hasProvincialNomination: insertProfile.hasProvincialNomination === true,
      hasValidJobOffer: insertProfile.hasValidJobOffer === true,
      hasSiblingInCanada: insertProfile.hasSiblingInCanada === true,
      
      // Optional string fields
      spouseFullName: insertProfile.spouseFullName || null,
      spouseBirthdate: insertProfile.spouseBirthdate || null,
      
      // Education fields
      educationLevel: insertProfile.educationLevel || 'secondary', // Provide a default
      educationCountry: insertProfile.educationCountry || null,
      educationYears: insertProfile.educationYears || 0, // Default to 0
      canadianEducationLevel: insertProfile.canadianEducationLevel || null,
      canadianEducationYears: insertProfile.canadianEducationYears || 0,
      
      // Language fields
      primaryLanguage: insertProfile.primaryLanguage || 'English', // Default language
      primaryLanguageTest: insertProfile.primaryLanguageTest || 'IELTS', // Default test
      primaryLanguageListening: insertProfile.primaryLanguageListening || 0,
      primaryLanguageSpeaking: insertProfile.primaryLanguageSpeaking || 0,
      primaryLanguageReading: insertProfile.primaryLanguageReading || 0,
      primaryLanguageWriting: insertProfile.primaryLanguageWriting || 0,
      
      secondaryLanguage: insertProfile.secondaryLanguage || null,
      secondaryLanguageTest: insertProfile.secondaryLanguageTest || null,
      secondaryLanguageListening: insertProfile.secondaryLanguageListening || 0,
      secondaryLanguageSpeaking: insertProfile.secondaryLanguageSpeaking || 0,
      secondaryLanguageReading: insertProfile.secondaryLanguageReading || 0,
      secondaryLanguageWriting: insertProfile.secondaryLanguageWriting || 0,
      
      // Work experience
      canadianWorkExperienceYears: insertProfile.canadianWorkExperienceYears || 0,
      canadianNocCodes: insertProfile.canadianNocCodes || [],
      foreignWorkExperienceYears: insertProfile.foreignWorkExperienceYears || 0,
      foreignNocCodes: insertProfile.foreignNocCodes || [],
      
      // Additional fields
      jobOfferNocCode: insertProfile.jobOfferNocCode || null,
      profileDescription: insertProfile.profileDescription || null,
      
      // Timestamps
      createdAt: now,
      updatedAt: now
    };
    
    this.crsProfiles.set(id, profile);
    return profile;
  }
  
  async updateCrsProfile(id: number, profileUpdate: Partial<InsertCrsProfile>): Promise<CrsProfile | undefined> {
    const profile = this.crsProfiles.get(id);
    if (!profile) return undefined;
    
    const updatedProfile: CrsProfile = { 
      ...profile, 
      ...profileUpdate,
      updatedAt: new Date()
    };
    
    this.crsProfiles.set(id, updatedProfile);
    return updatedProfile;
  }
  
  // CRS Results methods
  async getCrsResult(id: number): Promise<CrsResult | undefined> {
    return this.crsResults.get(id);
  }
  
  async getCrsResultsByProfileId(profileId: number): Promise<CrsResult[]> {
    return Array.from(this.crsResults.values()).filter(
      (result) => result.profileId === profileId
    );
  }
  
  async createCrsResult(insertResult: InsertCrsResult): Promise<CrsResult> {
    const id = this.resultCurrentId++;
    const now = new Date();
    // Ensure profileId is set to null if not provided
    const profileId = insertResult.profileId ?? null;
    // Ensure aiAnalysisSummary is set to null if not provided
    const aiAnalysisSummary = insertResult.aiAnalysisSummary ?? null;
    
    const result: CrsResult = { 
      ...insertResult, 
      id,
      profileId,
      aiAnalysisSummary,
      createdAt: now, 
      updatedAt: now 
    };
    this.crsResults.set(id, result);
    return result;
  }
}

// For production, use the PostgreSQL database
export class DbStorage implements IStorage {
  private sql = drizzle(neon(process.env.DATABASE_URL!));
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.sql.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.sql.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.sql.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // CRS Profile methods
  async getCrsProfile(id: number): Promise<CrsProfile | undefined> {
    const result = await this.sql.select().from(crsProfiles).where(eq(crsProfiles.id, id)).limit(1);
    return result[0];
  }
  
  async getCrsProfilesByUserId(userId: number): Promise<CrsProfile[]> {
    return await this.sql.select().from(crsProfiles).where(eq(crsProfiles.userId, userId));
  }
  
  async createCrsProfile(profile: InsertCrsProfile): Promise<CrsProfile> {
    const result = await this.sql.insert(crsProfiles).values(profile).returning();
    return result[0];
  }
  
  async updateCrsProfile(id: number, profileUpdate: Partial<InsertCrsProfile>): Promise<CrsProfile | undefined> {
    const result = await this.sql
      .update(crsProfiles)
      .set({ ...profileUpdate, updatedAt: new Date() })
      .where(eq(crsProfiles.id, id))
      .returning();
    return result[0];
  }
  
  // CRS Results methods
  async getCrsResult(id: number): Promise<CrsResult | undefined> {
    const result = await this.sql.select().from(crsResults).where(eq(crsResults.id, id)).limit(1);
    return result[0];
  }
  
  async getCrsResultsByProfileId(profileId: number): Promise<CrsResult[]> {
    return await this.sql.select().from(crsResults).where(eq(crsResults.profileId, profileId));
  }
  
  async createCrsResult(result: InsertCrsResult): Promise<CrsResult> {
    const insertedResult = await this.sql.insert(crsResults).values(result).returning();
    return insertedResult[0];
  }
}

// Choose the appropriate storage implementation based on environment
// For now, use MemStorage for development
export const storage = new MemStorage();

// To use database storage, comment out the line above and uncomment the line below
// export const storage = new DbStorage();
