import { DataTypes, Sequelize } from "sequelize";
import Server from "../server";

export default function () {
	const ProductModel = Server.db.define("products", {
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
	});

	return ProductModel;
}
