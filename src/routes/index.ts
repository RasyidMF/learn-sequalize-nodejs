import AuthRouter from "./auth";
import HomeRouter from "./home";
import ProductRouter from "./products";

/**
 * Declare your routes here
 */
export const Routes = {
	Home: new HomeRouter(),
	Auth: new AuthRouter(),
	Product: new ProductRouter(),
};
