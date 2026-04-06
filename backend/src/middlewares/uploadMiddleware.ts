/* Functions and middlewares related to file uploads*/
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

// https://stackoverflow.com/questions/59097119/using-multer-diskstorage-with-typescript

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const baseDir = process.cwd(); // this is usually your project root
const uploadDir = path.join(baseDir, "uploads");

// Make sure folder exists
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

// @ts-ignore
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

const storage = multer.diskStorage({
	destination: (
		_request: Request,
		_file: Express.Multer.File,
		callback: DestinationCallback,
	): void => {
		callback(null, uploadDir);
	},
	filename: (
		_req: Request,
		file: Express.Multer.File,
		callback: FileNameCallback,
	): void => {
		const ext = path.extname(file.originalname);
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		callback(null, file.fieldname + "-" + uniqueSuffix + ext);
	},
});

const upload = multer({
	dest: "uploads/",
	fileFilter,
	storage,
});

export const epubUpload = upload.single("file");
