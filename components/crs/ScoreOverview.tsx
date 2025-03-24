import { Card, CardContent } from "@/components/ui/card";

interface ScoreOverviewProps {
  totalScore: number;
  cutoff: number;
}

export default function ScoreOverview({ totalScore, cutoff }: ScoreOverviewProps) {
  // Calculate how far above/below the cutoff
  const difference = totalScore - cutoff;
  const isAboveCutoff = difference >= 0;
  
  // Calculate percentage of circle filled (max score is 1200)
  const percentage = Math.min(100, Math.round((totalScore / 1200) * 100));
  const dashArray = 283; // Circumference of a circle with r=45
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  
  // Determine color based on status
  const circleColor = isAboveCutoff ? "hsl(var(--secondary))" : "hsl(var(--secondary))";
  const statusColor = isAboveCutoff ? "bg-secondary-light/10 text-secondary-dark" : "bg-error-light text-white";
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4 text-neutral-800">Total CRS Score</h3>
      <div className="flex justify-center mb-4">
        {/* Score Circle */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={circleColor}
              strokeWidth="8" 
              strokeDasharray={dashArray} 
              strokeDashoffset={dashOffset} 
              transform="rotate(-90 50 50)" 
            />
            <text 
              x="50" 
              y="50" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="text-3xl font-bold" 
              fill="hsl(var(--foreground))"
            >
              {totalScore}
            </text>
            <text 
              x="50" 
              y="65" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="text-sm" 
              fill="hsl(var(--muted-foreground))"
            >
              out of 1200
            </text>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-muted-foreground mb-2">Latest CRS cutoff: <span className="font-semibold">{cutoff}</span></p>
        <div className={`inline-block px-4 py-2 rounded-full ${statusColor} font-medium`}>
          {isAboveCutoff ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="align-middle">Above cutoff by {difference} points</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="align-middle">Below cutoff by {Math.abs(difference)} points</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
