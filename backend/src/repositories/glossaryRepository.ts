import GlossaryModel from "../models/GlossaryModel";

const getGlossary = async (bookId: string, userId: string) => {
	return await GlossaryModel.findOne({ book: bookId, user: userId });
};

export default {
	getGlossary,
};
