import { Router } from "express";

export default abstract class RouterInterface {
	router: Router;
	basePath: string = "";

	constructor({ basePath = "" } = {}) {
		this.router = Router();
		this.basePath = basePath;

		this.setupRouters(this.router);
		this.setupMiddleware(this.router);
	}

	/**
	 * Setup the routers
	 *
	 * @param {Router} router
	 */
	abstract setupRouters(router: Router): void;

	/**
	 * An optional to setting your middleware, this will be Router-Level middleware.
	 * To have an Application-level Middleware please set it at middleware directory
	 *
	 * @param {Router} router
	 */
	setupMiddleware(router: Router): void {}
}
