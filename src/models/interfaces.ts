import { Model, ModelAttributes } from "sequelize";
import Server from "../server";

export default abstract class ModelInterface {
	constructor() {
		this.query();
	}

	abstract tableName: string;
	abstract tableAttributes: ModelAttributes<Model<any, any>>;

	/**
	 * Starting the query models
	 *
	 * @returns
	 */
	query() {
		return Server.db?.define(this.tableName, this.tableAttributes);
	}
}
