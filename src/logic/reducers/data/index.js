import { createActions, createReducer } from "reduxsauce";

import { updateProps } from "logic/reducers/shared";

export const { Types, Creators } = createActions(
  {
    updateProps: ["props"],
    getProducts: ["payload"],
    getProduct: ["payload"],
    createProduct: ["payload"],
    updateProduct: ["id", "payload"],
    deleteProduct: ["payload"],
    setProducts: ["payload"],
    setProduct: ["payload"],
    pushProduct: ["payload"],
    alterProduct: ["payload"],
    popProduct: ["payload"],
    pushToCart: ["payload"],
    popFromCart: ["payload"],
    emptyCart: ["payload"],
    createOrder: ["payload"],
    toggleFavorite: ["payload"],
    removeFromFavorites: ["payload"],
  },
  { prefix: "data/" }
);

export const initialState = {
  cart: [],
  product: {},
  products: [],
  orderDetails: {},
};

export const toggleFavorite = (state, { payload }) => {
  const newProducts = [...state.products];
  const product = newProducts.find((product) => product.id === payload.id);
  const index = newProducts.indexOf(product);
  const newProduct = { ...product, favorite: !payload.favorite };
  newProducts[index] = newProduct;

  return { ...state, products: newProducts, product: newProduct };
};

export const setProducts = (state, { payload }) => {
  const products = payload.map((prod) => {
    const product = state.products.find((art) => art?.id === prod?.id);
    const favorite = product?.favorite || false;
    return { ...prod, favorite };
  });

  return { ...state, products };
};

export const setProduct = (state, { payload }) => {
  const foundProduct = state.products.find((art) => art.id === payload.id);
  const favorite = foundProduct?.favorite;
  const product = { ...payload, favorite };
  return { ...state, product };
};

export const pushProduct = (state, { payload }) => {
  const newProduct = { ...payload, favorite: false };
  return { ...state, products: [...state.products, newProduct] };
};

export const popProduct = (state, { payload }) => {
  const withoutProduct = (product) => product.id !== payload.id;

  const newCart = [...state.cart.filter(withoutProduct)];
  const newProducts = [...state.products.filter(withoutProduct)];

  return { ...state, products: newProducts, cart: newCart };
};

export const pushToCart = (state, { payload }) => {
  return { ...state, cart: [...state.cart, payload] };
};

export const popFromCart = (state, { payload }) => {
  const newCartItems = state.cart.filter((a, index) => index !== payload);
  return { ...state, cart: newCartItems };
};

export const emptyCart = (state, { payload }) => {
  return { ...state, cart: [] };
};

export const alterProduct = (state, { payload }) => {
  var newProducts = [...state.products];
  const product = newProducts.find((product) => product.id === payload.id);
  const index = newProducts.indexOf(product);
  newProducts[index] = payload;

  return { ...state, products: newProducts };
};

export default createReducer(initialState, {
  [Types.UPDATE_PROPS]: updateProps,
  [Types.SET_PRODUCT]: setProduct,
  [Types.SET_PRODUCTS]: setProducts,
  [Types.POP_PRODUCT]: popProduct,
  [Types.PUSH_PRODUCT]: pushProduct,
  [Types.ALTER_PRODUCT]: alterProduct,
  [Types.PUSH_TO_CART]: pushToCart,
  [Types.POP_FROM_CART]: popFromCart,
  [Types.EMPTY_CART]: emptyCart,
  [Types.TOGGLE_FAVORITE]: toggleFavorite,
});
