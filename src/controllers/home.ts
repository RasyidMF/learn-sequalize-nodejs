import { Request, Response } from "express";
import { extractRouterInterface, getRouterList } from "../helper/utils";
import Auth from "../helper/auth";

export default {
	index(req: Request | any, res: Response) {
		const data: any = {};
		getRouterList().forEach((v) => {
			data[v.name] = extractRouterInterface(v.router);
		});

		return res.json({
			api: {
				...data,
			},
			user: Auth.getUserAuth(req),
		});
	},
};
