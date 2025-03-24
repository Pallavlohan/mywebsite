import { useState } from "react";
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
import { COUNTRIES, MARITAL_STATUS_OPTIONS } from "@/lib/constants";

// Schema for personal info form validation
const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  birthdate: z.string().refine(date => new Date(date) <= new Date(), {
    message: "Birthdate cannot be in the future."
  }),
  maritalStatus: z.string().min(1, { message: "Please select your marital status." }),
  countryOfCitizenship: z.string().min(1, { message: "Please select your country of citizenship." }),
  currentCountry: z.string().min(1, { message: "Please select your current country of residence." }),
  hasSpouse: z.boolean().default(false),
  spouseFullName: z.string().optional(),
  spouseBirthdate: z.string().optional()
}).refine((data) => {
  // If hasSpouse is true, spouseFullName and spouseBirthdate are required
  if (data.hasSpouse) {
    return !!data.spouseFullName && !!data.spouseBirthdate;
  }
  return true;
}, {
  message: "Spouse information is required when applying with a spouse",
  path: ["spouseFullName"]
});

export default function PersonalInfoForm() {
  const { formState, updatePersonalInfo, goToNextStep } = useCrsForm();
  
  // Initialize form with current values from context
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formState.fullName,
      email: formState.email,
      birthdate: formState.birthdate,
      maritalStatus: formState.maritalStatus,
      countryOfCitizenship: formState.countryOfCitizenship,
      currentCountry: formState.currentCountry,
      hasSpouse: formState.hasSpouse,
      spouseFullName: formState.spouseFullName,
      spouseBirthdate: formState.spouseBirthdate
    }
  });
  
  // Watch for hasSpouse value to conditionally show spouse fields
  const hasSpouse = form.watch("hasSpouse");

  // Handle form submission
  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    updatePersonalInfo(values);
    goToNextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-800">Personal Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marital Status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MARITAL_STATUS_OPTIONS.map(option => (
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

            {/* Country of Citizenship */}
            <FormField
              control={form.control}
              name="countryOfCitizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Citizenship</FormLabel>
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

            {/* Current Country of Residence */}
            <FormField
              control={form.control}
              name="currentCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Country of Residence</FormLabel>
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
          </div>

          {/* Spouse Information */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Spouse or Common-Law Partner Information</h3>
            
            <FormField
              control={form.control}
              name="hasSpouse"
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
                      Applying with a spouse or common-law partner
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Conditional Spouse Fields */}
            {hasSpouse && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="spouseFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spouse's Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter spouse's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spouseBirthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spouse's Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-end">
            <Button type="submit">
              Continue to Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
