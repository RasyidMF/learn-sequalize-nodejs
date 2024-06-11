import { Request, Response } from "express";
import { ProductModel } from "../models";
import { make } from "simple-body-validator";

export default {
	async index(req: Request, res: Response) {
		res.json({
			data: await ProductModel().findAll(),
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
		const createdData = await ProductModel().create({
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
		const data = await ProductModel().findOne({
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
		const data = await ProductModel().findOne({
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
