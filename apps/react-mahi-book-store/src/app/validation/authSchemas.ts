import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = loginSchema.extend({
  name: z.string().nonempty({ message: "Name is required" }), // Name must not be empty
  email: z.string().email({ message: "Invalid email address" }), // Email validation
  password: z.string().min(6, { message: "Password must be at least 6 characters" }), // Password validation
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters" }), // Confirm password validation
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});
