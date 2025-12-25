/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";

const registerValidationZodSchema = z
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

export const registerPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
      },
    };

    const validatedFields = registerValidationZodSchema.safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));
    const res = await fetch(
      "http://localhost:3001/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      }
    ).then((res) => res.json());
    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};
