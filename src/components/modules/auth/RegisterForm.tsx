/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerPatient } from "@/services/auth/register";
import { useActionState } from "react";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      if (error?.message) {
        return error.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* name */}
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Evil Rabbit"
            />
            {getFieldError("name") && (
              <FieldDescription className="text-red-500">
                {getFieldError("name")}
              </FieldDescription>
            )}
          </Field>
          {/* address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Khulna"
            />
            {getFieldError("address") && (
              <FieldDescription className="text-red-500">
                {getFieldError("address")}
              </FieldDescription>
            )}
          </Field>
          {/* email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
            />
            {getFieldError("email") && (
              <FieldDescription className="text-red-500">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>
          {/* password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="*******"
            />
            {getFieldError("password") && (
              <FieldDescription className="text-red-500">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
          {/* password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="*******"
            />
            {getFieldError("confirmPassword") && (
              <FieldDescription className="text-red-500">
                {getFieldError("confirmPassword")}
              </FieldDescription>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              Create Account
            </Button>
            <Button variant={"outline"} type="button">
              Sign up with google
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account?
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
