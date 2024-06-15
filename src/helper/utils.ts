import RouterInterface from "../routes/interfaces";

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
