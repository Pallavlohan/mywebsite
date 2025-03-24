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
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCrsForm } from "@/hooks/useCrsForm";
import { LANGUAGE_OPTIONS, LANGUAGE_TESTS, LANGUAGE_SCORE_RANGES } from "@/lib/constants";

// Schema for language form validation
const languageSchema = z.object({
  primaryLanguage: z.string().min(1, { message: "Please select your primary language." }),
  primaryLanguageTest: z.string().min(1, { message: "Please select a language test." }),
  primaryLanguageListening: z.number().min(0, { message: "Please select a listening score." }),
  primaryLanguageSpeaking: z.number().min(0, { message: "Please select a speaking score." }),
  primaryLanguageReading: z.number().min(0, { message: "Please select a reading score." }),
  primaryLanguageWriting: z.number().min(0, { message: "Please select a writing score." }),
  
  hasSecondaryLanguage: z.boolean().default(false),
  secondaryLanguage: z.string().optional(),
  secondaryLanguageTest: z.string().optional(),
  secondaryLanguageListening: z.number().optional(),
  secondaryLanguageSpeaking: z.number().optional(),
  secondaryLanguageReading: z.number().optional(),
  secondaryLanguageWriting: z.number().optional()
}).refine((data) => {
  // If hasSecondaryLanguage is true, then secondary language is required
  if (data.hasSecondaryLanguage) {
    return (
      !!data.secondaryLanguage &&
      !!data.secondaryLanguageTest &&
      data.secondaryLanguageListening !== undefined &&
      data.secondaryLanguageSpeaking !== undefined &&
      data.secondaryLanguageReading !== undefined &&
      data.secondaryLanguageWriting !== undefined
    );
  }
  return true;
}, {
  message: "All secondary language fields are required",
  path: ["secondaryLanguage"]
});

export default function LanguageForm() {
  const { formState, updateLanguage, goToNextStep, goToPreviousStep } = useCrsForm();
  
  // Initialize form with current values from context
  const form = useForm<z.infer<typeof languageSchema>>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      primaryLanguage: formState.primaryLanguage,
      primaryLanguageTest: formState.primaryLanguageTest,
      primaryLanguageListening: formState.primaryLanguageListening,
      primaryLanguageSpeaking: formState.primaryLanguageSpeaking,
      primaryLanguageReading: formState.primaryLanguageReading,
      primaryLanguageWriting: formState.primaryLanguageWriting,
      
      hasSecondaryLanguage: formState.hasSecondaryLanguage,
      secondaryLanguage: formState.secondaryLanguage,
      secondaryLanguageTest: formState.secondaryLanguageTest,
      secondaryLanguageListening: formState.secondaryLanguageListening,
      secondaryLanguageSpeaking: formState.secondaryLanguageSpeaking,
      secondaryLanguageReading: formState.secondaryLanguageReading,
      secondaryLanguageWriting: formState.secondaryLanguageWriting
    }
  });
  
  // Watch for changes to determine what score ranges to show
  const primaryLanguageTest = form.watch("primaryLanguageTest");
  const secondaryLanguageTest = form.watch("secondaryLanguageTest");
  const hasSecondaryLanguage = form.watch("hasSecondaryLanguage");

  // Get score ranges based on test type
  const getPrimaryScoreRanges = () => {
    if (!primaryLanguageTest) return null;
    return LANGUAGE_SCORE_RANGES[primaryLanguageTest as keyof typeof LANGUAGE_SCORE_RANGES];
  };

  const getSecondaryScoreRanges = () => {
    if (!secondaryLanguageTest) return null;
    return LANGUAGE_SCORE_RANGES[secondaryLanguageTest as keyof typeof LANGUAGE_SCORE_RANGES];
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof languageSchema>) => {
    updateLanguage(values);
    goToNextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-800">Language Proficiency</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Primary Official Language</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Primary Language */}
              <FormField
                control={form.control}
                name="primaryLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Official Language</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LANGUAGE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your strongest official language (English or French)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Primary Language Test */}
              <FormField
                control={form.control}
                name="primaryLanguageTest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language Test</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select test type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LANGUAGE_TESTS.map(test => (
                          <SelectItem key={test.value} value={test.value}>
                            {test.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Language Test Scores */}
            {primaryLanguageTest && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="primaryLanguageListening"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listening</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Score" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getPrimaryScoreRanges()?.listening.map(score => (
                            <SelectItem key={score} value={score}>
                              {score}
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
                  name="primaryLanguageSpeaking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaking</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Score" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getPrimaryScoreRanges()?.speaking.map(score => (
                            <SelectItem key={score} value={score}>
                              {score}
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
                  name="primaryLanguageReading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reading</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Score" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getPrimaryScoreRanges()?.reading.map(score => (
                            <SelectItem key={score} value={score}>
                              {score}
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
                  name="primaryLanguageWriting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writing</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Score" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getPrimaryScoreRanges()?.writing.map(score => (
                            <SelectItem key={score} value={score}>
                              {score}
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

            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="language-info">
                <AccordionTrigger>
                  <span className="text-sm">Language Test Information</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p><strong>IELTS (General Training):</strong> International English Language Testing System, scores range from 1.0 to 9.0</p>
                    <p><strong>CELPIP:</strong> Canadian English Language Proficiency Index Program, scores range from 1 to 12</p>
                    <p><strong>TEF Canada:</strong> Test d'évaluation de français for Canada, French proficiency test</p>
                    <p><strong>TCF Canada:</strong> Test de connaissance du français for Canada, French proficiency test</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Secondary Language */}
          <div className="mt-8">
            <FormField
              control={form.control}
              name="hasSecondaryLanguage"
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
                      I have test results for my second official language
                    </FormLabel>
                    <FormDescription>
                      Select this if you have test results for both English and French
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Secondary Language Fields */}
            {hasSecondaryLanguage && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Secondary Official Language</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Secondary Language */}
                  <FormField
                    control={form.control}
                    name="secondaryLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Official Language</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANGUAGE_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Secondary Language Test */}
                  <FormField
                    control={form.control}
                    name="secondaryLanguageTest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language Test</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select test type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANGUAGE_TESTS.map(test => (
                              <SelectItem key={test.value} value={test.value}>
                                {test.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Secondary Language Test Scores */}
                {secondaryLanguageTest && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="secondaryLanguageListening"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Listening</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(Number(value))} 
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Score" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getSecondaryScoreRanges()?.listening.map(score => (
                                <SelectItem key={score} value={score}>
                                  {score}
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
                      name="secondaryLanguageSpeaking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speaking</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(Number(value))} 
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Score" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getSecondaryScoreRanges()?.speaking.map(score => (
                                <SelectItem key={score} value={score}>
                                  {score}
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
                      name="secondaryLanguageReading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reading</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(Number(value))} 
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Score" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getSecondaryScoreRanges()?.reading.map(score => (
                                <SelectItem key={score} value={score}>
                                  {score}
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
                      name="secondaryLanguageWriting"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Writing</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(Number(value))} 
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Score" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getSecondaryScoreRanges()?.writing.map(score => (
                                <SelectItem key={score} value={score}>
                                  {score}
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
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Back to Education
            </Button>
            <Button type="submit">
              Continue to Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
