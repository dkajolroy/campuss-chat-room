import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducer";

const config: PersistConfig<RootStore> = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["authSlice"],
  transforms: [
    encryptTransform({
      secretKey: "app-private-key",
      onError(_) {
        window.location.href = "/";
      },
    }),
  ],
};
const persisted = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: persisted,
  devTools: import.meta.env.DEV,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
});

export const persistedStore = persistStore(store);
export type RootStore = ReturnType<typeof rootReducer>;
