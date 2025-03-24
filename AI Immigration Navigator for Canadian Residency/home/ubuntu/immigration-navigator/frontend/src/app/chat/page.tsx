"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Immigration Navigator AI assistant. I can answer questions about your CRS score, immigration pathways, and provide guidance on improving your chances. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sample responses based on user queries
  const generateResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // CRS score related questions
    if (lowerCaseMessage.includes("crs") || lowerCaseMessage.includes("score")) {
      if (lowerCaseMessage.includes("improve") || lowerCaseMessage.includes("increase")) {
        return "There are several ways to improve your CRS score:\n\n1. Improve your language test results (IELTS/CELPIP for English or TEF/TCF for French)\n2. Gain additional work experience, especially in Canada\n3. Obtain higher education credentials or Canadian education\n4. Secure a provincial nomination (worth 600 points)\n5. Obtain a valid job offer from a Canadian employer\n6. Improve your spouse's factors if applicable\n\nWhich of these would you like more information about?";
      }
      if (lowerCaseMessage.includes("calculate") || lowerCaseMessage.includes("how is") || lowerCaseMessage.includes("what is")) {
        return "The Comprehensive Ranking System (CRS) score is calculated based on several factors:\n\n- Core/Human Capital Factors (age, education, language skills, Canadian work experience)\n- Spouse Factors (if applicable)\n- Skill Transferability Factors (education + language/work experience combinations)\n- Additional Points (provincial nomination, job offer, Canadian education, etc.)\n\nThe maximum score is 1,200 points. Your specific score is calculated based on the information you provided in the calculator section of this application.";
      }
      return "Your CRS score is calculated based on factors like age, education, language proficiency, work experience, and additional factors. The current cutoff scores for Express Entry draws typically range from 450-500 for general draws, though program-specific draws may have lower thresholds. Would you like specific advice on improving your score?";
    }
    
    // Express Entry related questions
    if (lowerCaseMessage.includes("express entry") || lowerCaseMessage.includes("federal")) {
      if (lowerCaseMessage.includes("draw") || lowerCaseMessage.includes("invitation")) {
        return "Express Entry draws typically occur every two weeks. Recent draws have had cutoff scores ranging from 431 to 485 for general draws, with program-specific draws sometimes having lower thresholds. The number of invitations per draw has ranged from 500 to 7,500 depending on the draw type. You can check the latest draw information on the IRCC website.";
      }
      if (lowerCaseMessage.includes("program") || lowerCaseMessage.includes("fsw") || lowerCaseMessage.includes("cec") || lowerCaseMessage.includes("fst")) {
        return "Express Entry manages three federal immigration programs:\n\n1. Federal Skilled Worker Program (FSWP) - for skilled workers with foreign work experience\n2. Canadian Experience Class (CEC) - for people with Canadian work experience\n3. Federal Skilled Trades Program (FSTP) - for skilled trades workers\n\nEach program has specific eligibility requirements. Based on your profile, the system has evaluated your eligibility for these programs in the recommendations section.";
      }
      return "Express Entry is Canada's application management system for skilled immigrants. It uses the Comprehensive Ranking System (CRS) to rank candidates, and the highest-ranking candidates receive Invitations to Apply (ITAs) for permanent residence through regular draws. Would you like to know more about specific Express Entry programs or recent draw trends?";
    }
    
    // Provincial Nominee Program related questions
    if (lowerCaseMessage.includes("pnp") || lowerCaseMessage.includes("provincial") || lowerCaseMessage.includes("nomination")) {
      if (lowerCaseMessage.includes("points") || lowerCaseMessage.includes("worth")) {
        return "A provincial nomination adds 600 points to your CRS score, which virtually guarantees an invitation to apply in the next Express Entry draw. This is the single largest points boost available in the CRS system.";
      }
      if (lowerCaseMessage.includes("how") || lowerCaseMessage.includes("get") || lowerCaseMessage.includes("apply")) {
        return "To obtain a provincial nomination, you generally need to:\n\n1. Identify a province where your skills and experience are in demand\n2. Check if you meet the eligibility criteria for that province's streams\n3. Apply directly to the province (for base PNP streams) or\n4. Create an Express Entry profile and indicate interest in specific provinces (for Express Entry-aligned streams)\n5. Receive a Notification of Interest from the province (for Express Entry-aligned streams)\n6. Submit a complete application to the province\n7. If approved, receive a nomination certificate\n\nEach province has different streams and requirements. Based on your profile, the system has suggested potential provincial pathways in the recommendations section.";
      }
      return "Provincial Nominee Programs (PNPs) allow Canadian provinces and territories to nominate individuals who wish to immigrate to Canada and who are interested in settling in a particular province. Each province has its own streams and criteria for nomination. A provincial nomination adds 600 points to your CRS score. Would you like information about a specific provincial program?";
    }
    
    // Language test related questions
    if (lowerCaseMessage.includes("language") || lowerCaseMessage.includes("ielts") || lowerCaseMessage.includes("celpip") || lowerCaseMessage.includes("french")) {
      if (lowerCaseMessage.includes("test") || lowerCaseMessage.includes("exam") || lowerCaseMessage.includes("which")) {
        return "Canada accepts these language tests for immigration purposes:\n\nFor English:\n- IELTS (General Training)\n- CELPIP (General)\n\nFor French:\n- TEF Canada\n- TCF Canada\n\nTest results are valid for 2 years from the date of the test. You need to take the test before submitting your Express Entry profile.";
      }
      if (lowerCaseMessage.includes("score") || lowerCaseMessage.includes("clb") || lowerCaseMessage.includes("level")) {
        return "Language proficiency is measured using the Canadian Language Benchmarks (CLB) for English or Niveaux de compétence linguistique canadiens (NCLC) for French. Most Express Entry programs require a minimum of CLB 7 (equivalent to IELTS scores of 6.0 in each ability). Higher language scores significantly increase your CRS points. For example, CLB 9 or higher in all abilities can earn you up to 136 points (for a single applicant) in the core human capital factors.";
      }
      return "Language proficiency is one of the most important factors in the CRS score calculation. You can earn up to 136 points (for a single applicant) for your first official language and up to 24 points for your second official language. Improving your language scores is often the quickest way to increase your CRS score. Would you like specific information about language tests or how scores are converted to CLB/NCLC levels?";
    }
    
    // Education related questions
    if (lowerCaseMessage.includes("education") || lowerCaseMessage.includes("degree") || lowerCaseMessage.includes("credential") || lowerCaseMessage.includes("eca")) {
      if (lowerCaseMessage.includes("eca") || lowerCaseMessage.includes("assessment") || lowerCaseMessage.includes("foreign")) {
        return "If you completed your education outside Canada, you need an Educational Credential Assessment (ECA) to verify that your foreign credential is valid and equivalent to a Canadian credential. There are several organizations designated by IRCC to provide ECAs, including WES, ICAS, and others. The ECA report is valid for 5 years.";
      }
      if (lowerCaseMessage.includes("canadian") || lowerCaseMessage.includes("study")) {
        return "Studying in Canada can help your immigration prospects in several ways:\n\n1. You can earn up to 30 additional CRS points for Canadian education\n2. You may become eligible for the Canadian Experience Class after working in Canada\n3. Many provinces have PNP streams specifically for international graduates\n4. You can get a Post-Graduation Work Permit (PGWP) to gain Canadian work experience\n\nPrograms must be at least 8 months long at a designated learning institution to qualify for immigration benefits.";
      }
      return "Education is an important factor in the CRS score calculation. You can earn up to 150 points for your education level, and additional points through skill transferability combinations. Foreign credentials need to be assessed through an Educational Credential Assessment (ECA) to be recognized. Canadian education credentials can earn you additional points. Would you like more specific information about education requirements or assessments?";
    }
    
    // Work experience related questions
    if (lowerCaseMessage.includes("work experience") || lowerCaseMessage.includes("job") || lowerCaseMessage.includes("employment")) {
      if (lowerCaseMessage.includes("canadian") || lowerCaseMessage.includes("in canada")) {
        return "Canadian work experience is highly valued in the immigration system. You can earn up to 80 points for Canadian work experience in the core CRS factors, plus additional points through skill transferability combinations. To qualify, work must be:\n\n- In Canada with proper authorization\n- Paid (volunteer work doesn't count)\n- In NOC TEER 0, 1, 2, or 3 occupations\n- At least 30 hours per week (or equivalent part-time)\n\nOne year of Canadian work experience also makes you eligible for the Canadian Experience Class.";
      }
      if (lowerCaseMessage.includes("foreign") || lowerCaseMessage.includes("outside")) {
        return "Foreign work experience can earn you points through skill transferability combinations when combined with strong language skills or Canadian work experience. To qualify, work must be:\n\n- Paid (volunteer work doesn't count)\n- In NOC TEER 0, 1, 2, or 3 occupations\n- At least 30 hours per week (or equivalent part-time)\n\nForeign work experience alone provides fewer points than Canadian work experience but can still be valuable for your application.";
      }
      return "Work experience is an important factor in the CRS score calculation and program eligibility. Canadian work experience is particularly valuable, earning up to 80 points in core factors plus additional points in skill transferability. Foreign work experience can also earn points when combined with other factors. Work must be in skilled occupations (TEER 0, 1, 2, or 3) to qualify. Would you like specific information about Canadian or foreign work experience requirements?";
    }
    
    // Job offer related questions
    if (lowerCaseMessage.includes("job offer") || lowerCaseMessage.includes("lmia")) {
      if (lowerCaseMessage.includes("points") || lowerCaseMessage.includes("worth")) {
        return "A valid job offer can add 50 or 200 points to your CRS score:\n\n- 200 points for senior management positions (TEER 0 / NOC 00)\n- 50 points for all other TEER 0, 1, 2, or 3 occupations\n\nTo be valid for CRS points, most job offers require a Labour Market Impact Assessment (LMIA) and must be for at least one year of full-time work after you receive permanent residence.";
      }
      if (lowerCaseMessage.includes("how") || lowerCaseMessage.includes("get") || lowerCaseMessage.includes("find")) {
        return "Finding a job offer in Canada can be challenging but is possible through various approaches:\n\n1. Job search websites like Indeed, LinkedIn, and Canada Job Bank\n2. Networking with professionals in your field\n3. Working with recruitment agencies specializing in your industry\n4. Attending virtual job fairs for international candidates\n5. Exploring employer-specific immigration programs\n\nMost employers will need to obtain a Labour Market Impact Assessment (LMIA) to hire foreign workers, which proves no Canadian citizen or permanent resident is available for the position.";
      }
      return "A valid job offer can add 50 or 200 points to your CRS score, depending on the occupation level. To be valid for immigration purposes, most job offers require a Labour Market Impact Assessment (LMIA) and must be for at least one year of full-time work. Some job offers may be LMIA-exempt under specific international agreements or intra-company transfers. Would you like more information about finding job offers or LMIA requirements?";
    }
    
    // Age related questions
    if (lowerCaseMessage.includes("age")) {
      return "Age is an important factor in the CRS score calculation. The maximum points (100-110 depending on marital status) are awarded to candidates aged 20-29. Points decrease gradually for candidates aged 30 and above, with no points awarded after age 45. Unfortunately, age is one factor you cannot change or improve, so it's advisable to apply as early as possible if immigration is your goal.";
    }
    
    // Application process related questions
    if (lowerCaseMessage.includes("process") || lowerCaseMessage.includes("apply") || lowerCaseMessage.includes("application") || lowerCaseMessage.includes("timeline")) {
      return "The Express Entry application process involves these main steps:\n\n1. Determine your eligibility for one of the federal programs\n2. Create an Express Entry profile\n3. Receive an Invitation to Apply (ITA) if your CRS score is high enough\n4. Submit a complete application for permanent residence within 60 days\n5. Undergo medical exams and provide police certificates\n6. Wait for application processing (typically 6-8 months)\n7. If approved, receive Confirmation of Permanent Residence (COPR)\n8. Move to Canada before your COPR expires\n\nThe entire process from creating a profile to becoming a permanent resident typically takes 6-12 months, though processing times can vary.";
    }
    
    // Costs related questions
    if (lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("fee") || lowerCaseMessage.includes("money") || lowerCaseMessage.includes("pay")) {
      return "The main costs associated with Express Entry immigration include:\n\n- Express Entry application fee: $1,325 CAD per adult applicant, $225 CAD per dependent child\n- Right of Permanent Residence Fee: $500 CAD per adult\n- Language tests: $200-$320 CAD depending on the test\n- Educational Credential Assessment: $200-$300 CAD\n- Medical examination: $200-$300 CAD per person\n- Police certificates: varies by country\n- Biometrics fee: $85 CAD per person\n\nAdditionally, you need to show proof of settlement funds (unless you have a valid job offer or are already working in Canada). For a single applicant, this is approximately $13,757 CAD (as of 2023, subject to change).";
    }
    
    // Default response for other queries
    return "Thank you for your question. I can provide information about Canadian immigration programs, CRS scoring, Express Entry, Provincial Nominee Programs, and application processes. Could you please clarify what sp<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>