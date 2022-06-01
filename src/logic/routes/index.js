import Pages from "view/pages";
import * as Paths from "./paths";

const Home = {
  name: "Home",
  component: Pages.Home,
  path: Paths.HOME_PATH,
};

const Product = {
  name: "Product",
  component: Pages.Product,
  path: Paths.PRODUCT_PATH,
};

const Checkout = {
  name: "Checkout",
  component: Pages.Checkout,
  path: Paths.CHECKOUT_PATH,
};

const Favorites = {
  name: "Favorites",
  component: Pages.Favorites,
  path: Paths.FAVORITES_PATH,
};

const NotFound = {
  name: "Not found",
  component: Pages.NotFound,
  path: Paths.NOT_FOUND_PATH,
};

const allRoutes = [Home, Product, Checkout, Favorites, NotFound];

export default allRoutes;
