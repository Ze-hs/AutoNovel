import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.string(),
	MONGODB_URI: z.string(),
	SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	throw new Error("Environment validation failed");
}

export default {
	...env.data,
};
