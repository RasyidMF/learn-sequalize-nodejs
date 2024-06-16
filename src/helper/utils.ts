import { InitialRules, make } from "simple-body-validator";
import RouterInterface from "../routes/interfaces";

import { Request, Response } from "express";
import bcrypt from "bcrypt";

/**
 * Get all routers list that had been registered
 *
 * @returns
 */
export function getRouterList(): any[] {
	const result: any = [];
	const _routers = require("../routes");

	Object.keys(_routers.Routes).forEach((_key) => {
		result.push({
			router: _routers.Routes[_key],
			name: _key,
		});
	});

	return result;
}

/**
 * Extracting Router Interface
 *
 * @param {RouterInterface} Router
 * @returns
 */
export function extractRouterInterface(Router: RouterInterface) {
	const result: any[] = [];

	Router.router.stack.map((layer) => {
		result.push({
			basePath: Router.basePath,
			path: (Router.basePath != "" ? Router.basePath : "") + layer.route?.path,
			methods: layer.route?.stack[0].method,
		});
	});

	return result;
}

/**
 * Macro to create validate request
 *
 * @param req
 * @param rules
 */
export function validateRequest(req: Request, rules: InitialRules) {
	const validator = make(req.body, rules);

	return {
		validate: validator.validate(),
		errors: validator.errors().all(),
	};
}

/**
 * Macro to create validate request and extract body
 *
 * @param req
 * @param rules
 * @returns
 */
export function validateRequestAndExtract(req: Request, rules: InitialRules) {
	let body: any = {};
	Object.keys(rules).forEach((key) => (body[key] = req.body[key]));

	return {
		...validateRequest(req, rules),
		body,
	};
}

/**
 * Hashing plain text
 *
 * @param plain
 */
export function hash(plain: string, saltRound = 10) {
	return bcrypt.hashSync(plain, bcrypt.genSaltSync(saltRound));
}

/**
 * Comparing plain with hash
 *
 * @param plain
 * @param encrypted
 */
export function compareHash(plain: string, encrypted: string) {
	return bcrypt.compareSync(plain, encrypted);
}
