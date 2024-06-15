import JWT, { VerifyCallback } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default class Auth {
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
	static middlewareRequest(
		req: Request | any,
		res: Response,
		next: NextFunction
	) {
		const authHeader = req.headers["authorization"];
		if (!authHeader)
			return res
				.json({
					message: "Authorize is needed!",
				})
				.sendStatus(401);

		Auth.verify(authHeader, (err: any, user: any) => {
			if (err) {
				return res
					.json({
						message: "Not allowed to access this page",
					})
					.sendStatus(403);
			}

			req.user = user;

			next();
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
