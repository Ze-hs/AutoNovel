import BookModel from "../models/BookModel";
import { Book, ChapterListItem, NewBook } from "../types";

const getById = async (id: string): Promise<Book | null> => {
	return await BookModel.findById(id);
};

const getByUser = async (userId: string): Promise<Book[]> => {
	return await BookModel.find({ user: userId });
};

const create = async (book: NewBook): Promise<Book> => {
	const newBook = new BookModel(book);
	return await newBook.save();
};

const updateById = async (
	bookId: string,
	userId: string,
	book: Partial<Book>,
): Promise<Book | null> => {
	const updatedBook = await BookModel.findOneAndUpdate(
		{ _id: bookId, user: userId },
		book,
		{ returnDocument: "after" },
	);

	return updatedBook;
};

const deleteById = async (id: string, userId: string): Promise<Book | null> => {
	return await BookModel.findOneAndDelete({ _id: id, user: userId });
};

const getBookChaptersField = async (
	bookId: string,
	userId: string,
): Promise<ChapterListItem[] | null> => {
	const book = await BookModel.findOne({ _id: bookId, user: userId })
		.populate<{
			chapters: ChapterListItem[];
		}>("chapters", "title number lastUpdated")
		.select("chapters")
		.lean();

	return book?.chapters ?? null;
};

const addChapterToBook = (
	userId: string,
	BookId: string,
	chapterId: string,
) => {
	// return BookModel.findOne({_id: })

	BookModel.findOneAndUpdate(
		{ _id: BookId, user: userId },
		{ $push: { chapters: chapterId } },
		{ returnDocument: "after" },
	);
};

export default {
	getById,
	getByUser,
	create,
	updateById,
	deleteById,
	getBookChaptersField,
	addChapterToBook,
};
