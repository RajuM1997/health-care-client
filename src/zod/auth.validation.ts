/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerPatientValidationZodSchema = z
  .object({
    email: z.email({
      error: "Email is required",
    }),
    address: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    password: z
      .string()
      .min(6, {
        error:
          "Password is required and Password must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm password is required and must be at least 6 characters log",
    }),
  })
  .refine((data: any) => data.password == data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z
    .string()
    .min(6, {
      error:
        "Password is required and Password must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});
