import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, { message: "Name  must be at least  3 characters." }),
  email: z.string().email({ message: "Email must be a valid email." }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters." })
    .max(255, { message: "Password must be less than 255 characters." }),
});
