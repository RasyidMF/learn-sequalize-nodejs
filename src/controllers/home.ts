import { Request, Response } from "express";
import ProductRouter from "../routes/products";
import RouterInterface from "../routes/interfaces";

export default {
	index(req: Request, res: Response) {
		const extractApi = function (Router: RouterInterface) {
			const result: any[] = [];

			Router.router.stack.map((layer) => {
				result.push({
					path: layer.route?.path,
					methods: layer.route?.stack[0].method,
				});
			});

			return result;
		};

		return res.json({
			api: {
				product: extractApi(new ProductRouter()),
			},
		});
	},
};
