import { z } from "zod";
import { services } from "@/data/services";

const phoneSchema = z.string().trim().transform((value) => value.replace(/[\s()-]/g, "")).pipe(z.string().regex(
  /^(?:0[789]\d{9}|\+234[789]\d{9})$/,
  "Enter a Nigerian mobile number, for example 08012345678 or +2348012345678.",
));
const emailSchema = z.string().trim().email("Enter a valid email address.").max(254);
const requiredText = (label: string, max = 300) => z.string().trim().min(2, `${label} is required.`).max(max, `${label} is too long.`);
const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];

export const quoteSchema = z.object({
  fullName: requiredText("Full name", 120),
  phone: phoneSchema,
  email: emailSchema,
  state: z.enum(["Rivers", "Cross River", "Bayelsa", "Imo", "Abia", "Akwa Ibom", "Enugu", "Other"], { error: "Choose a state." }),
  serviceType: z.enum(serviceSlugs, { error: "Choose a service." }),
  siteAddress: requiredText("Site address", 300),
  message: requiredText("Message", 3000),
  consent: z.literal(true, { error: "Please agree to be contacted about this request." }),
  website: z.string().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
});

export const vendorSchema = z.object({
  companyName: requiredText("Company name", 160),
  contactPerson: requiredText("Contact person", 120),
  role: requiredText("Role", 120),
  phone: phoneSchema,
  email: emailSchema,
  interests: z.array(z.enum(["Preventive maintenance", "Corrective maintenance", "Transformer installation", "Meter and DISCO coordination", "Other"])).min(1, "Select at least one area of interest."),
  regions: requiredText("Regions of interest", 300),
  message: requiredText("Message", 3000),
  consent: z.literal(true, { error: "Please agree to be contacted about this enquiry." }),
  website: z.string().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
});

export type QuoteSubmission = z.infer<typeof quoteSchema>;
export type VendorSubmission = z.infer<typeof vendorSchema>;
