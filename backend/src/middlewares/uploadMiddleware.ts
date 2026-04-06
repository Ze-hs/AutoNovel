/* Functions and middlewares related to file uploads*/
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

// https://stackoverflow.com/questions/59097119/using-multer-diskstorage-with-typescript
const fileFilter = (
	_req: Request,
	file: Express.Multer.File,
	callback: FileFilterCallback,
) => {
	if (file.mimetype === "application/epub+zip") {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

const upload = multer({
	dest: "uploads/",
	fileFilter,
});

export const epubUpload = upload.fields([{ name: "book", maxCount: 1 }]);
