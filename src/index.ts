import Server from "./server";

import ProductRouter from "./routes/products";
import HomeRouter from "./routes/home";

async function boot() {
	const server = new Server();

	// Initialize Database
	await server.setupDatabase();

	// Initialize Routers
	server.setupRouters([new ProductRouter(), new HomeRouter()]);

	server.start();
}

boot();
