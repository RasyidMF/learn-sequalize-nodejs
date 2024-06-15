import { Express } from "express";
import Auth from "../helper/auth";

/**
 * Authorization with JWT
 *
 * @param app
 */
export default function (app: Express) {
	app.use(Auth.middlewareRequest);
}
