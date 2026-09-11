import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ message: "Email is required"})
        .min(1, "Email is required")
        .email("Please enter a valid email"),

    password: z
        .string({ message: "Password is required"})
        .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  firstname: z
    .string({ message: 'First name is required' })
    .min(1, 'First name is required'),

  lastname: z
    .string({ message: 'Last name is required' })
    .min(1, 'Last name is required'),

  email: z
    .string({ message: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email address'),

  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),

  confirmPassword: z
    .string({ message: 'Please confirm your password' })
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type SignupFormData = z.infer<typeof signupSchema>;