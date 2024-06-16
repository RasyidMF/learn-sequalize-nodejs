import { Model, ModelAttributes, ModelOptions } from "sequelize";
import Server from "../server";

export default abstract class ModelInterface {
	constructor() {
		this.query();
	}

	abstract tableName: string;
	abstract tableAttributes: ModelAttributes<Model<any, any>>;

	/**
	 * Setup the model options
	 */
	options: ModelOptions = {};

	/**
	 * Starting the query models
	 *
	 * @returns
	 */
	query() {
		return Server.db?.define(
			this.tableName,
			this.tableAttributes,
			this.options
		);
	}
}
