import { Schema, model } from "mongoose";
import { Book, Glossary } from "../types";

const glossarySchema: Schema = new Schema<Glossary>(
	{
		terms: {
			type: Map,
			of: String,
			default: {},
		},
		book: {
			type: Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
	},

	{ timestamps: true },
);

glossarySchema.set("toJSON", {
	transform: (_doc, ret: any) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

export default model<Glossary>("Glossary", glossarySchema);
