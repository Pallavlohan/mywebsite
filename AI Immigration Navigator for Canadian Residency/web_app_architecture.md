# Immigration Navigator Web App Architecture

## Overview

The Immigration Navigator will be a modern, responsive web application designed to help users navigate the Canadian permanent residency process. The application will provide personalized recommendations based on user profiles, calculate CRS scores, compare with recent draw trends, and offer a chat interface for additional assistance.

## Technology Stack

### Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Components**: Built-in Next.js components
- **State Management**: React Context API and hooks
- **Data Visualization**: Recharts for displaying score comparisons and trends
- **Icons**: Lucide icons for a clean, consistent UI

### Backend
- **Framework**: Next.js API routes
- **Database**: Cloudflare D1 (SQLite compatible)
- **Authentication**: Simple email-based authentication for saving profiles
- **Deployment**: Cloudflare Workers

## Application Structure

```
immigration-navigator/
├── migrations/             # D1 database migration files
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── page.tsx        # Landing page
│   │   ├── calculator/     # CRS calculator pages
│   │   ├── pathways/       # Immigration pathways pages
│   │   ├── profile/        # User profile pages
│   │   ├── chat/           # Chat interface
│   │   └── api/            # API routes
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Basic UI components
│   │   ├── forms/          # Form components
│   │   ├── calculator/     # Calculator-specific components
│   │   ├── pathways/       # Pathway-specific components
│   │   └── chat/           # Chat components
│   ├── hooks/              # Custom React hooks
│   │   ├── use-crs-calculator.ts
│   │   ├── use-pathways.ts
│   │   └── use-chat.ts
│   ├── lib/                # Utility functions
│   │   ├── crs/            # CRS calculation logic
│   │   ├── pathways/       # Pathway recommendation logic
│   │   ├── data/           # Data fetching and management
│   │   └── utils/          # General utilities
│   └── types/              # TypeScript type definitions
├── wrangler.toml           # Cloudflare configuration
└── package.json            # Project dependencies
```

## Core Features and Implementation

### 1. User Profile Management

- **Data Collection**: Forms to collect user's personal and professional details
- **Profile Storage**: Save profiles to database for returning users
- **Profile Editing**: Allow users to update their information

### 2. CRS Score Calculator

- **Input Forms**: Multi-step forms to collect all necessary information
- **Calculation Logic**: Implementation of the complete CRS formula
- **Score Breakdown**: Detailed breakdown of points by category
- **Score Comparison**: Compare user's score with recent draw cutoffs

### 3. Pathway Recommendation Engine

- **Algorithm**: Logic to match user profiles with optimal immigration pathways
- **Top 5 Pathways**: Identify and rank the most suitable pathways
- **Eligibility Checking**: Verify eligibility for each recommended pathway
- **Improvement Suggestions**: Provide actionable advice to boost scores

### 4. Draw Trend Analysis

- **Data Visualization**: Charts showing recent draw trends
- **Cutoff Prediction**: Simple prediction of future cutoff scores
- **Program Comparison**: Compare different program requirements

### 5. Chat Functionality

- **Context-Aware Responses**: Chat interface that understands the user's profile
- **Query Handling**: Process and respond to user questions about immigration
- **Recommendation Clarification**: Explain pathway recommendations
- **Score Improvement Advice**: Provide detailed advice on improving scores

### 6. Notification System

- **Draw Alerts**: Notify users when new draws match their eligibility
- **Program Updates**: Alert users about changes to immigration programs
- **Score Impact**: Inform users how program changes affect their scores

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  age INTEGER,
  education_level TEXT,
  first_language_proficiency JSON, -- {reading: CLB, writing: CLB, speaking: CLB, listening: CLB}
  second_language_proficiency JSON, -- {reading: CLB, writing: CLB, speaking: CLB, listening: CLB}
  canadian_work_experience INTEGER, -- in months
  foreign_work_experience INTEGER, -- in months
  has_spouse BOOLEAN,
  spouse_education_level TEXT,
  spouse_language_proficiency JSON,
  spouse_canadian_work_experience INTEGER,
  canadian_education BOOLEAN,
  provincial_nomination BOOLEAN,
  job_offer BOOLEAN,
  job_offer_noc TEXT,
  siblings_in_canada BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved calculations table
CREATE TABLE calculations (
  id TEXT PRIMARY KEY,
  profile_id TEXT REFERENCES profiles(id),
  crs_score INTEGER,
  score_breakdown JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommended pathways table
CREATE TABLE recommendations (
  id TEXT PRIMARY KEY,
  profile_id TEXT REFERENCES profiles(id),
  pathways JSON, -- Array of recommended pathways with scores
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Express Entry draws table
CREATE TABLE draws (
  id TEXT PRIMARY KEY,
  draw_number INTEGER,
  draw_date TIMESTAMP,
  draw_type TEXT,
  minimum_crs_score INTEGER,
  invitations_issued INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### User Management
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### CRS Calculator
- `POST /api/calculator/calculate` - Calculate CRS score
- `GET /api/calculator/history` - Get calculation history
- `GET /api/calculator/draws` - Get recent draw information

### Pathway Recommendations
- `POST /api/pathways/recommend` - Get pathway recommendations
- `GET /api/pathways/programs` - Get all immigration programs
- `GET /api/pathways/eligibility` - Check eligibility for specific program

### Chat
- `POST /api/chat/message` - Send a message to the chat system
- `GET /api/chat/history` - Get chat history

## Responsive Design

The application will be designed with a mobile-first approach, ensuring a seamless experience across devices:

- **Mobile**: Simplified interface with focused forms and step-by-step processes
- **Tablet**: Enhanced layout with side panels for additional information
- **Desktop**: Full-featured interface with multi-column layouts and detailed visualizations

## Performance Considerations

- **Static Generation**: Pre-render static content for faster loading
- **Client-side Calculations**: Perform CRS calculations client-side to reduce server load
- **Incremental Form Saving**: Save form progress to prevent data loss
- **Lazy Loading**: Load components and data only when needed
- **Optimized Images**: Use Next.js image optimization

## Security Considerations

- **Input Validation**: Validate all user inputs on both client and server
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Data Encryption**: Encrypt sensitive user data
- **CSRF Protection**: Implement CSRF tokens for form submissions
- **Content Security Policy**: Set appropriate CSP headers

## Accessibility

- **WCAG Compliance**: Follow WCAG 2.1 AA guidelines
- **Keyboard Navigation**: Ensure all features are accessible via keyboard
- **Screen Reader Support**: Add appropriate ARIA labels
- **Color Contrast**: Maintain sufficient contrast ratios
- **Focus Indicators**: Clear visual indicators for focused elements

## Future Expansion

The architecture will be designed to accommodate future expansions:

- **Additional Countries**: Support for immigration programs in other countries
- **Visa Types**: Expand beyond permanent residency to other visa types
- **Advanced Analytics**: More sophisticated trend analysis and predictions
- **Document Management**: Upload and manage immigration documents
- **Timeline Tracking**: Track application progress and deadlines
