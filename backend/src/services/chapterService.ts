import { Book, Chapter, ChapterListItem, NewChapter } from "../types";
import BookModel from "../models/BookModel";
import ChapterModel from "../models/ChapterModel";

const getAllBookChapters = async (
	bookId: string,
): Promise<ChapterListItem[]> => {
	const book = await BookModel.findById(bookId)
		.populate<{
			chapters: Chapter[];
		}>("chapters", "title number lastUpdated")
		.select("chapters");

	if (!book) {
		throw new Error(`Book ${bookId} not found`);
	}

	return book.chapters;
};

const getChapter = async (chapterId: string) => {
	const chapter = await ChapterModel.findById(chapterId);

	if (!chapter) {
		throw new Error(`Chapter ${chapterId} not found`);
	}

	return chapter;
};

const addChapter = async (
	chapter: NewChapter,
	userID: string,
): Promise<Book> => {
	const newChapterData = {
		...chapter,
		userID,
	};

	const newChapter = new BookModel(newChapterData);
	const savedBook = await newChapter.save();

	if (!savedBook) {
		throw new Error(`Chapter unable to be added`);
	}

	return savedBook;
};

const updateChapter = async (
	chapterId: string,
	userId: string,
	chapter: Chapter,
): Promise<Book> => {
	const updatedBook = await BookModel.findOneAndUpdate(
		{ _id: chapterId, user: userId },
		chapter,
		{ returnDocument: "after" },
	);

	if (!updatedBook) {
		throw new Error(`Book with id ${chapterId} not found`);
	}

	return updatedBook;
};

const deleteChapter = async (chapterId: string, userId: string) => {
	const deletedBook = await BookModel.findOneAndDelete({
		_id: chapterId,
		userId,
	});

	if (!deletedBook) {
		throw new Error(`Book ${chapterId} could not be deleted`);
	}
};

export default {
	getChapter,
	getAllBookChapters,
	addChapter,
	updateChapter,
	deleteChapter,
};
