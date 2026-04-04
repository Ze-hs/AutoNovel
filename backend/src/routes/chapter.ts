// import express from "express";
// import { Request, Response } from "express";
// import { JwtUser } from "../../types/express";

// import bookService from "../services/bookService";
// import { verifyJWTAuth } from "../middlewares/authMiddleware";
// import { NewBookParser } from "../middlewares/parserMiddleware";

// const router = express.Router();

// router.use(verifyJWTAuth);

// router.get("/", async (req: Request, res: Response) => {
// 	const user = req.user as JwtUser;
// 	res.json(await bookService.getAllBooksByUser(user.id));
// });

// router.get("/:id", async (req: Request, res: Response) => {
// 	const user = req.user as JwtUser;
// 	const id = req.params.id as string;
// 	const book = await bookService.getBook(id);

// 	if (!book) {
// 		return res.status(404);
// 	} else if (book.user.toString() != user.id) {
// 		return res.status(401);
// 	} else {
// 		return res.json(book);
// 	}
// });

// router.put("/:id", NewBookParser, async (req: Request, res) => {
// 	const id = req.params.id as string;
// 	const user = req.user as JwtUser;

// 	const updateBook = await bookService.updateBook(id, user.id, req.body);
// 	if (!updateBook) {
// 		return res.status(404);
// 	}
// 	return res.json(updateBook);
// });

// // router.delete("/:id", (req, res) => {});
// router.post("/", NewBookParser, async (req: Request, res: Response) => {
// 	const user = req.user as JwtUser;

// 	const addedBook = await bookService.addBook(req.body, user.id);
// 	if (!addedBook) {
// 		return res.status(404);
// 	}
// 	return res.json(addedBook);
// });

// router.delete("/:id", async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const user = req.user as JwtUser;
// 	await bookService.deleteBook(id, user.id);

// 	return res.status(200).json({ message: "Book deleted successfully", id });
// });

// export default router;
