import { Schema, model } from "mongoose";
import { Book, Translation } from "../types";
import { Language } from "../../types/languages.enum";

const translationSchema: Schema = new Schema<Translation>(
	{
		book: {
			type: Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		chapter: {
			type: Schema.Types.ObjectId,
			ref: "Chapter",
			required: true,
		},
		chapterNumber: Number,
		title: { type: String, required: true },
		content: String,
		language: {
			type: String,
			enum: Language,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

translationSchema.set("toJSON", {
	transform: (_doc, ret: any) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

export default model<Book>("Translation", translationSchema);
