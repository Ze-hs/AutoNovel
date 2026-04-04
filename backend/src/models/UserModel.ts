import mongoose, { Schema, model } from "mongoose";
import { User, DBUser } from "../types";
import { RoleSchema } from "../schemas/user.schema";

const userSchema: Schema = new Schema<DBUser>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	passwordHash: String,
	role: {
		type: String,
		enum: RoleSchema.options,
		default: "user",
		required: true,
	},
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
});

userSchema.set("toJSON", {
	transform: (_doc, ret: any): User => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		delete ret.passwordHash;
		return ret;
	},
});

export default model<DBUser>("User", userSchema);
