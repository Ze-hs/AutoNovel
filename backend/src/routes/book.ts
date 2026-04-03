import express from "express";
import { Request, Response } from "express";
import { JwtUser } from "../../types/express";

import bookService from "../services/bookService";
import { extractBearerAuth, verifyUser } from "../middlewares/authMiddleware";
import { NewNoteParser } from "../middlewares/parserMiddleware";

const router = express.Router();

router.use(extractBearerAuth);
router.use(verifyUser);

router.get("/", async (req: Request, res: Response) => {
	const user = req.user as JwtUser;
	res.json(await bookService.getAllBooksByUser(user.id));
});

router.get("/:id", async (req: Request, res: Response) => {
	const user = req.user as JwtUser;
	const id = req.params.id as string;
	const note = await bookService.getBook(id);

	if (!note) {
		return res.status(404);
	} else if (note.user.toString() != user.id) {
		return res.status(401);
	} else {
		return res.json(note);
	}
});

router.put("/:id", NewNoteParser, async (req: Request, res) => {
	const id = req.params.id as string;
	const user = req.user as JwtUser;

	const updateNote = await bookService.updateBook(id, user.id, req.body);
	if (!updateNote) {
		return res.status(404);
	}
	return res.json(updateNote);
});

// router.delete("/:id", (req, res) => {});
router.post("/", NewNoteParser, async (req: Request, res: Response) => {
	const user = req.user as JwtUser;
	const addedNote = await bookService.addBook(req.body, user.id);
	if (!addedNote) {
		return res.status(404);
	}
	return res.json(addedNote);
});

router.delete("/:id", async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const user = req.user as JwtUser;
	await bookService.deleteBook(id, user.id);

	return res.status(200).json({ message: "Note deleted successfully", id });
});

export default router;
