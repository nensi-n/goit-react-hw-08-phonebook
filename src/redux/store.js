import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./phonebookApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./auth";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
  // devTools: true,
  devtools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export default store;
