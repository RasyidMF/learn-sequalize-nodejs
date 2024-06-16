import JWT, { VerifyCallback } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default class Auth {
	/**
	 * Ignoring specific path
	 */
	static ignoreMiddleware = ["/auth/login", "/auth/register"];

	/**
	 * Add ignore middleware
	 *
	 * @param path
	 */
	static addIgnoreMiddleware(path: string) {
		Auth.ignoreMiddleware.push(path);
	}

	/**
	 * Generate access token for user
	 *
	 * @param {string | Buffer | object} user
	 * @returns
	 */
	static generateAccessToken(user: string | Buffer | object) {
		return JWT.sign(user, Auth.getAppToken(), {});
	}

	/**
	 * Verify the token
	 *
	 * @param token
	 */
	static verify(token: string, callback: VerifyCallback) {
		return JWT.verify(token, Auth.getAppToken(), callback);
	}

	/**
	 * Get App Token Secret
	 *
	 * @returns
	 */
	static getAppToken(): JWT.Secret {
		return (
			process.env.APP_TOKEN_SECRET ||
			require("crypto").randomBytes(64).toString("hex")
		);
	}

	/**
	 * Place this into middleware function
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	static async middlewareRequest(
		req: Request | any,
		res: Response,
		next: NextFunction
	) {
		const authHeader = req.headers["authorization"];
		let fullPath: string = req.baseUrl + req.path;

		if (fullPath[fullPath.length - 1] == "/")
			fullPath = fullPath.slice(0, fullPath.length - 1);

		// Ignore Middleware by specific path
		if (Auth.ignoreMiddleware.includes(fullPath)) {
			return next();
		}

		if (!authHeader)
			return res.status(401).json({
				message: "Authorize is needed!",
			});

		Auth.verify(authHeader, async (err: any, user: any) => {
			if (err) {
				return res.status(403).json({
					message: "Not allowed to access this page",
				});
			}

			req.user = user;

			// If user authenticated, then fetching the real data
			if (req.user) {
				const { Models } = require("../models");

				req.user = (
					await Models.AuthModel.query().findOne({
						where: {
							username: req.user.username,
						},
					})
				)?.dataValues;
			}

			return next();
		});
	}

	/**
	 *
	 * @param request
	 * @returns
	 */
	static getUserAuth(request: any) {
		return request.user;
	}
}
