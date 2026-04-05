import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JwtPayloadSchema } from "../schemas/user.schema";
import config from "../utils/config";
import { JwtUser } from "../../types/express";

export const verifyJWTAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
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
