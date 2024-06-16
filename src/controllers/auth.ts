import { Request, Response } from "express";
import { hash, compareHash, validateRequestAndExtract } from "../helper/utils";
import { Models } from "../models";
import Auth from "../helper/auth";

const AuthModel = Models.AuthModel;

export default {
	index(req: Request, res: Response) {
		res.json({
			data: Auth.getUserAuth(req),
		});
	},
	async login(req: Request, res: Response) {
		const form = validateRequestAndExtract(req, {
			username: "required",
			password: "required",
		});

		// Validate form
		if (!form.validate) {
			return res.status(412).json({
				errors: form.errors,
			});
		}

		const user = await AuthModel.query().findOne({
			where: {
				username: form.body.username,
			},
		});

		// Check is user exists
		if (!user) {
			return res.status(412).json({
				message: "Username or password are invalid",
			});
		} else {
			// Check password
			if (compareHash(form.body.password, user.dataValues.password)) {
				return res.json({
					message: "Login successfully!",
					token: Auth.generateAccessToken({
						username: form.body.username,
					}),
				});
			} else {
				return res.status(412).json({
					message: "Username or password are invalid",
				});
			}
		}
	},
	async register(req: Request, res: Response) {
		const form = validateRequestAndExtract(req, {
			username: "required",
			password: "required",
			email: "required",
			name: "required",
		});

		// Validate form
		if (!form.validate) {
			return res.status(412).json({
				errors: form.errors,
			});
		}

		const user = await AuthModel.query().findOne({
			where: {
				username: form.body.username,
			},
		});

		// Check is user exists
		if (user) {
			return res.status(412).json({
				message: "This username are used, please use another username",
			});
		} else {
			// Hashing password
			form.body.password = hash(form.body.password);

			await AuthModel.query().create(form.body);
			return res.json({
				message: "Register successfully!",
				token: Auth.generateAccessToken({
					username: form.body.username,
				}),
			});
		}
	},
};
