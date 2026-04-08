import z from "zod";
import { Types } from "mongoose";
import { Language } from "../../types/languages.enum";

export const TranslationSchema = z.object({
	id: z.string(),
	book: z.instanceof(Types.ObjectId),
	chapter: z.instanceof(Types.ObjectId),
	chapterNumber: z.number(),
	title: z.string(),
	content: z.string(),
	language: z.enum(Language),
	user: z.instanceof(Types.ObjectId),
	createdAt: z.date(),
	updatedAt: z.date(),
});
