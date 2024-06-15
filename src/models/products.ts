import { DataTypes, ModelAttributes } from "sequelize";
import ModelInterface from "./interfaces";

export default class ProductModel extends ModelInterface {
	tableName: string = "products";
	tableAttributes: ModelAttributes = {
		name: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.INTEGER,
		},
		qty: {
			type: DataTypes.INTEGER,
		},
		expired: {
			type: DataTypes.DATEONLY,
		},
	};
}
