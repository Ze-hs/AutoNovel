export {};

declare global {
	namespace Express {
		interface Request {
			user?: JwtUser;
		}
	}
}

export type JwtUser = {
	id: string;
	username: string;
};
