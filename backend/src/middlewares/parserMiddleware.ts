import { Request, Response, NextFunction } from "express";
import {
	LoginCredentialsSchema,
	RegisterDataSchema,
} from "../schemas/user.schema";
import { NewBookSchema } from "../schemas/book.schema";
import { NewChapterSchema } from "../schemas/chapter.schema";

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
	const parsed = await LoginCredentialsSchema.parse(req.body);
	req.body = parsed;
	next();
};

// MiddleWare
export const NewBookParser = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const parsed = NewBookSchema.parse(req.body);
	req.body = parsed;
	next();
};

export const NewChapterParser = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const parsed = NewChapterSchema.parse(req.body);
	req.body = parsed;
	next();
};
