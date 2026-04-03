import z from "zod";
import { Types } from "mongoose";

export const BookSchema = z.object({
	id: z.string(),
	author: z.string().optional(),
	link: z.string().optional(),
	title: z.string(),
	user: z.instanceof(Types.ObjectId),
});

export const NewBookSchema = BookSchema.omit({
	id: true,
	user: true,
});
