/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import z from "zod";

const loginValidationZodSchema = z.object({
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

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validatedFields = loginValidationZodSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }
    const response = await fetch("http://localhost:3001/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.log(error);
    return {
      message: "Login failed",
    };
  }
};
