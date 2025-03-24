"use client";

import { ArrowLeft, Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data for demonstration - will be replaced with actual calculation in step 005
const mockResults = {
  totalScore: 456,
  breakdown: {
    coreHumanCapital: 318,
    spouseFactors: 20,
    skillTransferability: 50,
    additionalPoints: 68,
  },
  detailedBreakdown: {
    age: 110,
    education: 120,
    languageProficiency: {
      firstLanguage: 64,
      secondLanguage: 24,
    },
    canadianWorkExperience: 40,
    spouseEducation: 5,
    spouseLanguage: 10,
    spouseWorkExperience: 5,
    educationTransferability: 25,
    foreignWorkExperience: 25,
    provincialNomination: 0,
    jobOffer: 50,
    canadianEducation: 0,
    frenchLanguageSkills: 0,
    sibling: 15,
  },
  recentDraws: [
    { date: "March 21, 2025", type: "French language proficiency", score: 379, invitations: 7500 },
    { date: "March 14, 2025", type: "Provincial Nominee Program", score: 736, invitations: 536 },
    { date: "March 7, 2025", type: "General", score: 485, invitations: 5000 },
    { date: "February 28, 2025", type: "Healthcare occupations", score: 431, invitations: 3500 },
    { date: "February 21, 2025", type: "STEM occupations", score: 462, invitations: 3000 },
  ],
  recommendedPathways: [
    {
      name: "Express Entry - Federal Skilled Worker",
      eligibility: "Eligible",
      score: 456,
      description: "You meet all the minimum requirements for the Federal Skilled Worker program.",
      nextSteps: [
        "Create an Express Entry profile",
        "Wait for an invitation to apply",
        "Submit a complete application within 60 days of invitation",
      ],
    },
    {
      name: "Express Entry - Canadian Experience Class",
      eligibility: "Not Eligible",
      score: "N/A",
      description: "You need at least 1 year of skilled work experience in Canada within the last 3 years.",
      nextSteps: [
        "Gain at least 1 year of skilled work experience in Canada",
        "Ensure your language scores meet the minimum requirements",
      ],
    },
    {
      name: "Provincial Nominee Program - Ontario Skilled Worker",
      eligibility: "Potentially Eligible",
      score: 456,
      description: "You may qualify for nomination from Ontario based on your skills and experience.",
      nextSteps: [
        "Create an Express Entry profile",
        "Indicate interest in Ontario",
        "Wait for a Notification of Interest from Ontario",
      ],
    },
    {
      name: "Provincial Nominee Program - British Columbia Tech",
      eligibility: "Potentially Eligible",
      score: 456,
      description: "If you have experience in tech occupations, you may qualify for BC's Tech stream.",
      nextSteps: [
        "Verify your occupation is on BC's tech occupations list",
        "Create an Express Entry profile",
        "Apply directly to BC PNP Tech stream",
      ],
    },
    {
      name: "Provincial Nominee Program - Alberta Advantage",
      eligibility: "Potentially Eligible",
      score: 456,
      description: "Alberta often nominates candidates with lower CRS scores who have ties to Alberta.",
      nextSteps: [
        "Create an Express Entry profile",
        "Indicate interest in Alberta",
        "Demonstrate ties to Alberta if possible",
      ],
    },
  ],
  improvementSuggestions: [
    {
      category: "Language",
      suggestion: "Improve your French language skills",
      potentialPoints: 50,
      description: "You can earn up to 50 additional points by achieving NCLC 7 or higher in all French abilities.",
    },
    {
      category: "Education",
      suggestion: "Obtain Canadian educational credentials",
      potentialPoints: 30,
      description: "Complete a program of at least 3 years at a Canadian institution to earn 30 additional points.",
    },
    {
      category: "Work Experience",
      suggestion: "Gain additional Canadian work experience",
      potentialPoints: 40,
      description: "With 3 or more years of Canadian work experience, you can earn up to 80 points in this category.",
    },
    {
      category: "Provincial Nomination",
      suggestion: "Secure a provincial nomination",
      potentialPoints: 600,
      description: "A provincial nomination adds 600 points to your CRS score, virtually guaranteeing an invitation to apply.",
    },
    {
      category: "Job Offer",
      suggestion: "Obtain a valid job offer in Canada",
      potentialPoints: 200,
      description: "A job offer in TEER 0 occupations can add up to 200 points to your score.",
    },
  ],
};

export default function Results() {
  const [expandedSections, setExpandedSections] = useState({
    scoreBreakdown: true,
    recentDraws: true,
    pathways: true,
    improvements: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/calculator"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculator
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Your CRS Score</h1>
        <div className="flex justify-center mb-6">
          <div className="text-6xl font-bold text-blue-600">
            {mockResults.totalScore}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Core/Human Capital</p>
            <p className="text-xl font-semibold">{mockResults.breakdown.coreHumanCapital}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Spouse Factors</p>
            <p className="text-xl font-semibold">{mockResults.breakdown.spouseFactors}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Skill Transferability</p>
            <p className="text-xl font-semibold">{mockResults.breakdown.skillTransferability}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Additional Points</p>
            <p className="text-xl font-semibold">{mockResults.breakdown.additionalPoints}</p>
          </div>
        </div>

        {/* Score Breakdown Section */}
        <div className="border rounded-lg mb-6">
          <button
            className="w-full flex justify-between items-center p-4 font-semibold"
            onClick={() => toggleSection("scoreBreakdown")}
          >
            Detailed Score Breakdown
            {expandedSections.scoreBreakdown ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {expandedSections.scoreBreakdown && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Core/Human Capital Factors</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Age</span>
                      <span>{mockResults.detailedBreakdown.age}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Education</span>
                      <span>{mockResults.detailedBreakdown.education}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>First Official Language</span>
                      <span>{mockResults.detailedBreakdown.languageProficiency.firstLanguage}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Second Official Language</span>
                      <span>{mockResults.detailedBreakdown.languageProficiency.secondLanguage}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Canadian Work Experience</span>
                      <span>{mockResults.detailedBreakdown.canadianWorkExperience}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Spouse Factors</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Education</span>
                      <span>{mockResults.detailedBreakdown.spouseEducation}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Language Proficiency</span>
                      <span>{mockResults.detailedBreakdown.spouseLanguage}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Canadian Work Experience</span>
                      <span>{mockResults.detailedBreakdown.spouseWorkExperience}</span>
                    </li>
                  </ul>

                  <h3 className="font-semibold mt-4 mb-2">Skill Transferability</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Education + Language/Experience</span>
                      <span>{mockResults.detailedBreakdown.educationTransferability}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Foreign Work Experience</span>
                      <span>{mockResults.detailedBreakdown.foreignWorkExperience}</span>
                    </li>
                  </ul>

                  <h3 className="font-semibold mt-4 mb-2">Additional Points</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Provincial Nomination</span>
                      <span>{mockResults.detailedBreakdown.provincialNomination}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Job Offer</span>
                      <span>{mockResults.detailedBreakdown.jobOffer}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Canadian Education</span>
                      <span>{mockResults.detailedBreakdown.canadianEducation}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>French Language Skills</span>
                      <span>{mockResults.detailedBreakdown.frenchLanguageSkills}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sibling in Canada</span>
                      <span>{mockResults.detailedBreakdown.sibling}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Draws Section */}
        <div className="border rounded-lg mb-6">
          <button
            className="w-full flex justify-between items-center p-4 font-semibold"
            onClick={() => toggleSection("recentDraws")}
          >
            Recent Express Entry Draws
            {expandedSections.recentDraws ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {expandedSections.recentDraws && (
            <div className="p-4 border-t overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Draw Type</th>
                    <th className="px-4 py-2 text-right">Minimum Score</th>
                    <th className="px-4 py-2 text-right">Invitations</th>
                    <th className="px-4 py-2 text-center">Your Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.recentDraws.map((draw, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{draw.date}</td>
                      <td className="px-4 py-2">{draw.type}</td>
                      <td className="px-4 py-2 text-right">{draw.score}</td>
                      <td className="px-4 py-2 text-right">{draw.invitations}</td>
                      <td className="px-4 py-2 text-center">
                        {mockResults.totalScore >= draw.score ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Eligible
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Not Eligible
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recommended Pathways Section */}
        <div className="border rounded-lg mb-6">
          <button
            className="w-full flex justify-between items-center p-4 font-semibold"
            onClick={() => toggleSection("pathways")}
          >
            Top 5 Immigration Pathways
            {expandedSections.pathways ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {expandedSections.pathways && (
            <div className="p-4 border-t">
              <div className="space-y-6">
                {mockResults.recommendedPathways.map((pathway, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{pathway.name}</h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          pathway.eligibility === "Eligible"
                            ? "bg-green-100 text-green-800"
                            : pathway.eligibility === "Potentially Eligible"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pathway.eligibility}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{pathway.description}</p>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        CRS Score: {pathway.score}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Next Steps:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {pathway.nextSteps.map((step, stepIndex) => (
            <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>