/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IPatient } from "@/types/patient.interface";
import { updatePatientZodSchema } from "@/zod/patient.validation";

export async function getPatients(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/patient${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getPatientById(id: string) {
  try {
    const response = await serverFetch.get(`/patient/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function updatePatient(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const payload: Partial<IPatient> = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
    };
    const validatedPayload = zodValidator(payload, updatePatientZodSchema).data;

    const response = await serverFetch.patch(`/patient/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function softDeletePatient(id: string) {
  try {
    const response = await serverFetch.delete(`/patient/${id}`);
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function deletePatient(id: string) {
  try {
    const response = await serverFetch.delete(`/patient/${id}`);
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
