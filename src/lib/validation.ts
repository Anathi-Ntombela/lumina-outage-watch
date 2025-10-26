import { z } from "zod";

export const outageReportSchema = z.object({
  location: z
    .string()
    .trim()
    .min(3, { message: "Location must be at least 3 characters" })
    .max(200, { message: "Location must be less than 200 characters" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  contact: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Optional field
        // Basic phone validation - allows various formats
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(val) && val.replace(/\D/g, "").length >= 10;
      },
      { message: "Please enter a valid phone number" }
    ),
});

export type OutageReportInput = z.infer<typeof outageReportSchema>;
