import { Schema, model } from "mongoose";
import { User, DBUser } from "../types";
import { RoleSchema } from "../schemas/user.schema";
import { Language } from "../../types/languages.enum";

const userSchema: Schema = new Schema<DBUser>(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: String,
		role: {
			type: String,
			enum: RoleSchema.options,
			default: "user",
			required: true,
		},
		languagePref: {
			type: String,
			enum: Language,
			default: Language["English"],
			required: true,
		},
	},
	{ timestamps: true },
);

userSchema.set("toJSON", {
	transform: (_doc, ret: any): User => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		delete ret.password;
		return ret;
	},
});

export default model<DBUser>("User", userSchema);
