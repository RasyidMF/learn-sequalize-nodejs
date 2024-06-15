import { ModelAttributes, DataTypes } from "sequelize";
import ModelInterface from "./interfaces";

export default class AuthModel extends ModelInterface {
	tableName: string = "user";
	tableAttributes: ModelAttributes = {
		name: {
			type: DataTypes.STRING,
		},
		username: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	};
}
