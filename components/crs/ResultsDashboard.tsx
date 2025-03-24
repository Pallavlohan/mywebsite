import { useState } from "react";
import { useCrsForm } from "@/hooks/useCrsForm";
import { Button } from "@/components/ui/button";
import ScoreOverview from "./ScoreOverview";
import PointsBreakdown from "./PointsBreakdown";
import EligibilityStatus from "./EligibilityStatus";
import Recommendations from "./Recommendations";
import ProvincialComparison from "./ProvincialComparison";
import { Download, Edit, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ResultsDashboard() {
  const { formState, crsResult, goToStep, resetForm } = useCrsForm();
  const { toast } = useToast();
  const [showFullAiAnalysis, setShowFullAiAnalysis] = useState(false);
  
  // Handle when no results are available - should not happen in normal flow
  if (!crsResult) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">No Results Available</h2>
        <p className="mb-6">There was an error calculating your CRS score. Please try again.</p>
        <Button onClick={resetForm}>Start Over</Button>
      </div>
    );
  }

  const handleEditInformation = () => {
    goToStep(1); // Go back to personal info step
  };

  const handleDownloadReport = () => {
    // In a real implementation, this would generate a PDF report
    toast({
      title: "Report Download",
      description: "Your CRS assessment report is being prepared for download.",
    });
  };

  const handleEmailResults = () => {
    // In a real implementation, this would send the results to the user's email
    toast({
      title: "Results Sent",
      description: `Your CRS assessment results have been sent to ${formState.email}.`,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-800">Your CRS Assessment Results</h2>
      
      {/* Score Overview and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ScoreOverview 
          totalScore={crsResult.score.totalCrsScore} 
          cutoff={crsResult.currentCutoff} 
        />
        <PointsBreakdown score={crsResult.score} />
        <EligibilityStatus 
          eligibility={crsResult.eligibility} 
          score={crsResult.score.totalCrsScore}
          cutoff={crsResult.currentCutoff}
          provincialPrograms={crsResult.provincialPrograms}
        />
      </div>
      
      {/* AI Analysis (if available) */}
      {crsResult.aiAnalysis && (
        <div className="mb-8 bg-muted/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-neutral-800">AI Profile Analysis</h3>
          <div className="prose max-w-none">
            {showFullAiAnalysis ? (
              <div dangerouslySetInnerHTML={{ __html: crsResult.aiAnalysis.replace(/\n/g, '<br />') }} />
            ) : (
              <div dangerouslySetInnerHTML={{ 
                __html: crsResult.aiAnalysis.split('\n\n')[0].replace(/\n/g, '<br />') + '...' 
              }} />
            )}
            <Button 
              variant="link" 
              onClick={() => setShowFullAiAnalysis(!showFullAiAnalysis)}
              className="p-0 mt-2"
            >
              {showFullAiAnalysis ? 'Show Less' : 'Read Full Analysis'}
            </Button>
          </div>
        </div>
      )}
      
      {/* Recommendations */}
      <Recommendations recommendations={crsResult.recommendations} />
      
      {/* Provincial Comparison */}
      <ProvincialComparison provincialPrograms={crsResult.provincialPrograms} />
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <Button variant="outline" onClick={handleDownloadReport}>
          <Download className="mr-2 h-4 w-4" />
          <span>Download Report</span>
        </Button>
        <div className="space-x-4">
          <Button variant="outline" onClick={handleEditInformation}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Information</span>
          </Button>
          <Button onClick={handleEmailResults}>
            <Send className="mr-2 h-4 w-4" />
            <span>Email Results</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
