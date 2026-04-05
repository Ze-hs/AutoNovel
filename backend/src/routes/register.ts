import express, { Request, Response } from "express";

import { RegisterData } from "../types";
import { RegisterParser } from "../middlewares/parserMiddleware";
import userService from "../services/userService";

const registerRouter = express.Router();

registerRouter.post(
	"/",
	RegisterParser,
	async (req: Request<unknown, unknown, RegisterData>, res: Response) => {
		const user = await userService.createUser(req.body);
		return res.status(201).json(user);
	},
);

export default registerRouter;
