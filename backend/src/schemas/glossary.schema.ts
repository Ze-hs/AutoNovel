import { Types } from "mongoose";
import z from "zod";

export const GlossarySchema = z.object({
	book: z.instanceof(Types.ObjectId),
	terms: z.record(z.string(), z.string()),
	createdAt: z.date(),
	updatedAt: z.date(),
});
