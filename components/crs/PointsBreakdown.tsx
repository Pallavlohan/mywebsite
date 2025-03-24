import { Card, CardContent } from "@/components/ui/card";

interface PointsBreakdownProps {
  score: {
    coreHumanCapitalPoints: number;
    spouseFactorsPoints: number;
    skillTransferabilityPoints: number;
    additionalPoints: number;
    totalCrsScore: number;
  };
}

export default function PointsBreakdown({ score }: PointsBreakdownProps) {
  const categories = [
    { name: "Core/Human Capital", value: score.coreHumanCapitalPoints },
    { name: "Spouse Factors", value: score.spouseFactorsPoints },
    { name: "Skill Transferability", value: score.skillTransferabilityPoints },
    { name: "Additional Points", value: score.additionalPoints }
  ];
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4 text-neutral-800">Points Breakdown</h3>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-neutral-700">{category.name}</span>
            <span className="font-semibold">{category.value}</span>
          </li>
        ))}
        <li className="flex justify-between items-center pt-2 border-t border-neutral-200">
          <span className="font-medium">Total</span>
          <span className="font-bold text-lg">{score.totalCrsScore}</span>
        </li>
      </ul>
    </Card>
  );
}
