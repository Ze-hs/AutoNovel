import { Schema, model } from "mongoose";
import { Book } from "../types";

const bookSchema: Schema = new Schema<Book>({
	author: { type: String },
	link: { type: String },
	title: { type: String, required: true },
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	chapters: [
		{
			type: Schema.Types.ObjectId,
			ref: "Chapter",
		},
	],
});

bookSchema.set("toJSON", {
	transform: (_doc, ret: any) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

export default model<Book>("Book", bookSchema);
