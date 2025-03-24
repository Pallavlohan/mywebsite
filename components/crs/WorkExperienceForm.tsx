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
import { Textarea } from "@/components/ui/textarea";
import { useCrsForm } from "@/hooks/useCrsForm";
import { useCrsCalculation } from "@/hooks/useCrsCalculation";
import { 
  COMMON_NOC_CODES, 
  WORK_EXPERIENCE_YEARS 
} from "@/lib/constants";

// Schema for work experience form validation
const workExperienceSchema = z.object({
  // Canadian work experience
  hasCanadianWorkExperience: z.boolean().default(false),
  canadianWorkExperienceYears: z.number().optional(),
  canadianNocCodes: z.array(z.string()).optional(),
  
  // Foreign work experience
  hasForeignWorkExperience: z.boolean().default(false),
  foreignWorkExperienceYears: z.number().optional(),
  foreignNocCodes: z.array(z.string()).optional(),
  
  // Additional factors
  hasProvincialNomination: z.boolean().default(false),
  hasValidJobOffer: z.boolean().default(false),
  jobOfferNocCode: z.string().optional(),
  hasSiblingInCanada: z.boolean().default(false),
  
  // Profile description
  profileDescription: z.string().optional()
}).superRefine((data, ctx) => {
  // If hasCanadianWorkExperience is true, then canadianWorkExperienceYears is required
  if (data.hasCanadianWorkExperience && data.canadianWorkExperienceYears === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Years of Canadian work experience is required",
      path: ["canadianWorkExperienceYears"]
    });
  }
  
  // If hasCanadianWorkExperience is true, then canadianNocCodes is required
  if (data.hasCanadianWorkExperience && (!data.canadianNocCodes || data.canadianNocCodes.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one NOC code for Canadian work experience is required",
      path: ["canadianNocCodes"]
    });
  }
  
  // If hasForeignWorkExperience is true, then foreignWorkExperienceYears is required
  if (data.hasForeignWorkExperience && data.foreignWorkExperienceYears === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Years of foreign work experience is required",
      path: ["foreignWorkExperienceYears"]
    });
  }
  
  // If hasForeignWorkExperience is true, then foreignNocCodes is required
  if (data.hasForeignWorkExperience && (!data.foreignNocCodes || data.foreignNocCodes.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one NOC code for foreign work experience is required",
      path: ["foreignNocCodes"]
    });
  }
  
  // If hasValidJobOffer is true, then jobOfferNocCode is required
  if (data.hasValidJobOffer && !data.jobOfferNocCode) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "NOC code for job offer is required",
      path: ["jobOfferNocCode"]
    });
  }
});

export default function WorkExperienceForm() {
  const { formState, updateWorkExperience, goToPreviousStep } = useCrsForm();
  const { submitData, isCalculating, error } = useCrsCalculation();
  
  // Initialize form with current values from context
  const form = useForm<z.infer<typeof workExperienceSchema>>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      hasCanadianWorkExperience: formState.hasCanadianWorkExperience,
      canadianWorkExperienceYears: formState.canadianWorkExperienceYears,
      canadianNocCodes: formState.canadianNocCodes,
      
      hasForeignWorkExperience: formState.hasForeignWorkExperience,
      foreignWorkExperienceYears: formState.foreignWorkExperienceYears,
      foreignNocCodes: formState.foreignNocCodes,
      
      hasProvincialNomination: formState.hasProvincialNomination,
      hasValidJobOffer: formState.hasValidJobOffer,
      jobOfferNocCode: formState.jobOfferNocCode,
      hasSiblingInCanada: formState.hasSiblingInCanada,
      
      profileDescription: formState.profileDescription
    }
  });
  
  // Watch for checkbox values to conditionally show fields
  const hasCanadianWorkExperience = form.watch("hasCanadianWorkExperience");
  const hasForeignWorkExperience = form.watch("hasForeignWorkExperience");
  const hasValidJobOffer = form.watch("hasValidJobOffer");

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof workExperienceSchema>) => {
    console.log("Form submitted with values:", values);
    // Update work experience state first
    updateWorkExperience(values);
    // Submit data directly - navigation will happen in useCrsCalculation after successful API response
    submitData();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-800">Work Experience & Additional Factors</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Canadian Work Experience */}
          <div>
            <h3 className="text-lg font-medium mb-4">Canadian Work Experience</h3>
            
            <FormField
              control={form.control}
              name="hasCanadianWorkExperience"
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
                      I have work experience in Canada
                    </FormLabel>
                    <FormDescription>
                      This includes work performed in Canada with proper authorization in NOC skill type 0, or skill levels A, B, or C
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {hasCanadianWorkExperience && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="canadianWorkExperienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Canadian Work Experience</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select years" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WORK_EXPERIENCE_YEARS.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year} {year === 1 ? 'year' : 'years'}
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
                  name="canadianNocCodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canadian Work NOC Codes</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange([...field.value || [], value])}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select NOC codes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COMMON_NOC_CODES.map(code => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selected: {field.value?.join(", ") || "None"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Foreign Work Experience */}
          <div>
            <h3 className="text-lg font-medium mb-4">Foreign Work Experience</h3>
            
            <FormField
              control={form.control}
              name="hasForeignWorkExperience"
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
                      I have skilled work experience outside Canada
                    </FormLabel>
                    <FormDescription>
                      This includes work in NOC skill type 0, or skill levels A, B, or C
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {hasForeignWorkExperience && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="foreignWorkExperienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Foreign Work Experience</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select years" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WORK_EXPERIENCE_YEARS.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year} {year === 1 ? 'year' : 'years'}
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
                  name="foreignNocCodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foreign Work NOC Codes</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange([...field.value || [], value])}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select NOC codes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COMMON_NOC_CODES.map(code => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selected: {field.value?.join(", ") || "None"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Additional Factors */}
          <div>
            <h3 className="text-lg font-medium mb-4">Additional Factors</h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="hasProvincialNomination"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have a provincial nomination
                      </FormLabel>
                      <FormDescription>
                        A nomination certificate from a Canadian province or territory (worth 600 points)
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasValidJobOffer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have a valid job offer from a Canadian employer
                      </FormLabel>
                      <FormDescription>
                        A valid job offer supported by an LMIA or exempt from LMIA requirement
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {hasValidJobOffer && (
                <div className="ml-7 mt-2">
                  <FormField
                    control={form.control}
                    name="jobOfferNocCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NOC Code for Job Offer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select NOC code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COMMON_NOC_CODES.map(code => (
                              <SelectItem key={code.value} value={code.value}>
                                {code.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="hasSiblingInCanada"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have a sibling who is a Canadian citizen or permanent resident
                      </FormLabel>
                      <FormDescription>
                        A brother or sister living in Canada who is a citizen or permanent resident (worth 15 points)
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Profile Description */}
          <div>
            <h3 className="text-lg font-medium mb-4">Profile Description</h3>
            
            <FormField
              control={form.control}
              name="profileDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us more about your background (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your education, work experience, and reasons for immigrating to Canada. This information helps our system provide more personalized recommendations."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This information will be used for AI analysis to provide more tailored recommendations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-destructive/10 p-3 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Back to Language
            </Button>
            <Button type="submit" disabled={isCalculating}>
              {isCalculating ? "Calculating..." : "Calculate CRS Score"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
