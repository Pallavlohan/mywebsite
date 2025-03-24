import { Recommendation } from "@shared/types";
import { LightbulbIcon } from "lucide-react";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  // Sort recommendations by priority
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return priorityValues[b.priority] - priorityValues[a.priority];
  });
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800">Personalized Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRecommendations.map((recommendation, index) => (
          <RecommendationCard key={index} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  // Determine priority styling
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-primary';
    }
  };
  
  const priorityStyle = getPriorityStyles(recommendation.priority);
  
  return (
    <div className="bg-white shadow-sm rounded-lg p-5">
      <div className="flex items-start mb-3">
        <LightbulbIcon className="text-amber-600 mr-3" size={20} />
        <h4 className="font-medium text-neutral-800">{recommendation.title}</h4>
      </div>
      <p className="text-neutral-600 mb-3 text-sm">{recommendation.description}</p>
      
      {/* Action Items (shown in tooltip or expandable section) */}
      <details className="mb-3">
        <summary className="text-sm text-primary font-medium cursor-pointer">Action items</summary>
        <ul className="pl-5 mt-2 text-sm list-disc text-neutral-600">
          {recommendation.actionItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </details>
      
      <div className="flex items-center justify-between text-sm">
        <span className={`${priorityStyle} font-medium`}>+{recommendation.potentialPoints} potential points</span>
        <button className="text-primary hover:text-primary/80 font-medium flex items-center">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
