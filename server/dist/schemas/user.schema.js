"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeactivateSchema = exports.UserSignInSchema = exports.UserUpdateSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        password: zod_1.z
            .string({ required_error: "password is required" })
            .min(6, "password is too short- should be 6 character minimum"),
        passwordConfirmation: zod_1.z.string({
            required_error: "confirm password us required",
        }),
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Not a valid email"),
    })
        .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
exports.UserSchema = UserSchema;
const UserSignInSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Not a valid email"),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
exports.UserSignInSchema = UserSignInSchema;
const InfoSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Not a valid email").optional(),
    }),
});
const AvatarSchema = zod_1.z.object({
    body: zod_1.z.object({
        avatar_url: zod_1.z.string().optional(),
    }),
});
const ConfirmPasswordSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        newPassword: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, "Password is too short - should be 6 characters minimum"),
        passwordConfirmation: zod_1.z.string({
            required_error: "Confirmation password is required",
        }),
    })
        .refine((data) => data.newPassword !== data.passwordConfirmation, {
        message: "Choose a different password",
        path: ["passwordCreation"],
    }),
});
const UserUpdateSchema = zod_1.z.union([
    InfoSchema,
    AvatarSchema,
    ConfirmPasswordSchema,
]);
exports.UserUpdateSchema = UserUpdateSchema;
const UserDeactivateSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "Confirmation password is required" }),
    }),
});
exports.UserDeactivateSchema = UserDeactivateSchema;
//# sourceMappingURL=user.schema.js.map