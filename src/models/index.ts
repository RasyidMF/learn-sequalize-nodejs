import AuthModel from "./auth";
import ProductModel from "./products";

/**
 * Define your models here
 */
export const Models = {
	ProductModel: new ProductModel(),
	AuthModel: new AuthModel(),
};
