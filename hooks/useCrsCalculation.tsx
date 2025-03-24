import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { calculateCrsScore } from "../lib/api";
import { useCrsForm } from "./useCrsForm";
import { FormStep } from "@shared/types";

export function useCrsCalculation() {
  const { formState, setCrsResult, setIsCalculating, goToStep } = useCrsForm();
  const [error, setError] = useState<string | null>(null);

  const calculateScoreMutation = useMutation({
    mutationFn: calculateCrsScore,
    onMutate: () => {
      console.log("Starting CRS score calculation");
      setIsCalculating(true);
      setError(null);
    },
    onSuccess: (data) => {
      console.log("CRS calculation successful:", data);
      if (data.success) {
        console.log("Setting CRS result:", data.data);
        setCrsResult(data.data);
        // Go to results page after successfully setting the result
        goToStep(FormStep.Results);
      } else {
        console.error("API returned error:", data.error);
        setError(data.error || "Failed to calculate CRS score");
      }
      setIsCalculating(false);
    },
    onError: (err: any) => {
      console.error("CRS calculation error:", err);
      setError(err.message || "Failed to calculate CRS score. Please try again.");
      setIsCalculating(false);
    }
  });

  const submitData = () => {
    calculateScoreMutation.mutate(formState);
  };

  return {
    submitData,
    isCalculating: calculateScoreMutation.isPending,
    error,
    reset: () => setError(null)
  };
}
