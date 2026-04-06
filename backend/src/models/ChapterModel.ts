import { Schema, model } from "mongoose";
import { Chapter } from "../types";

const chapterSchema: Schema = new Schema<Chapter>({
	part: { type: Number },
	title: { type: String, required: true },
	content: String,
	translation: String,
	lastUpdated: { type: Date, default: Date.now() },
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	book: {
		type: Schema.Types.ObjectId,
		ref: "Book",
	},
});

// Cannot change the toJson representation without lots of work
// https://stackoverflow.com/questions/65897965/how-to-typescript-mongoose-toobject

chapterSchema.set("toJSON", {
	transform: (_doc, ret: any) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

export default model<Chapter>("Chapter", chapterSchema);
