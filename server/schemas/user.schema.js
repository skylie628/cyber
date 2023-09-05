import { z } from "zod";
const userSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      password: z
        .string({ required_error: "password is required" })
        .min("password is too short- should be 6 character minimum"),
      confirmPassword: z.string({
        required_error: "confirm password us required",
      }),
      email: z
        .string({ required_error: "Email is required" })
        .email("Not a valid email"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

const UserSigninSchema = zod.object({
  body: {
    email: z
      .string({ required_error: "Email is required" })
      .email("Not a valid email"),
    password: z.string({ required_error: "Password is required" }),
  },
});
