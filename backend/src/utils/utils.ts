import bcrypt from "bcrypt";

export const encrypt = async (password: string): Promise<string> => {
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
};
