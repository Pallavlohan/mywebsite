import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About the CRS Eligibility Advisor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>What is the CRS?</CardTitle>
            <CardDescription>
              Understanding the Comprehensive Ranking System
            </CardDescription>
          </CardHeader>
          <CardContent className="prose">
            <p>
              The Comprehensive Ranking System (CRS) is the points-based system 
              that Canada uses to assess and rank candidates in the Express Entry pool. 
              It assigns points based on factors such as:
            </p>
            <ul>
              <li>Age</li>
              <li>Education</li>
              <li>Official language proficiency</li>
              <li>Work experience</li>
              <li>Adaptability factors</li>
            </ul>
            <p>
              Candidates with the highest CRS scores receive an Invitation to Apply (ITA) 
              for permanent residence through regular draws conducted by Immigration, 
              Refugees and Citizenship Canada (IRCC).
            </p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>About Our Tool</CardTitle>
            <CardDescription>
              How our CRS Eligibility Advisor can help you
            </CardDescription>
          </CardHeader>
          <CardContent className="prose">
            <p>
              Our CRS Eligibility Advisor is designed to help potential immigrants:
            </p>
            <ul>
              <li>Calculate their CRS score accurately based on IRCC criteria</li>
              <li>Understand how they compare to current CRS cutoffs</li>
              <li>Receive personalized recommendations to improve their score</li>
              <li>Explore alternative provincial immigration pathways</li>
              <li>Make informed decisions about their immigration journey</li>
            </ul>
            <p>
              Using advanced analysis tools, our system provides insights beyond 
              a simple score calculation, helping you navigate the complex Canadian 
              immigration landscape.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            The process of using our CRS Eligibility Advisor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">1</div>
              <h3 className="font-medium mb-2">Enter Your Information</h3>
              <p className="text-sm text-neutral-600">Complete our user-friendly form with your personal, education, language, and work experience details.</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">2</div>
              <h3 className="font-medium mb-2">Calculate CRS Score</h3>
              <p className="text-sm text-neutral-600">Our system calculates your score based on the official CRS criteria.</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">3</div>
              <h3 className="font-medium mb-2">Receive Analysis</h3>
              <p className="text-sm text-neutral-600">Get a detailed breakdown of your score and personalized recommendations.</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">4</div>
              <h3 className="font-medium mb-2">Explore Options</h3>
              <p className="text-sm text-neutral-600">Compare federal and provincial programs to find your best immigration pathway.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Commitment</CardTitle>
          <CardDescription>
            Accuracy, privacy, and accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            At CRS Eligibility Advisor, we are committed to providing accurate, up-to-date information 
            based on official immigration policies and requirements. We:
          </p>
          <ul>
            <li><strong>Regularly update our system</strong> to reflect the latest CRS criteria and immigration policies</li>
            <li><strong>Protect your privacy</strong> by implementing secure data handling practices</li>
            <li><strong>Provide clear guidance</strong> through the complex immigration process</li>
            <li><strong>Offer accessible tools</strong> for users at all stages of their immigration journey</li>
          </ul>
          <p className="text-sm text-neutral-500 mt-6">
            <strong>Disclaimer:</strong> While we strive for accuracy, this tool is for informational purposes only. 
            The results and recommendations provided should not be considered legal advice. For official immigration 
            guidance, please consult with a licensed immigration consultant or lawyer, or refer to official IRCC resources.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
