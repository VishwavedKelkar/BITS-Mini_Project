import { z } from "zod";

export const LoginPageSchema = z.object({
    username: z.string().min(1, "Username required"),
    password: z.string().min(8, "Password Must be minimum 8 characters long"),
})

export type LoginPageSchema = z.infer<typeof LoginPageSchema>;