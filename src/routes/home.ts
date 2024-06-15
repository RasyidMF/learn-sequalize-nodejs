import { Router } from "express";
import RouterInterface from "./interfaces";
import home from "../controllers/home";

export default class HomeRouter extends RouterInterface {
	setupRouters(router: Router) {
		router.get("/", home.index);
	}
}
