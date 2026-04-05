import z from "zod";
import { Types } from "mongoose";

export const ChapterSchema = z.object({
	id: z.string(),
	number: z.number(),
	content: z.string(),
	translation: z.string().optional(),
	title: z.string(),
	lastUpdated: z.date(),
	user: z.instanceof(Types.ObjectId),
	book: z.instanceof(Types.ObjectId),
});

export const NewChapterSchema = ChapterSchema.omit({
	id: true,
	user: true,
	lastUpdated: true,
	translation: true,
}).extend({
	book: z.string(),
});

export const ChapterListItem = ChapterSchema.omit({
	content: true,
	user: true,
	translation: true,
});
