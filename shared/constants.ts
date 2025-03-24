// Country list for dropdown selections
export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 
  'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 
  'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 
  'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 
  'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 
  'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 
  'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 
  'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 
  'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 
  'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 
  'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 
  'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

// Education levels for dropdown selections
export const EDUCATION_LEVELS = [
  { value: 'less_than_secondary', label: 'Less than secondary school' },
  { value: 'secondary', label: 'Secondary diploma (high school)' },
  { value: 'one_year_post_secondary', label: 'One-year post-secondary program' },
  { value: 'two_year_post_secondary', label: 'Two-year post-secondary program' },
  { value: 'bachelors', label: "Bachelor's degree" },
  { value: 'two_or_more_post_secondary', label: 'Two or more post-secondary programs (one being 3+ years)' },
  { value: 'masters', label: "Master's degree" },
  { value: 'doctoral', label: 'Doctoral degree (PhD)' }
];

// Language test types
export const LANGUAGE_TESTS = [
  { value: 'IELTS', label: 'IELTS - International English Language Testing System' },
  { value: 'CELPIP', label: 'CELPIP - Canadian English Language Proficiency Index Program' },
  { value: 'TEF', label: 'TEF - Test d\'évaluation de français' },
  { value: 'TCF', label: 'TCF - Test de connaissance du français' }
];

// English language test score to CLB conversion (IELTS)
export const IELTS_TO_CLB = {
  speaking: {
    '4.0': 4, '5.0': 5, '5.5': 6, '6.0': 7, '6.5': 8, '7.0': 9, '7.5': 10, '8.0': 10, '8.5': 10, '9.0': 10
  },
  listening: {
    '4.5': 4, '5.0': 5, '5.5': 6, '6.0': 7, '7.5': 8, '8.0': 9, '8.5': 10, '9.0': 10
  },
  reading: {
    '3.5': 4, '4.0': 5, '5.0': 6, '6.0': 7, '6.5': 8, '8.0': 9, '8.5': 10, '9.0': 10
  },
  writing: {
    '4.0': 4, '5.0': 5, '5.5': 6, '6.0': 7, '6.5': 8, '7.0': 9, '7.5': 10, '8.0': 10, '8.5': 10, '9.0': 10
  }
};

// CELPIP test score to CLB conversion
export const CELPIP_TO_CLB = {
  speaking: {
    '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12
  },
  listening: {
    '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12
  },
  reading: {
    '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12
  },
  writing: {
    '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12
  }
};

// TEF test score to CLB conversion
export const TEF_TO_CLB = {
  speaking: {
    '181': 4, '226': 5, '271': 6, '310': 7, '349': 8, '371': 9, '393': 10, '415': 11, '437': 12
  },
  listening: {
    '145': 4, '181': 5, '217': 6, '249': 7, '280': 8, '298': 9, '316': 10, '334': 11, '353': 12
  },
  reading: {
    '121': 4, '151': 5, '181': 6, '206': 7, '234': 8, '248': 9, '263': 10, '277': 11, '290': 12
  },
  writing: {
    '181': 4, '226': 5, '271': 6, '310': 7, '349': 8, '371': 9, '393': 10, '415': 11, '437': 12
  }
};

// TCF test score to CLB conversion
export const TCF_TO_CLB = {
  speaking: {
    '4': 4, '6': 5, '7': 6, '9': 7, '12': 8, '14': 9, '16': 10, '18': 11, '20': 12
  },
  listening: {
    '331': 4, '369': 5, '397': 6, '457': 7, '502': 8, '522': 9, '543': 10, '563': 11, '584': 12
  },
  reading: {
    '342': 4, '374': 5, '406': 6, '453': 7, '499': 8, '524': 9, '549': 10, '574': 11, '599': 12
  },
  writing: {
    '4': 4, '6': 5, '7': 6, '9': 7, '12': 8, '14': 9, '16': 10, '18': 11, '20': 12
  }
};

// Canadian provinces
export const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon'
];

// NOC (National Occupational Classification) categories
export const NOC_CATEGORIES = [
  { value: '0', label: 'Management jobs' },
  { value: '1', label: 'Business, finance and administration jobs' },
  { value: '2', label: 'Natural and applied sciences and related jobs' },
  { value: '3', label: 'Health jobs' },
  { value: '4', label: 'Jobs in education, law and social, community and government services' },
  { value: '5', label: 'Jobs in art, culture, recreation and sport' },
  { value: '6', label: 'Sales and service jobs' },
  { value: '7', label: 'Trades, transport and equipment operators and related jobs' },
  { value: '8', label: 'Natural resources, agriculture and related production jobs' },
  { value: '9', label: 'Jobs in manufacturing and utilities' }
];

// Current CRS cutoff (this would be updated regularly through an API/scraper)
export const CURRENT_CRS_CUTOFF = 470;
