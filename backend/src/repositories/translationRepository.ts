import TranslationModel from "../models/TranslationModel";
import {
	NewTranslation,
	Translation,
	TranslationListItem,
	UpdatedTranslation,
} from "../types";

const getById = async (
	id: string,
	userId: string,
): Promise<Translation | null> => {
	return await TranslationModel.findOne({
		_id: id,
		user: userId,
	});
};

const getByBook = async (
	userId: string,
	bookId: string,
): Promise<Translation[]> => {
	return await TranslationModel.find({
		book: bookId,
		userId: userId,
	});
};

const update = async (
	id: string,
	userId: string,
	newTranslation: UpdatedTranslation,
): Promise<Translation | null> => {
	const translation = await TranslationModel.findOneAndUpdate(
		{ _id: id, user: userId },
		newTranslation,
	);
	return translation;
};

const create = async (newTranslation: NewTranslation): Promise<Translation> => {
	const translation = await new TranslationModel(newTranslation).save();
	return translation;
};

const remove = async (id: string, userId: string): Promise<void> => {
	const translation = TranslationModel.findOneAndDelete({
		_id: id,
		user: userId,
	});
};

const getTranslationList = async (
	userId: string,
	bookId: string,
): Promise<TranslationListItem[]> => {
	const listItems = await TranslationModel.find({
		book: bookId,
		user: userId,
	})
		.select("title chapterNumber language")
		.lean<TranslationListItem[]>();

	return listItems;
};

export default {
	getById,
	getByBook,
	update,
	create,
	remove,
	getTranslationList,
};
