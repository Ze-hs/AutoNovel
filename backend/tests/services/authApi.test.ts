import { test, beforeEach, after, describe } from "node:test";
import supertest from "supertest";

import app from "../../src/app";
import UserModel from "../../src/models/UserModel";
import mongoose from "mongoose";

import { users } from "../utils";
const api = supertest(app);

describe("Register", () => {
	beforeEach(async () => {
		await UserModel.deleteMany({});
	});

	test("User can sign up", async () => {
		await api.post("/api/auth/register").send(users[0]).expect(201);
	});

	test("User fails to sign up due to missing name", async () => {
		const newUser: Partial<(typeof users)[0]> = { ...users[0] };
		delete newUser.name;
		console.log(newUser);
		await api.post("/api/auth/register").send(newUser).expect(400);
	});

	test("User fails to sign up due to missing username", async () => {
		const newUser: Partial<(typeof users)[0]> = { ...users[0] };
		delete newUser.username;
		await api.post("/api/auth/register").send(newUser).expect(400);
	});

	test("User fails to sign up due to missing email", async () => {
		const newUser: Partial<(typeof users)[0]> = { ...users[0] };
		delete newUser.email;
		await api.post("/api/auth/register").send(newUser).expect(400);
	});

	test("User fails to sign up due to duplicate email", async () => {
		const user2 = {
			...users[1],
			email: users[0].email,
		};

		await api.post("/api/auth/register").send(users[0]).expect(201);
		await api.post("/api/auth/register").send(user2).expect(400);
	});

	test("User fails to sign up due to duplicate username", async () => {
		const user2 = {
			...users[1],
			username: users[0].username,
		};

		await api.post("/api/auth/register").send(users[0]).expect(201);
		await api.post("/api/auth/register").send(user2).expect(400);
	});
});

describe("Login", () => {
	beforeEach(async () => {
		await UserModel.deleteMany({});
		await api.post("/api/auth/register").send(users[0]);
	});

	test("User can sign in with correct email and password", async () => {
		await api.post("/api/auth/login").send(users[0]).expect(200);
	});

	test("Sign in fails with incorrect password", async () => {
		const userData = { ...users[0] };
		userData["password"] = "xxxxx";
		await api.post("/api/auth/login").send(userData).expect(401);
	});

	test("Sign in fails for non-existent user", async () => {
		const userData = { ...users[0] };
		userData["username"] = "xxxxx";

		await api.post("/api/auth/login").send(userData).expect(401);
	});

	test("Sign in fails if email or password is missing", async () => {
		const userData: Partial<(typeof users)[0]> = { ...users[0] };
		delete userData["password"];

		await api.post("/api/auth/login").send(userData).expect(400);
	});
});

after(async () => {
	await mongoose.connection.close();
});
