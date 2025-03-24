// Immigration program data

import { ImmigrationProgram } from './types';

// Express Entry Programs
export const expressEntryPrograms: ImmigrationProgram[] = [
  {
    id: 'fswp',
    name: 'Federal Skilled Worker Program',
    category: 'express_entry',
    description: 'The Federal Skilled Worker Program selects immigrants based on their ability to succeed economically in Canada. Points are awarded based on age, education, work experience, language ability, and other factors.',
    requirements: [
      {
        name: 'Skilled work experience',
        description: 'At least 1 year of continuous full-time (or equivalent part-time) skilled work experience in the past 10 years',
        isMet: false,
        details: 'Work must be in TEER 0, 1, 2, or 3 of the NOC'
      },
      {
        name: 'Language ability',
        description: 'Minimum CLB 7 in all abilities (reading, writing, speaking, listening)',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Education',
        description: 'Canadian secondary or post-secondary certificate, diploma or degree, or equivalent foreign credential',
        isMet: false,
        details: 'Foreign credentials need Educational Credential Assessment (ECA)'
      },
      {
        name: 'Minimum points threshold',
        description: 'Score at least 67 points out of 100 on the FSW points grid',
        isMet: false,
        details: 'Based on six selection factors'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    nextSteps: [
      'Create an Express Entry profile',
      'Wait for an invitation to apply',
      'Submit a complete application within 60 days of invitation'
    ],
    officialLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html'
  },
  {
    id: 'cec',
    name: 'Canadian Experience Class',
    category: 'express_entry',
    description: 'The Canadian Experience Class is for skilled workers who have Canadian work experience and want to become permanent residents.',
    requirements: [
      {
        name: 'Canadian work experience',
        description: 'At least 1 year of full-time (or equivalent part-time) skilled work experience in Canada within the last 3 years',
        isMet: false,
        details: 'Work must be in TEER 0, 1, 2, or 3 of the NOC'
      },
      {
        name: 'Language ability',
        description: 'Minimum CLB 7 for TEER 0 or 1 jobs, or CLB 5 for TEER 2 or 3 jobs',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Plan to live outside Quebec',
        description: 'Intend to live outside the province of Quebec',
        isMet: false,
        details: 'Quebec has its own immigration programs'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    nextSteps: [
      'Create an Express Entry profile',
      'Wait for an invitation to apply',
      'Submit a complete application within 60 days of invitation'
    ],
    officialLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html'
  },
  {
    id: 'fstp',
    name: 'Federal Skilled Trades Program',
    category: 'express_entry',
    description: 'The Federal Skilled Trades Program is for skilled workers who want to become permanent residents based on being qualified in a skilled trade.',
    requirements: [
      {
        name: 'Skilled trades work experience',
        description: 'At least 2 years of full-time (or equivalent part-time) work experience in a skilled trade within the last 5 years',
        isMet: false,
        details: 'Work must be in specific skilled trade occupations'
      },
      {
        name: 'Language ability',
        description: 'Minimum CLB 5 for speaking and listening, and CLB 4 for reading and writing',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Job offer or certificate',
        description: 'Have a valid job offer of at least 1 year OR a certificate of qualification in your skilled trade issued by a Canadian provincial/territorial authority',
        isMet: false,
        details: 'Job offer must be from up to 2 employers in Canada'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    nextSteps: [
      'Verify your trade qualification is eligible',
      'Obtain a valid job offer or provincial/territorial certification',
      'Create an Express Entry profile'
    ],
    officialLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/skilled-trades.html'
  }
];

// Provincial Nominee Programs
export const provincialNomineePrograms: ImmigrationProgram[] = [
  {
    id: 'ontario_hcp',
    name: 'Ontario Human Capital Priorities Stream',
    category: 'provincial_nominee',
    description: 'This stream allows Ontario to select Express Entry candidates who have the required education, work experience, language ability, and other factors to help them successfully establish and integrate into Ontario's labour market.',
    requirements: [
      {
        name: 'Express Entry profile',
        description: 'Have an active Express Entry profile',
        isMet: false,
        details: 'Must be eligible for either FSWP or CEC'
      },
      {
        name: 'CRS score',
        description: 'Have a CRS score of at least 400',
        isMet: false,
        details: 'Score may change based on Ontario's needs'
      },
      {
        name: 'Education',
        description: 'Have a bachelor's degree or higher',
        isMet: false,
        details: 'Foreign credentials need Educational Credential Assessment (ECA)'
      },
      {
        name: 'Language ability',
        description: 'CLB 7 or higher in all language abilities',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Settlement funds',
        description: 'Have sufficient settlement funds',
        isMet: false,
        details: 'Amount depends on family size'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    provincialStream: 'Human Capital Priorities',
    nextSteps: [
      'Create an Express Entry profile',
      'Indicate interest in Ontario',
      'Wait for a Notification of Interest from Ontario',
      'Submit a complete application within 45 days of receiving NOI'
    ],
    officialLink: 'https://www.ontario.ca/page/oinp-express-entry-human-capital-priorities-stream'
  },
  {
    id: 'bc_tech',
    name: 'British Columbia Tech Stream',
    category: 'provincial_nominee',
    description: 'The BC PNP Tech stream is for international tech workers and international students who have the qualifications, experience and tech job offer needed in B.C.',
    requirements: [
      {
        name: 'Job offer',
        description: 'Have a job offer in an eligible tech occupation',
        isMet: false,
        details: 'Must be a full-time, permanent position'
      },
      {
        name: 'Wage requirement',
        description: 'Job offer must meet BC's wage requirements for the occupation',
        isMet: false,
        details: 'Wage must be competitive with BC wage rates'
      },
      {
        name: 'Education',
        description: 'Have a degree, diploma or certificate from an eligible post-secondary institution',
        isMet: false,
        details: 'Education should be related to the job'
      },
      {
        name: 'Work experience',
        description: 'Have at least 2 years of experience in the tech sector',
        isMet: false,
        details: 'Experience must be directly related to the job offer'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    provincialStream: 'Tech',
    occupation: ['Software engineers', 'Computer programmers', 'Web developers', 'Data scientists'],
    nextSteps: [
      'Secure a job offer in an eligible tech occupation in BC',
      'Apply directly to BC PNP Tech stream',
      'If approved, apply for permanent residence'
    ],
    officialLink: 'https://www.welcomebc.ca/Immigrate-to-B-C/BC-PNP-Tech'
  },
  {
    id: 'alberta_advantage',
    name: 'Alberta Advantage Immigration Program',
    category: 'provincial_nominee',
    description: 'The Alberta Advantage Immigration Program allows Alberta to nominate individuals for permanent residence who have skills and abilities to fill labour market shortages in the province.',
    requirements: [
      {
        name: 'Express Entry profile',
        description: 'Have an active Express Entry profile',
        isMet: false,
        details: 'Must be eligible for either FSWP, CEC, or FSTP'
      },
      {
        name: 'Ties to Alberta',
        description: 'Have ties to Alberta such as family, previous work or study experience, or a job offer',
        isMet: false,
        details: 'Strong ties to Alberta improve chances of selection'
      },
      {
        name: 'Occupation',
        description: 'Work in an occupation that supports Alberta's economic development and diversification',
        isMet: false,
        details: 'Occupation should not be on Alberta's ineligible occupations list'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    provincialStream: 'Alberta Express Entry',
    nextSteps: [
      'Create an Express Entry profile',
      'Indicate interest in Alberta',
      'Demonstrate ties to Alberta if possible',
      'Wait for a Notification of Interest from Alberta'
    ],
    officialLink: 'https://www.alberta.ca/alberta-advantage-immigration-program.aspx'
  },
  {
    id: 'saskatchewan_eoi',
    name: 'Saskatchewan Express Entry',
    category: 'provincial_nominee',
    description: 'The Saskatchewan Express Entry category is for skilled workers who want to live and work in Saskatchewan and are already in the federal Express Entry pool.',
    requirements: [
      {
        name: 'Express Entry profile',
        description: 'Have an active Express Entry profile',
        isMet: false,
        details: 'Must be eligible for either FSWP, CEC, or FSTP'
      },
      {
        name: 'Education',
        description: 'Have completed at least one year of post-secondary education or training',
        isMet: false,
        details: 'Foreign credentials need Educational Credential Assessment (ECA)'
      },
      {
        name: 'Work experience',
        description: 'Have at least one year of work experience in a skilled occupation (TEER 0, 1, 2, or 3)',
        isMet: false,
        details: 'Experience must be within the past 10 years'
      },
      {
        name: 'Language ability',
        description: 'Have a minimum CLB 7 for TEER 0 or 1 occupations, or CLB 5 for TEER 2 or 3 occupations',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Settlement funds',
        description: 'Have sufficient settlement funds',
        isMet: false,
        details: 'Amount depends on family size'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    provincialStream: 'Express Entry',
    nextSteps: [
      'Create an Express Entry profile',
      'Create a separate Expression of Interest profile in Saskatchewan's system',
      'Wait to be selected from the Saskatchewan EOI pool',
      'If invited, apply for Saskatchewan nomination within 60 days'
    ],
    officialLink: 'https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/immigration-and-pathways/saskatchewan-immigrant-nominee-program'
  },
  {
    id: 'manitoba_skilled_worker',
    name: 'Manitoba Provincial Nominee Program - Skilled Worker Overseas',
    category: 'provincial_nominee',
    description: 'The Manitoba Provincial Nominee Program (MPNP) selects skilled workers who have the skills and experience needed in Manitoba's labour market and nominate them for permanent resident status.',
    requirements: [
      {
        name: 'Connection to Manitoba',
        description: 'Have a connection to Manitoba through family, previous education or work experience, or an invitation under a Strategic Recruitment Initiative',
        isMet: false,
        details: 'Close family members must be Manitoba residents for at least one year'
      },
      {
        name: 'Work experience',
        description: 'Have at least 6 months of work experience in your field',
        isMet: false,
        details: 'Experience must be in an in-demand occupation in Manitoba'
      },
      {
        name: 'Language ability',
        description: 'Have a minimum CLB 6 for your occupation',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Education',
        description: 'Have completed at least a secondary (high school) education',
        isMet: false,
        details: 'Foreign credentials need Educational Credential Assessment (ECA)'
      },
      {
        name: 'Settlement funds',
        description: 'Have sufficient settlement funds',
        isMet: false,
        details: 'Amount depends on family size'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    provincialStream: 'Skilled Worker Overseas',
    nextSteps: [
      'Submit an Expression of Interest to Manitoba',
      'If invited, submit a complete application within 60 days',
      'If nominated, apply for permanent residence'
    ],
    officialLink: 'https://immigratemanitoba.com/immigrate-to-manitoba/skilled-worker-overseas/'
  }
];

// Other immigration programs
export const otherImmigrationPrograms: ImmigrationProgram[] = [
  {
    id: 'atlantic_immigration',
    name: 'Atlantic Immigration Program',
    category: 'other',
    description: 'The Atlantic Immigration Program helps employers in Atlantic Canada hire qualified candidates for jobs they haven't been able to fill locally. These candidates can be living abroad or be international graduates from a recognized post-secondary institution in Atlantic Canada.',
    requirements: [
      {
        name: 'Job offer',
        description: 'Have a job offer from a designated employer in Atlantic Canada',
        isMet: false,
        details: 'Must be full-time, non-seasonal, and at least one year in duration'
      },
      {
        name: 'Work experience',
        description: 'Have at least 1 year of work experience (or be an international graduate from an Atlantic Canada institution)',
        isMet: false,
        details: 'Experience must be within the last 5 years'
      },
      {
        name: 'Education',
        description: 'Have a high school diploma or higher',
        isMet: false,
        details: 'Foreign credentials need Educational Credential Assessment (ECA)'
      },
      {
        name: 'Language ability',
        description: 'Have a minimum CLB 5 in all abilities',
        isMet: false,
        details: 'Must take approved language test'
      },
      {
        name: 'Settlement funds',
        description: 'Have sufficient settlement funds',
        isMet: false,
        details: 'Amount depends on family size'
      }
    ],
    eligibilityScore: 0,
    minimumRequirementsMet: false,
    nextSteps: [
      'Find a designated employer in Atlantic Canada',
      'Receive a job offer',
      'Work with employer to develop a settlement plan',
      'Apply for permanent residence'
    ],
    officialLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration.html'
  },
  {
    id: 'rural_northern_immigration',
    name: 'Rural and Northern Immigration Pilot',
    category: 'other',
    description: 'The Rural and Northern Immigration Pilot is a community-driven program that helps smaller communities attract and retai<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>