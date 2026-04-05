import z from "zod";
import { Types } from "mongoose";

export const RoleSchema = z.enum(["user", "admin"]);

export const UserSchema = z.object({
	id: z.string(),
	username: z.string(),
	email: z.email(),
	password: z.string(),
	name: z.string(),
	role: RoleSchema,
	books: z.array(z.instanceof(Types.ObjectId)),
});

export const NewUserSchema = UserSchema.omit({ id: true });

export const LoginCredentialsSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const RegisterDataSchema = z.object({
	name: z.string(),
	email: z.email(),
	username: z.string(),
	password: z.string(),
});

export const AuthResponseSchema = z.object({
	user: UserSchema,
	accessToken: z.string(),
});

export const DBUserSchema = UserSchema.extend({
	password: z.string(),
});

export const JwtPayloadSchema = z.object({
	id: z.string(),
	username: z.string(),
});
