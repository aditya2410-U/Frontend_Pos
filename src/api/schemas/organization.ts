import { z } from "zod";

export const PlanType = {
  FREE: "FREE",
  STARTER: "STARTER",
  GROWTH: "GROWTH",
  PRO: "PRO",
  ENTERPRISE: "ENTERPRISE",
} as const;

export type PlanType = (typeof PlanType)[keyof typeof PlanType];

export const BusinessType = {
  PHARMACY: "PHARMACY",
  FMCG: "FMCG",
  COSMETICS: "COSMETICS",
  FOOD: "FOOD",
  ELECTRONICS: "ELECTRONICS",
  APPAREL: "APPAREL",
  OTHER: "OTHER",
} as const;

export type BusinessType = (typeof BusinessType)[keyof typeof BusinessType];

export const OrganizationStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  DISABLED: "DISABLED",
} as const;

export type OrganizationStatus = (typeof OrganizationStatus)[keyof typeof OrganizationStatus];

export const CreateOrganizationSchema = z.object({
  // Organization Details
  name: z.string().min(1, "Organization name is required"),
  legalName: z.string().optional(),
  businessType: z.nativeEnum(BusinessType),
  industryTemplate: z.string().optional(),
  logo: z.string().url("Invalid logo URL").optional().or(z.literal("")),
  
  // Contact Info
  email: z.string().email("Invalid organization email").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  
  // Address
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  timezone: z.string().default("Asia/Kolkata"),
  currency: z.string().default("INR"),
  
  // Tax Info
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  
  // Plan Limits
  plan: z.nativeEnum(PlanType),
  maxOutlets: z.coerce.number().int().min(1, "Max outlets must be at least 1"),
  maxUsers: z.coerce.number().int().min(1, "Max users must be at least 1"),
  trialEndsAt: z.string().optional(), // ISO string from date picker

  // Owner Details (User)
  ownerName: z.string().min(1, "Owner name is required"),
  ownerEmail: z.string().email("Invalid owner email"),
  ownerPassword: z.string().min(6, "Owner password must be at least 6 characters"),
});

export const UpdateOrganizationSchema = z.object({
  name: z.string().min(1).optional(),
  legalName: z.string().optional(),
  businessType: z.nativeEnum(BusinessType).optional(),
  industryTemplate: z.string().optional(),
  status: z.nativeEnum(OrganizationStatus).optional(),
  logo: z.string().url().optional().or(z.literal("")),
  
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  
  plan: z.nativeEnum(PlanType).optional(),
  maxOutlets: z.coerce.number().int().min(1).optional(),
  maxUsers: z.coerce.number().int().min(1).optional(),
  trialEndsAt: z.string().optional().nullable(),
});

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  legalName: z.string().nullable(),
  businessType: z.nativeEnum(BusinessType),
  industryTemplate: z.string().nullable(),
  status: z.nativeEnum(OrganizationStatus),
  logo: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  website: z.string().nullable(),
  addressLine1: z.string().nullable(),
  addressLine2: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  pincode: z.string().nullable(),
  timezone: z.string(),
  currency: z.string(),
  gstNumber: z.string().nullable(),
  panNumber: z.string().nullable(),
  plan: z.nativeEnum(PlanType),
  maxOutlets: z.number(),
  maxUsers: z.number(),
  trialEndsAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  owner: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
  }).optional(),
  _count: z.object({
    outlets: z.number().optional(),
    users: z.number().optional()
  }).optional()
});

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
