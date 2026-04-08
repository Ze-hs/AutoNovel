import z from "zod";
import { Types } from "mongoose";

export const ChapterSchema = z.object({
	id: z.string(),
	book: z.instanceof(Types.ObjectId),
	chapterNumber: z.number(),
	title: z.string(),
	content: z.string(),
	user: z.instanceof(Types.ObjectId),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const NewChapterSchema = ChapterSchema.omit({
	id: true,
	user: true,
	createdAt: true,
	updatedAt: true,
}).extend({
	book: z.string(),
});

export const ChapterListItem = ChapterSchema.omit({
	content: true,
	user: true,
	chapterNumber: true,
});
