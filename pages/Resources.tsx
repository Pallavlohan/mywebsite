import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Immigration Resources</h1>

      <Tabs defaultValue="programs">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="programs">Immigration Programs</TabsTrigger>
          <TabsTrigger value="noc">NOC Codes</TabsTrigger>
          <TabsTrigger value="guides">Guidelines & Tools</TabsTrigger>
        </TabsList>
        
        {/* Programs Tab */}
        <TabsContent value="programs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Express Entry</CardTitle>
                <CardDescription>
                  Federal Skilled Worker, Federal Skilled Trades, and Canadian Experience Class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Express Entry is Canada's application management system for skilled workers.
                  Candidates are ranked based on their CRS score and invited to apply through regular draws.
                </p>
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="ee-requirements">
                    <AccordionTrigger>Requirements</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Language proficiency (CLB 7+ for FSW/CEC, CLB 5+ for FST)</li>
                        <li>Education assessment (ECA) for foreign credentials</li>
                        <li>Work experience (1+ years skilled work)</li>
                        <li>Proof of funds (if applicable)</li>
                        <li>Meet minimum CRS cutoff in draws</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark"
                >
                  Official Website <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Provincial Nominee Programs</CardTitle>
                <CardDescription>
                  Province-specific immigration streams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Provincial Nominee Programs allow provinces and territories to nominate individuals
                  who meet specific regional labor market and economic development needs.
                </p>
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="pnp-list">
                    <AccordionTrigger>Major PNP Programs</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Ontario Immigrant Nominee Program (OINP)</li>
                        <li>British Columbia Provincial Nominee Program (BC PNP)</li>
                        <li>Alberta Advantage Immigration Program (AAIP)</li>
                        <li>Saskatchewan Immigrant Nominee Program (SINP)</li>
                        <li>Manitoba Provincial Nominee Program (MPNP)</li>
                        <li>Nova Scotia Nominee Program (NSNP)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Link href="/calculator">
                  <Button variant="outline">
                    Find Eligible PNP Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* NOC Codes Tab */}
        <TabsContent value="noc">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>National Occupational Classification (NOC)</CardTitle>
              <CardDescription>
                Understanding NOC codes for Canadian immigration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 mb-6">
                The NOC is Canada's national system for describing occupations. Immigration programs
                use NOC codes to determine eligibility based on work experience.
              </p>
              
              <h3 className="font-semibold text-lg mb-2">NOC Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border rounded p-3">
                  <h4 className="font-medium">Category 0: Management Jobs</h4>
                  <p className="text-sm text-neutral-600">Senior management, specialized middle management</p>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium">Category 1: Business, Finance and Administration</h4>
                  <p className="text-sm text-neutral-600">Financial, administrative professionals</p>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium">Category 2: Natural and Applied Sciences</h4>
                  <p className="text-sm text-neutral-600">Engineers, architects, tech professionals</p>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium">Category 3: Health Occupations</h4>
                  <p className="text-sm text-neutral-600">Doctors, nurses, technical health roles</p>
                </div>
              </div>
              
              <a 
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/find-national-occupation-code.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-dark"
              >
                Find Your NOC Code <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Guidelines Tab */}
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Information about approved language tests for Canadian immigration.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>IELTS (English)</li>
                  <li>CELPIP (English)</li>
                  <li>TEF Canada (French)</li>
                  <li>TCF Canada (French)</li>
                </ul>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark text-sm"
                >
                  Official Language Requirements <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Education Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Foreign credentials must be assessed through an approved organization.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>World Education Services (WES)</li>
                  <li>International Credential Assessment Service (ICAS)</li>
                  <li>Comparative Education Service (CES)</li>
                  <li>International Qualifications Assessment Service (IQAS)</li>
                </ul>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/education-assessed.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark text-sm"
                >
                  ECA Information <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Processing Times</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Current processing times for various immigration programs.
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <span className="font-medium">Express Entry:</span> 
                    <span className="block text-sm">6-8 months from ITA</span>
                  </div>
                  <div>
                    <span className="font-medium">Provincial Nomination:</span> 
                    <span className="block text-sm">Varies by province (1-19 months)</span>
                  </div>
                  <div>
                    <span className="font-medium">Work Permits:</span> 
                    <span className="block text-sm">1-27 weeks depending on country</span>
                  </div>
                </div>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark text-sm"
                >
                  Check Processing Times <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
