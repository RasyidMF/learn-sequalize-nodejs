import { Router } from "express";
import product from "../controllers/product";
import RouterInterface from "./interfaces";

export default class ProductRouter implements RouterInterface {
	router: Router;
	constructor() {
		this.router = Router();

		// Initilaize the routers
		this.#setupRouters();
	}

	#setupRouters() {
		this.router.get("/product/get", product.index);
		this.router.post("/product/add", product.store);
		this.router.put("/product/update/:id", product.update);
		this.router.delete("/product/delete/:id", product.delete);
	}
}
