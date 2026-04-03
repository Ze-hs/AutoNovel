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

export const verifyUser = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const token = req.user as JwtUser;
	const user = await UserModel.findById(token.id);

	if (!user) {
		throw new Error("User not found");
	}
	next();
};
