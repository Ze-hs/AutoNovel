import { Schema, model } from "mongoose";

const chapterSchema: Schema = new Schema({
	number: { type: Number },
	title: { type: String, required: true },
	content: String,
	lastUpdated: { type: Date, default: new Date() },
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
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

export default model("Book", chapterSchema);
