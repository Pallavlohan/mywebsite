import { COUNTRIES, EDUCATION_LEVELS, LANGUAGE_TESTS, PROVINCES, NOC_CATEGORIES } from "@shared/constants";

// Age range for form selection
export const AGE_RANGE = Array.from({ length: 43 }, (_, i) => i + 18);

// Marital status options
export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married or Common-Law Partner" },
  { value: "separated", label: "Separated" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" }
];

// Language options
export const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "French", label: "French" }
];

// Language score ranges
export const LANGUAGE_SCORE_RANGES = {
  IELTS: {
    listening: ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"],
    speaking: ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"],
    reading: ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"],
    writing: ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"]
  },
  CELPIP: {
    listening: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    speaking: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    reading: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    writing: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  },
  TEF: {
    listening: ["0-144", "145-180", "181-216", "217-248", "249-279", "280-297", "298-315", "316-333", "334-352", "353-398"],
    speaking: ["0-180", "181-225", "226-270", "271-309", "310-348", "349-370", "371-392", "393-415", "416-436", "437-450"],
    reading: ["0-120", "121-150", "151-180", "181-205", "206-232", "233-247", "248-262", "263-277", "278-298", "299-360"],
    writing: ["0-180", "181-225", "226-270", "271-309", "310-348", "349-370", "371-392", "393-415", "416-436", "437-450"]
  },
  TCF: {
    listening: ["0-330", "331-368", "369-397", "398-457", "458-502", "503-522", "523-548", "549-563", "564-588", "589-699"],
    speaking: ["0-3", "4-5", "6", "7-9", "10-11", "12-13", "14-15", "16-17", "18-19", "20"],
    reading: ["0-341", "342-374", "375-405", "406-452", "453-498", "499-523", "524-548", "549-574", "575-598", "599-699"],
    writing: ["0-3", "4-5", "6", "7-9", "10-11", "12-13", "14-15", "16-17", "18-19", "20"]
  }
};

// Work experience years options
export const WORK_EXPERIENCE_YEARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Common NOC codes that are in demand
export const COMMON_NOC_CODES = [
  { value: "0213", label: "0213 - Computer and information systems managers" },
  { value: "2171", label: "2171 - Information systems analysts and consultants" },
  { value: "2173", label: "2173 - Software engineers and designers" },
  { value: "2174", label: "2174 - Computer programmers and interactive media developers" },
  { value: "2175", label: "2175 - Web designers and developers" },
  { value: "3012", label: "3012 - Registered nurses and registered psychiatric nurses" },
  { value: "3211", label: "3211 - Medical laboratory technologists" },
  { value: "4011", label: "4011 - University professors and lecturers" },
  { value: "4012", label: "4012 - Post-secondary teaching and research assistants" },
  { value: "1111", label: "1111 - Financial auditors and accountants" }
];

// Re-export shared constants for convenience
export {
  COUNTRIES,
  EDUCATION_LEVELS,
  LANGUAGE_TESTS,
  PROVINCES,
  NOC_CATEGORIES
};
