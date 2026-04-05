import BookModel from "../models/BookModel";
import ChapterModel from "../models/ChapterModel";
import { Book, Chapter, NewChapter } from "../types";

const getById = (id: string): Promise<Chapter | null> => {
	return ChapterModel.findById(id);
};

const create = (chapter: NewChapter): Promise<Chapter> => {
	const newChapter = new ChapterModel(chapter);
	return newChapter.save();
};

const updateById = (
	id: string,
	userId: string,
	chapter: Partial<Chapter>,
): Promise<Chapter | null> => {
	const updatedChapter = ChapterModel.findOneAndUpdate(
		{ _id: id, user: userId },
		chapter,
		{ returnDocument: "after" },
	);

	return updatedChapter;
};

const deleteById = (id: string, userId: string): Promise<Book | null> => {
	return BookModel.findOneAndDelete({ _id: id, user: userId });
};

export default {
	getById,
	create,
	updateById,
	deleteById,
};
