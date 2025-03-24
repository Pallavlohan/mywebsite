import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

interface EligibilityStatusProps {
  eligibility: 'eligible' | 'close' | 'not_eligible';
  score: number;
  cutoff: number;
  provincialPrograms: any[];
}

export default function EligibilityStatus({ 
  eligibility, 
  score, 
  cutoff,
  provincialPrograms 
}: EligibilityStatusProps) {
  // Filter to find eligible provincial programs
  const eligiblePrograms = provincialPrograms.filter(
    program => program.eligibility === 'eligible' || program.eligibility === 'likely_eligible'
  );
  
  // Determine Express Entry status display
  const getExpressEntryStatus = () => {
    if (eligibility === 'eligible') {
      return {
        background: "bg-secondary-light/10",
        border: "border-secondary-light/30",
        title: "Federal Express Entry",
        titleColor: "text-secondary-dark",
        message: "Your score is above the current CRS cutoff for Express Entry draws."
      };
    } else if (eligibility === 'close') {
      return {
        background: "bg-accent-light/10",
        border: "border-accent-light/30",
        title: "Federal Express Entry",
        titleColor: "text-accent-dark",
        message: `Your score (${score}) is close to the current CRS cutoff (${cutoff}). Continue improving your profile.`
      };
    } else {
      return {
        background: "bg-error-light/10",
        border: "border-error-light/30",
        title: "Federal Express Entry",
        titleColor: "text-error-dark",
        message: "Your score is below the current CRS cutoff for Express Entry draws."
      };
    }
  };
  
  // Get provincial nomination status display
  const getPnpStatus = () => {
    if (eligiblePrograms.length > 0) {
      return {
        background: "bg-secondary-light/10",
        border: "border-secondary-light/30",
        title: "Provincial Nominee Eligible",
        titleColor: "text-secondary-dark",
        message: `You may qualify for provincial nomination programs in ${eligiblePrograms.map(p => p.province).slice(0, 2).join(' and ')}${eligiblePrograms.length > 2 ? ' and others' : ''}.`
      };
    }
    
    return {
      background: "bg-accent-light/10",
      border: "border-accent-light/30",
      title: "Provincial Programs",
      titleColor: "text-accent-dark",
      message: "Review our recommendations to find potential provincial pathways."
    };
  };
  
  const expressEntryStatus = getExpressEntryStatus();
  const pnpStatus = getPnpStatus();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4 text-neutral-800">Eligibility Status</h3>
      
      {/* Express Entry Status */}
      <div className={`mb-4 p-4 ${expressEntryStatus.background} rounded-lg border ${expressEntryStatus.border}`}>
        <h4 className={`font-medium ${expressEntryStatus.titleColor} mb-2`}>{expressEntryStatus.title}</h4>
        <p className="text-neutral-700 text-sm">{expressEntryStatus.message}</p>
      </div>
      
      {/* Provincial Nomination Status */}
      <div className={`mb-4 p-4 ${pnpStatus.background} rounded-lg border ${pnpStatus.border}`}>
        <h4 className={`font-medium ${pnpStatus.titleColor} mb-2`}>{pnpStatus.title}</h4>
        <p className="text-neutral-700 text-sm">{pnpStatus.message}</p>
      </div>
      
      {/* View Eligible Programs Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-2 flex items-center justify-center">
            <Search className="mr-2 h-4 w-4" />
            View Eligible Programs
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Eligible Immigration Programs</DialogTitle>
            <DialogDescription>
              Based on your CRS score of {score}, these are the programs you may be eligible for.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {eligibility === 'eligible' && (
              <div className="p-4 bg-secondary/10 rounded-md">
                <h4 className="font-medium text-secondary-dark mb-1">Federal Express Entry</h4>
                <p className="text-sm">Your score is above the current CRS cutoff ({cutoff}) for Express Entry draws.</p>
              </div>
            )}
            
            {eligiblePrograms.length > 0 ? (
              eligiblePrograms.map((program, index) => (
                <div key={index} className="p-4 bg-secondary/10 rounded-md">
                  <h4 className="font-medium text-secondary-dark mb-1">{program.province}: {program.programName}</h4>
                  <p className="text-sm">{program.description}</p>
                  <div className="mt-2">
                    <h5 className="text-xs font-medium text-muted-foreground">Requirements:</h5>
                    <ul className="list-disc text-xs pl-5 mt-1 text-muted-foreground">
                      {program.requirements.map((req: string, i: number) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm">No eligible provincial programs found based on your current profile.</p>
                <p className="text-sm mt-2">Review our recommendations to improve your eligibility.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
