import { Schema, model } from "mongoose";
import { Book } from "../types";
import { Language } from "../../types/languages.enum";

const bookSchema: Schema = new Schema<Book>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: { type: String, required: true },
		originalLanguage: {
			type: String,
			enum: Language,
			required: true,
		},
		tags: [{ type: String }],
		chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
		glossary: { type: Schema.Types.ObjectId, ref: "Gloassary" },
		author: { type: String },
		link: { type: String },
	},
	{ timestamps: true },
);

bookSchema.set("toJSON", {
	transform: (_doc, ret: any) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

export default model<Book>("Book", bookSchema);
