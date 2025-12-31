/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerPatientValidationZodSchema } from "@/zod/auth.validation";

export const registerPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
    };

    if (
      zodValidator(payload, registerPatientValidationZodSchema).success ===
      false
    ) {
      return zodValidator(payload, registerPatientValidationZodSchema);
    }

    const validatePayload: any = zodValidator(
      payload,
      registerPatientValidationZodSchema
    ).data;

    const registerData = {
      password: validatePayload.password,
      patient: {
        name: validatePayload.name,
        email: validatePayload.email,
        address: validatePayload.address,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/user/create-patient", {
      body: newFormData,
    });

    const result = await res.json();
    if (result.success) {
      await loginUser(_currentState, formData);
    }
    return result;
  } catch (error: any) {
    console.log(error);
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again"
      }`,
    };
  }
};
