import { ProvincialProgram } from "@shared/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProvincialComparisonProps {
  provincialPrograms: ProvincialProgram[];
}

export default function ProvincialComparison({ provincialPrograms }: ProvincialComparisonProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800">Provincial Program Comparison</h3>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-100">
              <TableRow>
                <TableHead className="font-medium">Province</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Requirements</TableHead>
                <TableHead className="font-medium">Eligibility</TableHead>
                <TableHead className="font-medium">Processing Time</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {provincialPrograms.map((program, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{program.province}</TableCell>
                  <TableCell>{program.programName}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 text-sm">
                      {program.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                      {program.requirements.length > 3 && (
                        <li>
                          <span className="text-primary text-xs">and {program.requirements.length - 3} more...</span>
                        </li>
                      )}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <EligibilityBadge eligibility={program.eligibility} />
                  </TableCell>
                  <TableCell className="text-sm">{program.processingTime}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="text-primary">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{program.province}: {program.programName}</DialogTitle>
                          <DialogDescription>
                            Detailed information about this provincial program
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{program.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Requirements</h4>
                            <ul className="list-disc pl-6 text-sm text-muted-foreground">
                              {program.requirements.map((req, i) => (
                                <li key={i}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Eligibility</h4>
                            <div className="flex items-center">
                              <EligibilityBadge eligibility={program.eligibility} />
                              <span className="text-sm text-muted-foreground ml-2">
                                {program.eligibility === 'eligible' && 'You meet all requirements for this program.'}
                                {program.eligibility === 'likely_eligible' && 'You likely meet the requirements, but should verify specific details.'}
                                {program.eligibility === 'not_eligible' && 'You currently don\'t meet one or more requirements.'}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Official Website</h4>
                            <a 
                              href="#" 
                              className="text-primary hover:text-primary/80 inline-flex items-center text-sm"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Visit official {program.province} immigration website
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Component for eligibility badge
function EligibilityBadge({ eligibility }: { eligibility: string }) {
  let badgeClass = "";
  let label = "";
  
  switch (eligibility) {
    case 'eligible':
      badgeClass = "bg-secondary-light/10 text-secondary-dark";
      label = "Eligible";
      break;
    case 'likely_eligible':
      badgeClass = "bg-secondary-light/10 text-secondary-dark";
      label = "Likely Eligible";
      break;
    case 'not_eligible':
      badgeClass = "bg-error-light/10 text-error-dark";
      label = "Below Requirements";
      break;
    default:
      badgeClass = "bg-neutral-200 text-neutral-700";
      label = "Unknown";
  }
  
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
      {label}
    </span>
  );
}
