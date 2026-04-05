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
				: await bcrypt.compare(password, user.password);

		if (!(user && passwordCorrect)) {
			return res.status(401).json({
				error: "Invalid username or password",
			});
		}

		const userForToken = {
			username: user.username,
			id: user._id,
		};

		// Jwt expiry date
		const token = jwt.sign(userForToken, config.SECRET, {
			expiresIn: "24h",
		});

		// Cookie expiry date, 24 hours
		const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000);
		res.cookie("autoNovelToken", token, {
			httpOnly: true,
			secure: true,
			expires: expiryDate,
		});

		return res.status(200).send({
			name: user.name,
		});
	},
);

export default router;
