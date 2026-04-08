import z from "zod";
import { Language } from "../../types/languages.enum";

export const RoleSchema = z.enum(["user", "admin"]);

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	username: z.string(),
	password: z.string(),
	role: RoleSchema,
	languagePref: z.enum(Language),
	createdAt: z.date(),
	updatedAt: z.date(),
	// books: z.array(z.instanceof(Types.ObjectId)),
});

export const NewUserSchema = UserSchema.omit({ id: true });

export const LoginCredentialsSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const RegisterDataSchema = z.object({
	name: z.string(),
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
