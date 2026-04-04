import express from "express";
import { Request, Response } from "express";
import { JwtUser } from "../../types/express";

import chapterService from "../services/chapterService";
import { verifyJWTAuth } from "../middlewares/authMiddleware";
import { NewChapterParser } from "../middlewares/parserMiddleware";

const router = express.Router();

router.use(verifyJWTAuth);

// Going to change this route later
router.get("/book/:bookId", async (req: Request, res: Response) => {
	const user = req.user as JwtUser;
	const bookId = req.params.bookId as string;
	const chapters = await chapterService.getAllBookChapters(bookId, user.id);
	return res.json(chapters);
});

router.get("/:chapterId", async (req: Request, res: Response) => {
	const user = req.user as JwtUser;
	const chapterId = req.params.chapterId as string;
	const chapter = await chapterService.getChapter(chapterId, user.id);

	if (!chapter) {
		return res.status(404);
	} else if (chapter.user.toString() != user.id) {
		return res.status(401);
	} else {
		return res.json(chapter);
	}
});

router.put("/:chapterId", NewChapterParser, async (req: Request, res) => {
	const chapterId = req.params.chapterId as string;
	const user = req.user as JwtUser;

	const updatedChapter = await chapterService.updateChapter(
		chapterId,
		user.id,
		req.body,
	);

	if (!updatedChapter) {
		return res.status(404);
	}
	return res.json(updatedChapter);
});

router.post("/", NewChapterParser, async (req: Request, res: Response) => {
	const user = req.user as JwtUser;

	const addedChapter = await chapterService.addChapter(req.body, user.id);
	if (!addedChapter) {
		return res.status(404);
	}
	return res.json(addedChapter);
});

router.delete("/:chapterId", async (req: Request, res: Response) => {
	const chapterId = req.params.chapterId as string;
	const user = req.user as JwtUser;
	await chapterService.deleteChapter(chapterId, user.id);

	return res
		.status(200)
		.json({ message: "Chapter deleted successfully", chapterId });
});

export default router;
