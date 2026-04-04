import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel";
import { JwtPayloadSchema } from "../schemas/user.schema";
import config from "../utils/config";
import { JwtUser } from "../../types/express";

export const extractBearerAuth = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const authorization = req.get("authorization");
	if (!authorization || !authorization.startsWith("Bearer ")) {
		next(new Error("Malformatted Request"));
	}

	const bearerToken = req.get("authorization") as string;
	const decodedToken = jwt.verify(
		bearerToken.replace("Bearer ", ""),
		config.SECRET,
	);

	const token = JwtPayloadSchema.parse(decodedToken);

	req.user = token;
	next();
};

export const verifyJWTAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.cookies);
		const autoNovelToken = req.cookies.autoNovelToken;

		const userToken = jwt.verify(autoNovelToken, config.SECRET);

		const token = JwtPayloadSchema.parse(userToken) as JwtUser;
		req.user = token;
		next();
	} catch (err: unknown) {
		res.clearCookie("autoNovelToken");
		next(err);
	}
};

export const verifyUser = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const autoNovelToken = req.cookies.autoNovelToken;
	const userToken = jwt.verify(autoNovelToken, config.SECRET);

	const token = JwtPayloadSchema.parse(userToken);
	const user = await UserModel.findById(token.id);

	if (!user) {
		throw new Error("User not found");
	}

	req.user = token;

	next();
};
