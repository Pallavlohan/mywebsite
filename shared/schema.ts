import { pgTable, text, serial, integer, boolean, json, pgEnum, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User authentication schema (kept from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Marital status enum
export const maritalStatusEnum = pgEnum("marital_status", [
  "single", 
  "married", 
  "separated", 
  "divorced", 
  "widowed"
]);

// Language test type enum
export const languageTestEnum = pgEnum("language_test", [
  "IELTS", 
  "CELPIP", 
  "TEF", 
  "TCF"
]);

// Education level enum
export const educationLevelEnum = pgEnum("education_level", [
  "less_than_secondary",
  "secondary",
  "one_year_post_secondary",
  "two_year_post_secondary",
  "bachelors",
  "two_or_more_post_secondary",
  "masters",
  "doctoral"
]);

// CRS Profile table
export const crsProfiles = pgTable("crs_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  birthdate: date("birthdate").notNull(),
  maritalStatus: maritalStatusEnum("marital_status").notNull(),
  countryOfCitizenship: text("country_of_citizenship").notNull(),
  currentCountry: text("current_country").notNull(),
  hasSpouse: boolean("has_spouse").notNull().default(false),
  spouseFullName: text("spouse_full_name"),
  spouseBirthdate: date("spouse_birthdate"),
  
  // Education details
  educationLevel: educationLevelEnum("education_level"),
  educationCountry: text("education_country"),
  educationYears: integer("education_years"),
  hasCanadianEducation: boolean("has_canadian_education").default(false),
  canadianEducationLevel: educationLevelEnum("canadian_education_level"),
  canadianEducationYears: integer("canadian_education_years"),
  
  // Primary language (English/French)
  primaryLanguage: text("primary_language"),
  primaryLanguageTest: languageTestEnum("primary_language_test"),
  primaryLanguageListening: integer("primary_language_listening"),
  primaryLanguageSpeaking: integer("primary_language_speaking"),
  primaryLanguageReading: integer("primary_language_reading"),
  primaryLanguageWriting: integer("primary_language_writing"),
  
  // Secondary language (if applicable)
  hasSecondaryLanguage: boolean("has_secondary_language").default(false),
  secondaryLanguage: text("secondary_language"),
  secondaryLanguageTest: languageTestEnum("secondary_language_test"),
  secondaryLanguageListening: integer("secondary_language_listening"),
  secondaryLanguageSpeaking: integer("secondary_language_speaking"),
  secondaryLanguageReading: integer("secondary_language_reading"),
  secondaryLanguageWriting: integer("secondary_language_writing"),
  
  // Canadian work experience
  hasCanadianWorkExperience: boolean("has_canadian_work_experience").default(false),
  canadianWorkExperienceYears: integer("canadian_work_experience_years"),
  canadianNocCodes: text("canadian_noc_codes").array(),
  
  // Foreign work experience
  hasForeignWorkExperience: boolean("has_foreign_work_experience").default(false),
  foreignWorkExperienceYears: integer("foreign_work_experience_years"),
  foreignNocCodes: text("foreign_noc_codes").array(),

  // Additional factors
  hasProvincialNomination: boolean("has_provincial_nomination").default(false),
  hasValidJobOffer: boolean("has_valid_job_offer").default(false),
  jobOfferNocCode: text("job_offer_noc_code"),
  hasSiblingInCanada: boolean("has_sibling_in_canada").default(false),
  
  // Free text for profile analysis
  profileDescription: text("profile_description"),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRS Results table
export const crsResults = pgTable("crs_results", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => crsProfiles.id),
  
  // Score breakdown
  coreHumanCapitalPoints: integer("core_human_capital_points").notNull(),
  spouseFactorsPoints: integer("spouse_factors_points").notNull(),
  skillTransferabilityPoints: integer("skill_transferability_points").notNull(),
  additionalPoints: integer("additional_points").notNull(),
  totalCrsScore: integer("total_crs_score").notNull(),
  
  // Analysis results
  eligibility: text("eligibility").notNull(),
  recommendations: json("recommendations").notNull(),
  provincialOptions: json("provincial_options").notNull(),
  
  // CRS cutoff at the time of calculation
  crsCutoff: integer("crs_cutoff").notNull(),
  
  // AI Analysis summary
  aiAnalysisSummary: text("ai_analysis_summary"),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRS Profile insert schema
export const insertCrsProfileSchema = createInsertSchema(crsProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// CRS Result insert schema
export const insertCrsResultSchema = createInsertSchema(crsResults).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CrsProfile = typeof crsProfiles.$inferSelect;
export type InsertCrsProfile = z.infer<typeof insertCrsProfileSchema>;

export type CrsResult = typeof crsResults.$inferSelect;
export type InsertCrsResult = z.infer<typeof insertCrsResultSchema>;
