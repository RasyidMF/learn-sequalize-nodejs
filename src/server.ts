require("dotenv").config();

import express from "express";
import { Sequelize } from "sequelize";
import RouterInterface from "./routes/interfaces";

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const PORT = process.env.SERVER_PORT || 3000;

class Server {
	#expressApp: any;
	static db: Sequelize;

	constructor() {
		this.#expressApp = express();
		this.#expressApp.use(bodyParser.urlencoded({ extended: true }));
		this.#expressApp.use(bodyParser.json());
		this.#expressApp.use(upload.array());
		this.#expressApp.use(express.static("public"));
	}

	setupRouters(routers: RouterInterface[] = []) {
		routers.forEach((expressRouter) => {
			this.#expressApp.use(expressRouter.router);
		});
	}

	// Setup for database (static function so other file can use "db" easily)
	async setupDatabase() {
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
				Object.keys(_models).forEach((_key) => _models[_key]());

				Server.db
					.sync()
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
	start() {
		this.#expressApp.listen(PORT, () => {
			console.log(`Listening to port ${PORT}`);
		});
	}
}

export default Server;
