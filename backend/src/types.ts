import z from "zod";
import { BookSchema, NewBookSchema } from "./schemas/book.schema";

import {
	AuthResponseSchema,
	DBUserSchema,
	JwtPayloadSchema,
	LoginCredentialsSchema,
	NewUserSchema,
	RegisterDataSchema,
	RoleSchema,
	UserSchema,
} from "./schemas/user.schema";

export type Book = z.infer<typeof BookSchema>;
export type NewBook = z.infer<typeof NewBookSchema>;

export interface IdParam {
	id: string;
}

export type User = z.infer<typeof UserSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterData = z.infer<typeof RegisterDataSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type DBUser = z.infer<typeof DBUserSchema>;
export type roles = z.infer<typeof RoleSchema>;
export type jsonWebToken = z.infer<typeof JwtPayloadSchema>;

export type user = {
	id: string;
	username: string;
};
