import { CURRENT_CRS_CUTOFF } from "@shared/constants";
import { NOCJob } from "@shared/types";

/**
 * Gets the current CRS cutoff score for Express Entry
 * In a production environment, this would be scraped from official sources
 * @returns The current CRS cutoff score
 */
export async function getCurrentCrsCutoff(): Promise<number> {
  try {
    // In a real implementation, this would scrape the latest CRS cutoff
    // from the IRCC website or use an official API if available
    
    // For now, return the constant value
    return CURRENT_CRS_CUTOFF;
  } catch (error) {
    console.error("Error fetching current CRS cutoff:", error);
    // Return the default value if there's an error
    return CURRENT_CRS_CUTOFF;
  }
}

/**
 * Gets detailed information about a NOC job code
 * @param nocCode The NOC code to look up
 * @returns Detailed information about the job code
 */
export async function getNocJobInformation(nocCode: string): Promise<NOCJob | null> {
  try {
    // In a real implementation, this would query a database or API
    // to get detailed information about the NOC code
    
    // Sample NOC job information
    const nocJobs: Record<string, NOCJob> = {
      '0213': {
        code: '0213',
        title: 'Computer and information systems managers',
        skillLevel: 'A',
        skillType: '0',
        description: 'Computer and information systems managers plan, organize, direct, control and evaluate the activities of organizations that analyze, design, develop, implement, operate and administer computer and telecommunications software, networks and information systems.',
        mainDuties: [
          'Plan, organize, direct, control and evaluate the operations of information systems and electronic data processing departments and companies',
          'Develop and implement policies and procedures for electronic data processing and computer systems operations and development',
          'Meet with clients to discuss system requirements, specifications, costs and timelines'
        ],
        requirements: [
          'A bachelor\'s degree in computer science, business administration, commerce or engineering',
          'Several years of experience in systems analysis, data administration, software engineering, network design or computer programming',
          'May require certification in project management or specific programming languages or environments'
        ],
        inDemandProvinces: ['Ontario', 'British Columbia', 'Alberta']
      },
      '2174': {
        code: '2174',
        title: 'Computer programmers and interactive media developers',
        skillLevel: 'A',
        skillType: '2',
        description: 'Computer programmers write, modify, integrate and test computer code for software applications, data processing applications, operating systems-level software and communications software.',
        mainDuties: [
          'Write, modify, integrate and test software code',
          'Identify and communicate technical problems, processes and solutions',
          'Prepare reports, manuals and other documentation on the status, operation and maintenance of software'
        ],
        requirements: [
          'A bachelor\'s degree in computer science or a related discipline',
          'College diploma in computer science may be sufficient',
          'Knowledge of specific programming languages and environments'
        ],
        inDemandProvinces: ['Ontario', 'Quebec', 'Alberta', 'British Columbia']
      },
      '3012': {
        code: '3012',
        title: 'Registered nurses and registered psychiatric nurses',
        skillLevel: 'A',
        skillType: '3',
        description: 'Registered nurses and registered psychiatric nurses provide direct nursing care to patients, deliver health education programs and provide consultative services regarding issues relevant to nursing practice.',
        mainDuties: [
          'Assess patients to identify appropriate nursing interventions',
          'Collaborate with members of an interdisciplinary health team to plan, implement, coordinate and evaluate patient care',
          'Administer medications and treatments as prescribed by a physician'
        ],
        requirements: [
          'A bachelor\'s degree in nursing',
          'Registration with a regulatory body is required in all provinces and territories',
          'Additional certification or training may be required in specific areas'
        ],
        inDemandProvinces: ['All provinces and territories']
      }
    };
    
    // Return the NOC job information if found
    if (nocJobs[nocCode]) {
      return nocJobs[nocCode];
    }
    
    // If the specific NOC code is not in our sample data,
    // return a generic response based on the NOC code category
    const category = nocCode.charAt(0);
    
    // Generic responses by category
    const genericResponses: Record<string, Partial<NOCJob>> = {
      '0': {
        skillLevel: 'A',
        skillType: '0',
        description: 'Management occupations',
        requirements: ['Usually requires a university degree and/or extensive experience in the field being managed']
      },
      '1': {
        skillLevel: 'A/B',
        skillType: '1',
        description: 'Business, finance and administration occupations',
        requirements: ['Usually requires post-secondary education or specific training']
      },
      '2': {
        skillLevel: 'A/B',
        skillType: '2',
        description: 'Natural and applied sciences and related occupations',
        requirements: ['Usually requires a university degree or college diploma in a scientific or technical discipline']
      },
      '3': {
        skillLevel: 'A/B/C',
        skillType: '3',
        description: 'Health occupations',
        requirements: ['Education requirements vary from university degrees to on-the-job training']
      },
      '4': {
        skillLevel: 'A/B',
        skillType: '4',
        description: 'Occupations in education, law and social, community and government services',
        requirements: ['Usually requires a university degree or college diploma']
      },
      '5': {
        skillLevel: 'A/B/C',
        skillType: '5',
        description: 'Occupations in art, culture, recreation and sport',
        requirements: ['Education requirements vary from university degrees to on-the-job training']
      },
      '6': {
        skillLevel: 'B/C/D',
        skillType: '6',
        description: 'Sales and service occupations',
        requirements: ['Education requirements vary from secondary school to college education']
      },
      '7': {
        skillLevel: 'B/C',
        skillType: '7',
        description: 'Trades, transport and equipment operators and related occupations',
        requirements: ['Usually requires apprenticeship or trades certification']
      },
      '8': {
        skillLevel: 'B/C/D',
        skillType: '8',
        description: 'Natural resources, agriculture and related production occupations',
        requirements: ['Education requirements vary from secondary school to college education']
      },
      '9': {
        skillLevel: 'C/D',
        skillType: '9',
        description: 'Occupations in manufacturing and utilities',
        requirements: ['Education requirements vary from secondary school to on-the-job training']
      }
    };
    
    if (genericResponses[category]) {
      const generic = genericResponses[category];
      return {
        code: nocCode,
        title: `NOC ${nocCode}`,
        skillLevel: generic.skillLevel || '',
        skillType: generic.skillType || '',
        description: generic.description || '',
        mainDuties: ['Specific duties not available for this NOC code'],
        requirements: generic.requirements || [],
        inDemandProvinces: ['Information not available']
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching NOC job information:", error);
    return null;
  }
}
