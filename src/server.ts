require("dotenv").config();

import express from "express";
import { Express } from "express";
import { Sequelize } from "sequelize";

import RouterInterface from "./routes/interfaces";
import ModelInterface from "./models/interfaces";

import { Middlewares } from "./middleware";

const PORT = process.env.SERVER_PORT || 3000;

class Server {
	#expressApp: Express;
	static db: Sequelize;

	constructor() {
		this.#expressApp = express();

		// Setup middlewares
		Middlewares(this.#expressApp);
	}

	/**
	 * Setup for routes
	 */
	#setupRouters() {
		const _routers = require("./routes");
		Object.keys(_routers.Routes).forEach((_key) => {
			const instance: RouterInterface = _routers.Routes[_key];

			if (instance.basePath != "") {
				this.#expressApp.use(instance.basePath, instance.router);
			} else {
				this.#expressApp.use(instance.router);
			}
		});
	}

	// Setup for database (static function so other file can use "db" easily)
	async #setupDatabase() {
		Server.db = new Sequelize(
			process.env.DB_NAME || "test_db",
			process.env.DB_USERNAME || "test",
			process.env.DB_PASSWORD || "",
			{
				host: process.env.DB_HOST || "localhost",
				dialect: "mysql",
			}
		);

		await Server.db
			.authenticate()
			.then(() => {
				console.log(`Database ${process.env.DB_NAME} connected!`);

				// Sync the models
				const _models = require("./models");
				Object.keys(_models.Models).forEach((_key) => {
					const instance: ModelInterface = _models.Models[_key];
					return instance.query();
				});

				Server.db
					.sync({
						logging: process.env.DB_LOGGING == "true" ? true : false,
					})
					.then(() => {
						console.log("Synchronize successfully!");
					})
					.catch((error) => {
						console.error("Unable to synchronize models : ", error);
					});
			})
			.catch((error) => {
				console.error("Unable to connect to the database: ", error);
			});
	}

	// Start the http service
	async start() {
		// Setup Databases
		await this.#setupDatabase();

		// Setup Automaticly Routers
		this.#setupRouters();

		this.#expressApp.listen(PORT, () => {
			console.log(`Listening to port ${PORT}`);
		});
	}
}

export default Server;
