import React, { createContext, useContext, useState, useReducer } from "react";
import { FormStep } from "@shared/types";

// Form state interface
interface FormState {
  // Personal Info
  fullName: string;
  email: string;
  birthdate: string;
  maritalStatus: string;
  countryOfCitizenship: string;
  currentCountry: string;
  hasSpouse: boolean;
  spouseFullName: string;
  spouseBirthdate: string;
  
  // Education
  educationLevel: string;
  educationCountry: string;
  educationYears: number;
  hasCanadianEducation: boolean;
  canadianEducationLevel: string;
  canadianEducationYears: number;
  
  // Primary Language
  primaryLanguage: string;
  primaryLanguageTest: string;
  primaryLanguageListening: number;
  primaryLanguageSpeaking: number;
  primaryLanguageReading: number;
  primaryLanguageWriting: number;
  
  // Secondary Language
  hasSecondaryLanguage: boolean;
  secondaryLanguage: string;
  secondaryLanguageTest: string;
  secondaryLanguageListening: number;
  secondaryLanguageSpeaking: number;
  secondaryLanguageReading: number;
  secondaryLanguageWriting: number;
  
  // Work Experience
  hasCanadianWorkExperience: boolean;
  canadianWorkExperienceYears: number;
  canadianNocCodes: string[];
  
  hasForeignWorkExperience: boolean;
  foreignWorkExperienceYears: number;
  foreignNocCodes: string[];
  
  // Additional factors
  hasProvincialNomination: boolean;
  hasValidJobOffer: boolean;
  jobOfferNocCode: string;
  hasSiblingInCanada: boolean;
  
  // Additional profile analysis
  profileDescription: string;
}

// Initial state
const initialFormState: FormState = {
  fullName: "",
  email: "",
  birthdate: "",
  maritalStatus: "",
  countryOfCitizenship: "",
  currentCountry: "",
  hasSpouse: false,
  spouseFullName: "",
  spouseBirthdate: "",
  
  educationLevel: "",
  educationCountry: "",
  educationYears: 0,
  hasCanadianEducation: false,
  canadianEducationLevel: "",
  canadianEducationYears: 0,
  
  primaryLanguage: "",
  primaryLanguageTest: "",
  primaryLanguageListening: 0,
  primaryLanguageSpeaking: 0,
  primaryLanguageReading: 0,
  primaryLanguageWriting: 0,
  
  hasSecondaryLanguage: false,
  secondaryLanguage: "",
  secondaryLanguageTest: "",
  secondaryLanguageListening: 0,
  secondaryLanguageSpeaking: 0,
  secondaryLanguageReading: 0,
  secondaryLanguageWriting: 0,
  
  hasCanadianWorkExperience: false,
  canadianWorkExperienceYears: 0,
  canadianNocCodes: [],
  
  hasForeignWorkExperience: false,
  foreignWorkExperienceYears: 0,
  foreignNocCodes: [],
  
  hasProvincialNomination: false,
  hasValidJobOffer: false,
  jobOfferNocCode: "",
  hasSiblingInCanada: false,
  
  profileDescription: ""
};

// Action types
type FormAction = 
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<FormState> }
  | { type: "UPDATE_EDUCATION"; payload: Partial<FormState> }
  | { type: "UPDATE_LANGUAGE"; payload: Partial<FormState> }
  | { type: "UPDATE_WORK_EXPERIENCE"; payload: Partial<FormState> }
  | { type: "RESET_FORM" };

// Reducer for form state
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return { ...state, ...action.payload };
    case "UPDATE_EDUCATION":
      return { ...state, ...action.payload };
    case "UPDATE_LANGUAGE":
      return { ...state, ...action.payload };
    case "UPDATE_WORK_EXPERIENCE":
      return { ...state, ...action.payload };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

// Context interface
interface CrsFormContextType {
  formState: FormState;
  currentStep: FormStep;
  crsResult: any | null;
  isCalculating: boolean;
  updatePersonalInfo: (data: Partial<FormState>) => void;
  updateEducation: (data: Partial<FormState>) => void;
  updateLanguage: (data: Partial<FormState>) => void;
  updateWorkExperience: (data: Partial<FormState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: FormStep) => void;
  resetForm: () => void;
  setCrsResult: (result: any) => void;
  setIsCalculating: (isCalculating: boolean) => void;
}

// Create context
const CrsFormContext = createContext<CrsFormContextType | undefined>(undefined);

// Provider component
export const CrsFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PersonalInfo);
  const [crsResult, setCrsResult] = useState<any | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const updatePersonalInfo = (data: Partial<FormState>) => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: data });
  };

  const updateEducation = (data: Partial<FormState>) => {
    dispatch({ type: "UPDATE_EDUCATION", payload: data });
  };

  const updateLanguage = (data: Partial<FormState>) => {
    dispatch({ type: "UPDATE_LANGUAGE", payload: data });
  };

  const updateWorkExperience = (data: Partial<FormState>) => {
    dispatch({ type: "UPDATE_WORK_EXPERIENCE", payload: data });
  };

  const goToNextStep = () => {
    if (currentStep < FormStep.Results) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > FormStep.PersonalInfo) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    setCurrentStep(FormStep.PersonalInfo);
    setCrsResult(null);
  };

  return (
    <CrsFormContext.Provider
      value={{
        formState,
        currentStep,
        crsResult,
        isCalculating,
        updatePersonalInfo,
        updateEducation,
        updateLanguage,
        updateWorkExperience,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        resetForm,
        setCrsResult,
        setIsCalculating
      }}
    >
      {children}
    </CrsFormContext.Provider>
  );
};

// Hook for using the CRS form context
export const useCrsForm = () => {
  const context = useContext(CrsFormContext);
  if (context === undefined) {
    throw new Error("useCrsForm must be used within a CrsFormProvider");
  }
  return context;
};
