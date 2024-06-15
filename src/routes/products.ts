import { Router } from "express";
import product from "../controllers/product";
import RouterInterface from "./interfaces";

export default class ProductRouter extends RouterInterface {
	basePath: string = "/product";
	setupRouters(router: Router): void {
		router.get("/get", product.index);
		router.post("/add", product.store);
		router.put("/update/:id", product.update);
		router.delete("/delete/:id", product.delete);
	}
}
