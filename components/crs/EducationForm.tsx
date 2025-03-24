import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCrsForm } from "@/hooks/useCrsForm";
import { COUNTRIES, EDUCATION_LEVELS } from "@/lib/constants";

// Schema for education form validation
const educationSchema = z.object({
  educationLevel: z.string().min(1, { message: "Please select your highest level of education." }),
  educationCountry: z.string().min(1, { message: "Please select the country where you completed your education." }),
  educationYears: z.number().min(0, { message: "Please enter a valid number of years." }),
  hasCanadianEducation: z.boolean().default(false),
  canadianEducationLevel: z.string().optional(),
  canadianEducationYears: z.number().optional()
}).refine((data) => {
  // If hasCanadianEducation is true, then canadianEducationLevel is required
  if (data.hasCanadianEducation) {
    return !!data.canadianEducationLevel;
  }
  return true;
}, {
  message: "Canadian education level is required when you have Canadian education",
  path: ["canadianEducationLevel"]
});

export default function EducationForm() {
  const { formState, updateEducation, goToNextStep, goToPreviousStep } = useCrsForm();
  
  // Initialize form with current values from context
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educationLevel: formState.educationLevel,
      educationCountry: formState.educationCountry,
      educationYears: formState.educationYears,
      hasCanadianEducation: formState.hasCanadianEducation,
      canadianEducationLevel: formState.canadianEducationLevel,
      canadianEducationYears: formState.canadianEducationYears
    }
  });
  
  // Watch for hasCanadianEducation value to conditionally show Canadian education fields
  const hasCanadianEducation = form.watch("hasCanadianEducation");

  // Handle form submission
  const onSubmit = (values: z.infer<typeof educationSchema>) => {
    updateEducation(values);
    goToNextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-800">Education Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Highest Level of Education */}
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Level of Education</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EDUCATION_LEVELS.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country of Education */}
            <FormField
              control={form.control}
              name="educationCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Where Education Was Completed</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRIES.map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Years of Education */}
            <FormField
              control={form.control}
              name="educationYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Education</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      step="1" 
                      placeholder="Enter years of education" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Total number of years spent in school from primary to your highest level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Canadian Education */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Canadian Education</h3>
            
            <FormField
              control={form.control}
              name="hasCanadianEducation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have education from a Canadian institution
                    </FormLabel>
                    <FormDescription>
                      This includes degrees, diplomas, certificates, or trades from recognized Canadian institutions
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Conditional Canadian Education Fields */}
            {hasCanadianEducation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="canadianEducationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canadian Education Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EDUCATION_LEVELS.map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="canadianEducationYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Canadian Education</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="1" 
                          placeholder="Enter years of Canadian education" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Back to Personal Info
            </Button>
            <Button type="submit">
              Continue to Language
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
