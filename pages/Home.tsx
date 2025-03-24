import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero section */}
      <section className="text-center my-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-800 mb-6">
          Canadian CRS Eligibility Advisor
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
          Calculate your Comprehensive Ranking System score and receive personalized
          recommendations for Canadian immigration.
        </p>
        <Link href="/calculator">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Your Assessment
          </Button>
        </Link>
      </section>

      {/* Features section */}
      <section className="my-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comprehensive Immigration Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>CRS Score Calculator</CardTitle>
              <CardDescription>
                Get an accurate assessment of your Express Entry eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 mb-4">
                Our calculator implements the official CRS criteria used by Immigration,
                Refugees and Citizenship Canada (IRCC) to rank candidates in the Express
                Entry pool.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-primary mx-auto mt-4"
              >
                <path d="M18.9 9.2a9 9 0 0 0 -4.9 -1.2a9 9 0 1 0 0 18a9 9 0 0 0 8.5 -12" />
                <polyline points="16 4 22 4 22 10" />
                <line x1="22" y1="4" x2="12" y2="14" />
              </svg>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Receive personalized advice to improve your score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 mb-4">
                Our system analyzes your profile and provides tailored recommendations
                to enhance your eligibility, including provincial nomination opportunities
                and score improvement strategies.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-primary mx-auto mt-4"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Provincial Program Comparison</CardTitle>
              <CardDescription>
                Find the best immigration pathway for your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 mb-4">
                Compare federal Express Entry with provincial nomination programs to
                identify the most advantageous immigration route based on your specific
                qualifications and experience.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-primary mx-auto mt-4"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary text-white rounded-lg p-8 my-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Immigration Journey Today</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Take the first step toward your Canadian immigration goals with our
          comprehensive eligibility assessment tool.
        </p>
        <Link href="/calculator">
          <Button variant="secondary" size="lg">
            Start Your Assessment
          </Button>
        </Link>
      </section>
    </div>
  );
}
