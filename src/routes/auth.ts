import { Router } from "express";
import RouterInterface from "./interfaces";
import auth from "../controllers/auth";

export default class AuthRouter extends RouterInterface {
	basePath: string = "/auth";

	setupRouters(router: Router): void {
		router.get("/", auth.index);
		router.post("/login", auth.login);
		router.post("/register", auth.register);
	}
}
