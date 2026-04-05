import { NewBook, Book } from "../types";
import bookRepository from "../repositories/bookRepository";
import userRepository from "../repositories/userRepository";

const getBook = async (bookId: string): Promise<Book> => {
	const book = await bookRepository.getById(bookId);

	if (!book) {
		throw new Error(`Book ${bookId} not found`);
	}

	return book;
};

const getAllBooksByUser = async (userId: string): Promise<Book[]> => {
	return await bookRepository.getByUser(userId);
};

const addBook = async (book: NewBook, userId: string): Promise<Book> => {
	const newBookData = {
		...book,
		user: userId,
	};

	if (!(await userRepository.getById(userId))) {
		throw new Error("User not found");
	}

	const newBook = await bookRepository.create(newBookData);

	if (!newBook) {
		throw new Error("Could not add new book");
	}

	await userRepository.addBookToUser(userId, newBook.id);

	return newBook;
};

const updateBook = async (
	bookId: string,
	userId: string,
	book: Book,
): Promise<Book> => {
	const updatedBook = await bookRepository.updateById(bookId, userId, book);

	if (!updatedBook) {
		throw new Error(`Book with id ${bookId} not found`);
	}

	return updatedBook;
};

const deleteBook = async (bookId: string, userId: string) => {
	const deletedBook = await bookRepository.deleteById(bookId, userId);

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
