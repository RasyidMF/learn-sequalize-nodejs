import { Request, Response } from "express";
import { make } from "simple-body-validator";
import { Models } from "../models";
import { validateRequestAndExtract } from "../helper/utils";

export default {
	async index(req: Request, res: Response) {
		res.json({
			data: await Models.ProductModel.query().findAll(),
		});
	},
	async store(req: Request, res: Response) {
		const form = validateRequestAndExtract(req, {
			name: "required",
			price: "required",
			qty: "required",
			expired: "required|date",
		});

		if (!form.validate) {
			return res.status(412).json({
				errors: form.errors,
			});
		}

		await Models.ProductModel.query().create(form.body);

		res.json({
			message: "Successfully created data",
		});
	},
	async update(req: Request, res: Response) {
		const form = validateRequestAndExtract(req.body, {
			name: "required",
			price: "required",
			qty: "required",
			expired: "required|date",
		});

		if (!form.validate) {
			return res.status(412).json({
				errors: form.errors,
			});
		}

		const data = await Models.ProductModel.query().findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!data) {
			return res
				.json({
					message: "Data not exists!",
				})
				.status(404);
		} else {
			await data.update(form.body);
			res.json({
				message: "Successfully updated data",
			});
		}
	},
	async delete(req: Request, res: Response) {
		const data = await Models.ProductModel.query().findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!data) {
			return res.status(404).json({
				message: "Data not exists!",
			});
		} else {
			await data.destroy();
			res.json({
				message: "Successfully deleted data",
			});
		}
	},
};
