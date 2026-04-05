import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import chapterRouter from "./routes/chapter";
import booksRouter from "./routes/book";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import middleware from "./middlewares/generalMiddleware";
import config from "./utils/config";
import logger from "./utils/logger";

mongoose
	.connect(config.MONGODB_URI as string)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch(() => {
		logger.error("error connection to MongoDB:");
	});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(middleware.requestLogger);

app.use("/api/auth/register", registerRouter);
app.use("/api/books", booksRouter);
app.use("/api/chapters", chapterRouter);
app.use("/api/auth/login", loginRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
