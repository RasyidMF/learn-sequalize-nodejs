import { Router } from "express";
import RouterInterface from "./interfaces";
import home from "../controllers/home";

export default class HomeRouter implements RouterInterface {
	router: Router;
	constructor() {
		this.router = Router();

		// Initilaize the routers
		this.#setupRouters();
	}

	#setupRouters() {
		this.router.get("/", home.index);
	}
}
