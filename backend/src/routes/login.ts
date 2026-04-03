import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginCredentials } from "../types";
import { LoginParser } from "../middlewares/parserMiddleware";
import UserModel from "../models/UserModel";
import config from "../utils/config";

const router = express.Router();

router.post(
	"/",
	LoginParser,
	async (req: Request<unknown, unknown, LoginCredentials>, res: Response) => {
		const { username, password } = req.body;

		const user = await UserModel.findOne({ username });
		const passwordCorrect =
			user === null
				? false
				: await bcrypt.compare(password, user.passwordHash);

		if (!(user && passwordCorrect)) {
			return res.status(401).json({
				error: "invalid username or password",
			});
		}

		const userForToken = {
			username: user.username,
			id: user._id,
		};

		const token = jwt.sign(userForToken, config.SECRET);

		return res.status(200).send({
			token,
			username: user.username,
			name: user.name,
		});
	},
);

export default router;
