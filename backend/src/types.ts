import z from "zod";
import { BookSchema, NewBookSchema } from "./schemas/book.schema";

import {
	ChapterListItem,
	ChapterSchema,
	NewChapterSchema,
} from "./schemas/chapter.schema";

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
import { TranslationSchema } from "./schemas/translations.schema";
import { GlossarySchema } from "./schemas/glossary.schema";

export type Book = z.infer<typeof BookSchema>;
export type NewBook = z.infer<typeof NewBookSchema>;

export type Chapter = z.infer<typeof ChapterSchema>;
export type NewChapter = z.infer<typeof NewChapterSchema>;
export type ChapterListItem = z.infer<typeof ChapterListItem>;

export type Translation = z.infer<typeof TranslationSchema>;

export type Glossary = z.infer<typeof GlossarySchema>;

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
