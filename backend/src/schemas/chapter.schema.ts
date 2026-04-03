import z from "zod";
import { Types } from "mongoose";

export const BookSchema = z.object({
	id: z.string(),
	number: z.number(),
	content: z.string(),
	title: z.string(),
	lastUpdated: z.date(),
	user: z.instanceof(Types.ObjectId),
});

export const NewBookSchema = BookSchema.omit({
	id: true,
	user: true,
});
