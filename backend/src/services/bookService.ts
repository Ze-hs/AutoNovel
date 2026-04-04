import { NewBook, Book } from "../types";
import BookModel from "../models/BookModel";

const getBook = async (id: string): Promise<Book> => {
	const book = await BookModel.findOne({ _id: id }).lean();
	if (!book) {
		throw new Error(`Book ${id} not found`);
	}
	return book;
};

const getAllBooksByUser = async (userId: string): Promise<Book[]> => {
	return await BookModel.find({ user: userId });
};

const addBook = async (book: NewBook, userID: string): Promise<Book> => {
	const newBookData = {
		...book,
		userID,
	};

	const newBook = new BookModel(newBookData);
	const savedBook = await newBook.save();

	if (!savedBook) {
		throw new Error("Could not add new book");
	}

	return savedBook;
};

const updateBook = async (
	bookId: string,
	userId: string,
	book: Book,
): Promise<Book> => {
	const updatedBook = await BookModel.findOneAndUpdate(
		{ _id: bookId, user: userId },
		book,
		{ returnDocument: "after" },
	);

	if (!updatedBook) {
		throw new Error(`Book with id ${bookId} not found`);
	}

	return updatedBook;
};

const deleteBook = async (bookId: string, userId: string) => {
	const deletedBook = await BookModel.findOneAndDelete({
		_id: bookId,
		userId,
	});

	if (!deletedBook) {
		throw new Error(`Book ${bookId} could not be deleted`);
	}
};

export default {
	getBook,
	getAllBooksByUser,
	addBook,
	updateBook,
	deleteBook,
};
