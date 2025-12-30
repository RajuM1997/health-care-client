import z from "zod";

export const updatePatientZodSchema = z.object({
  name: z.string().optional(),
  profilePhoto: z.string().optional(),
  address: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
