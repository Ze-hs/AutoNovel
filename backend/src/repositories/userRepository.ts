import UserModel from "../models/UserModel";
import { RegisterData, User } from "../types";

const getById = (id: string): Promise<User | null> => {
	return UserModel.findById(id);
};

const create = (userDetails: RegisterData): Promise<User> => {
	const newUser = new UserModel(userDetails);
	return newUser.save();
};

const addBookToUser = (userId: string, bookId: string) => {
	return UserModel.findByIdAndUpdate(
		userId,
		{ $push: { books: bookId } },
		{ returnDocument: "after" },
	);
};

export default {
	getById,
	create,
	addBookToUser,
};
