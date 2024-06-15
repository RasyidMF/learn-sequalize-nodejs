import { Router } from "express";
import RouterInterface from "./interfaces";

export default class AuthRouter extends RouterInterface {
	basePath: string = "/auth";

	setupRouters(router: Router): void {
		router.get("/test", (req, res) => {
			res.json({
				message: 1,
			});
		});
	}
}
