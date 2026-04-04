import express, { Request, Response } from "express";
import { RegisterData } from "../types";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";
import { RegisterParser } from "../middlewares/parserMiddleware";

const registerRouter = express.Router();

registerRouter.post(
	"/",
	RegisterParser,
	async (req: Request<unknown, unknown, RegisterData>, res: Response) => {
		const { name, email, username, password } = req.body;
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = new UserModel({
			name,
			email,
			username,
			passwordHash,
		});
		const savedUser = await user.save();

		if (!savedUser) {
			throw new Error("Error creating user");
		}

		return res.status(201).json(savedUser);
	},
);

export default registerRouter;
