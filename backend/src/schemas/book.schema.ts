import z from "zod";
import { Types } from "mongoose";
import { Language } from "../../types/languages.enum";

export const BookSchema = z.object({
	id: z.string(),
	user: z.instanceof(Types.ObjectId),
	author: z.string().optional(),
	title: z.string(),
	originalLanguage: z.enum(Language),
	tags: z.array(z.string()),
	chapters: z.array(z.instanceof(Types.ObjectId)),
	link: z.string().optional(),
	glossary: z.instanceof(Types.ObjectId),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const NewBookSchema = BookSchema.omit({
	id: true,
	user: true,
	chapters: true,
});
