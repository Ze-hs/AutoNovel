import { Request, Response, NextFunction } from "express";
import {
	LoginCredentialsSchema,
	RegisterDataSchema,
} from "../schemas/user.schema";
import { NewBookSchema } from "../schemas/book.schema";

export const RegisterParser = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = await RegisterDataSchema.parse(req.body);
		req.body = parsed;
		next();
	} catch (error: unknown) {
		next(error);
	}
};

export const LoginParser = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = await LoginCredentialsSchema.parse(req.body);
		req.body = parsed;
		next();
	} catch (error: unknown) {
		next(error);
	}
};

// MiddleWare
export const NewBookParser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = NewBookSchema.parse(req.body);
		req.body = parsed;
		next();
	} catch (error: any) {
		res.status(400).json({ error: error.errors });
	}
};
