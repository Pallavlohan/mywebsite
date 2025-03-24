import { FormStep } from "@shared/types";
import { useCrsForm } from "../hooks/useCrsForm";
import { cn } from "@/lib/utils";
import React from "react";

interface FormStepperProps {
  currentStep: FormStep;
}

export default function FormStepper({ currentStep }: FormStepperProps) {
  const { formState } = useCrsForm();
  
  const steps = [
    { id: FormStep.PersonalInfo, name: "Personal Info" },
    { id: FormStep.Education, name: "Education" },
    { id: FormStep.Language, name: "Language" },
    { id: FormStep.WorkExperience, name: "Work Experience" },
    { id: FormStep.Results, name: "Results" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.flatMap((step, index) => [
          <div key={`step-${step.id}`} className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full mb-2",
                {
                  "bg-primary text-white": step.id === currentStep,
                  "bg-green-500 text-white": step.id < currentStep,
                  "bg-neutral-300 text-neutral-600": step.id > currentStep,
                }
              )}
            >
              {step.id < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className="text-sm font-medium">{step.name}</span>
          </div>,
          index < steps.length - 1 ? (
            <div key={`divider-${step.id}`} className="h-1 flex-grow bg-neutral-300 mx-2"></div>
          ) : null
        ])}
      </div>
    </div>
  );
}
