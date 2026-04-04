import { NewBook, Book } from "../types";
import BookModel from "../models/BookModel";
import UserModel from "../models/UserModel";

const getBook = async (bookId: string): Promise<Book> => {
	const book = await BookModel.findById(bookId);
	if (!book) {
		throw new Error(`Book ${bookId} not found`);
	}
	return book;
};

const getAllBooksByUser = async (userId: string): Promise<Book[]> => {
	return await BookModel.find({ user: userId });
};

const addBook = async (book: NewBook, userID: string): Promise<Book> => {
	const newBookData = {
		...book,
		user: userID,
	};

	const user = await UserModel.findById(userID);

	if (!user) {
		throw new Error("User not found");
	}

	const newBook = new BookModel(newBookData);
	const savedBook = await newBook.save();

	if (!savedBook) {
		throw new Error("Could not add new book");
	}
	user.books = user.books.concat(savedBook._id);
	await user.save();

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
		user: userId,
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
