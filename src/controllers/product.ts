import { Request, Response } from "express";
import { make } from "simple-body-validator";
import { Models } from "../models";

export default {
	async index(req: Request, res: Response) {
		res.json({
			data: await Models.ProductModel.query().findAll(),
		});
	},
	async store(req: Request, res: Response) {
		const validator = make(req.body, {
			name: "required",
			price: "required",
			qty: "required",
			expired: "required|date",
		});

		if (!validator.validate()) {
			return res
				.json({
					errors: validator.errors().all(),
				})
				.status(412);
		}

		const { name, price, qty, expired } = req.body;
		const createdData = await Models.ProductModel.query().create({
			name,
			price,
			qty,
			expired,
		});

		res.json({
			message: "Successfully created data",
		});
	},
	async update(req: Request, res: Response) {
		const validator = make(req.body, {
			name: "required",
			price: "required",
			qty: "required",
			expired: "required|date",
		});

		if (!validator.validate()) {
			return res
				.json({
					errors: validator.errors().all(),
				})
				.status(412);
		}

		const { name, price, qty, expired } = req.body;
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
			await data.update({
				name,
				price,
				qty,
				expired,
			});
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
			return res
				.json({
					message: "Data not exists!",
				})
				.status(404);
		} else {
			await data.destroy();
			res.json({
				message: "Successfully deleted data",
			});
		}
	},
};
