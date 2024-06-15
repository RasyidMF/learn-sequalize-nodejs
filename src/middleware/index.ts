import Auth from "./auth";
import Default from "./default";
import { Express } from "express";

/**
 * Declare your Application-Level middlewares here
 * @param {Express} express
 */
export const Middlewares = (app: Express) => {
	// Default middlewares
	Default(app);

	// Authentication
	Auth(app);
};
