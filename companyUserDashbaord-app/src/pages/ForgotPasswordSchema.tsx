import { z } from "zod";

export const ForgotPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
        .string()
        .min(8, "Confirm Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
