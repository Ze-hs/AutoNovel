import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";

import { RegisterData } from "../types";

const createUser = async (registerData: RegisterData) => {
	const { name, username, password } = registerData;
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const savedUser = await userRepository.create({
		name,
		username,
		password: passwordHash,
	});

	if (!savedUser) {
		throw new Error("Error creating user");
	}

	return savedUser;
};

export default {
	createUser,
};
