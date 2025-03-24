import { useState } from "react";
import FormStepper from "../components/FormStepper";
import { FormStep } from "@shared/types";
import { useCrsForm } from "../hooks/useCrsForm";

import PersonalInfoForm from "../components/crs/PersonalInfoForm";
import EducationForm from "../components/crs/EducationForm";
import LanguageForm from "../components/crs/LanguageForm";
import WorkExperienceForm from "../components/crs/WorkExperienceForm";
import ResultsDashboard from "../components/crs/ResultsDashboard";

export default function Calculator() {
  const { currentStep, formState } = useCrsForm();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Calculate Your CRS Score
      </h1>
      
      {/* Form Stepper */}
      <FormStepper currentStep={currentStep} />
      
      {/* Forms Container */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        {currentStep === FormStep.PersonalInfo && <PersonalInfoForm />}
        {currentStep === FormStep.Education && <EducationForm />}
        {currentStep === FormStep.Language && <LanguageForm />}
        {currentStep === FormStep.WorkExperience && <WorkExperienceForm />}
        {currentStep === FormStep.Results && <ResultsDashboard />}
      </div>
    </div>
  );
}
