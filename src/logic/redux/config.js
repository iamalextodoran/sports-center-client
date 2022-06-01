import storage from "redux-persist/lib/storage";

export const storeConfig = {
  storage,
  timeout: null,
  key: "sports-center-store",
  blacklist: ["alert"],
};

const config = { storeConfig };

export default config;
