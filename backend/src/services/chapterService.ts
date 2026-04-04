import { Chapter, ChapterListItem, NewChapter } from "../types";
import BookModel from "../models/BookModel";
import ChapterModel from "../models/ChapterModel";

const getAllBookChapters = async (
	bookId: string,
	userId: string,
): Promise<ChapterListItem[]> => {
	const book = await BookModel.findOne({ _id: bookId, user: userId })
		.populate<{
			chapters: Chapter[];
		}>("chapters", "title number lastUpdated")
		.select("chapters");

	if (!book) {
		throw new Error(`Book ${bookId} not found`);
	}

	return book.chapters;
};

const getChapter = async (chapterId: string, userId: string) => {
	const chapter = await ChapterModel.findOne({
		_id: chapterId,
		user: userId,
	});

	if (!chapter) {
		throw new Error(`Chapter ${chapterId} not found`);
	}

	return chapter;
};

const addChapter = async (
	chapter: NewChapter,
	userID: string,
): Promise<Chapter> => {
	const bookId = chapter.book;

	const book = await BookModel.findById(bookId);
	if (!book) {
		throw new Error(`Book unable to be found`);
	}

	const newChapterData = {
		...chapter,
		user: userID,
		book: book,
		lastUpdated: Date.now(),
	};

	const newChapter = new ChapterModel(newChapterData);
	const savedChapter = await newChapter.save();

	book.chapters = book.chapters.concat(savedChapter._id);
	await book.save();

	if (!savedChapter) {
		throw new Error(`Chapter unable to be added`);
	}

	return savedChapter;
};

const updateChapter = async (
	chapterId: string,
	userId: string,
	chapter: Chapter,
): Promise<Chapter> => {
	const updatedChapter = await ChapterModel.findOneAndUpdate(
		{ _id: chapterId, user: userId },
		chapter,
		{ returnDocument: "after" },
	);

	if (!updatedChapter) {
		throw new Error(`Chapter with id ${chapterId} not found`);
	}

	return updatedChapter;
};

const deleteChapter = async (chapterId: string, userId: string) => {
	const deletedChapter = await ChapterModel.findOneAndDelete({
		_id: chapterId,
		user: userId,
	});

	if (!deletedChapter) {
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
