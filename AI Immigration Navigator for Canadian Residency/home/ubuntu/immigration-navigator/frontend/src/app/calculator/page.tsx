"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const steps = [
  "Personal Info",
  "Education",
  "Language",
  "Work Experience",
  "Additional Factors",
];

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    age: "",
    maritalStatus: "",
    spouseComingToCanada: false,
    
    // Education
    educationLevel: "",
    canadianEducation: false,
    canadianEducationLevel: "",
    
    // Language
    firstLanguage: "english",
    englishReading: "",
    englishWriting: "",
    englishSpeaking: "",
    englishListening: "",
    frenchReading: "",
    frenchWriting: "",
    frenchSpeaking: "",
    frenchListening: "",
    
    // Work Experience
    canadianWorkExperience: "",
    foreignWorkExperience: "",
    
    // Additional Factors
    provincialNomination: false,
    jobOffer: false,
    jobOfferNOC: "",
    canadianSibling: false,
    frenchEducation: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateScore = () => {
    // This will be implemented in step 005
    console.log("Calculating score with data:", formData);
    // Navigate to results page
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-12">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${
              currentStep === i + 1
                ? "active"
                : currentStep > i + 1
                ? "complete"
                : ""
            }`}
          >
            <div className="step">
              {currentStep > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
            </div>
            <p className="text-sm mt-2">{step}</p>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg p-6 mb-8">
        {currentStep === 1 && (
          <div className="personal-info">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                How old are you?
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
              >
                <option value="">Select your age</option>
                {Array.from({ length: 33 }, (_, i) => i + 18).map((age) => (
                  <option key={age} value={age}>
                    {age} years
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                What is your marital status?
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.maritalStatus}
                onChange={(e) => updateFormData("maritalStatus", e.target.value)}
              >
                <option value="">Select your marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="common-law">Common-Law</option>
                <option value="separated">Separated</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            {(formData.maritalStatus === "married" ||
              formData.maritalStatus === "common-law") && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Is your spouse/partner coming with you to Canada?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="spouseComingToCanada"
                      checked={formData.spouseComingToCanada === true}
                      onChange={() =>
                        updateFormData("spouseComingToCanada", true)
                      }
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="spouseComingToCanada"
                      checked={formData.spouseComingToCanada === false}
                      onChange={() =>
                        updateFormData("spouseComingToCanada", false)
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="education">
            <h2 className="text-xl font-semibold mb-6">Education</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                What is your highest level of education?
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.educationLevel}
                onChange={(e) => updateFormData("educationLevel", e.target.value)}
              >
                <option value="">Select your education level</option>
                <option value="less-than-secondary">Less than secondary school</option>
                <option value="secondary">Secondary diploma (high school)</option>
                <option value="one-year">One-year degree, diploma or certificate</option>
                <option value="two-year">Two-year program</option>
                <option value="bachelors">Bachelor's degree</option>
                <option value="two-or-more">Two or more certificates, diplomas, or degrees</option>
                <option value="masters">Master's degree</option>
                <option value="doctoral">Doctoral degree (Ph.D.)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Do you have any education from a Canadian institution?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="canadianEducation"
                    checked={formData.canadianEducation === true}
                    onChange={() => updateFormData("canadianEducation", true)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="canadianEducation"
                    checked={formData.canadianEducation === false}
                    onChange={() => updateFormData("canadianEducation", false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.canadianEducation && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  What is your Canadian education level?
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.canadianEducationLevel}
                  onChange={(e) =>
                    updateFormData("canadianEducationLevel", e.target.value)
                  }
                >
                  <option value="">Select your Canadian education level</option>
                  <option value="one-or-two-year">One or two-year diploma or certificate</option>
                  <option value="three-year">Three-year or longer program</option>
                </select>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="language">
            <h2 className="text-xl font-semibold mb-6">Language Proficiency</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                What is your first official language?
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.firstLanguage}
                onChange={(e) => updateFormData("firstLanguage", e.target.value)}
              >
                <option value="english">English</option>
                <option value="french">French</option>
              </select>
            </div>

            <h3 className="font-medium mt-6 mb-3">English Language Proficiency (CLB)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Reading</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.englishReading}
                  onChange={(e) => updateFormData("englishReading", e.target.value)}
                >
                  <option value="">Select CLB level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      CLB {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Writing</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.englishWriting}
                  onChange={(e) => updateFormData("englishWriting", e.target.value)}
                >
                  <option value="">Select CLB level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      CLB {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Speaking</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.englishSpeaking}
                  onChange={(e) => updateFormData("englishSpeaking", e.target.value)}
                >
                  <option value="">Select CLB level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      CLB {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Listening</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.englishListening}
                  onChange={(e) => updateFormData("englishListening", e.target.value)}
                >
                  <option value="">Select CLB level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      CLB {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h3 className="font-medium mt-6 mb-3">French Language Proficiency (NCLC)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Reading</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.frenchReading}
                  onChange={(e) => updateFormData("frenchReading", e.target.value)}
                >
                  <option value="">Select NCLC level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      NCLC {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Writing</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.frenchWriting}
                  onChange={(e) => updateFormData("frenchWriting", e.target.value)}
                >
                  <option value="">Select NCLC level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      NCLC {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Speaking</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.frenchSpeaking}
                  onChange={(e) => updateFormData("frenchSpeaking", e.target.value)}
                >
                  <option value="">Select NCLC level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      NCLC {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Listening</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.frenchListening}
                  onChange={(e) => updateFormData("frenchListening", e.target.value)}
                >
                  <option value="">Select NCLC level</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      NCLC {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="work-experience">
            <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                How many years of Canadian work experience do you have?
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.canadianWorkExperience}
                onChange={(e) => updateFormData("canadianWorkExperience", e.target.value)}
              >
                <option value="">Select years of experience</option>
                <option value="0">None</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <opt<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>