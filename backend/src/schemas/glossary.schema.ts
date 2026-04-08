import z from "zod";

export const GlossarySchema = z.object({
	terms: z.record(z.string(), z.string()),
	createdAt: z.date(),
	updatedAt: z.date(),
});
