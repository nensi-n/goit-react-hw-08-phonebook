import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { contactsApi } from "./phonebook/phonebook-api";
import { authReducer } from "./auth";

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
  devTools: true,
  // devtools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import storage from "redux-persist/lib/storage";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { contactsApi } from "./phonebook/phonebook-api";
// import { authReducer } from "./auth";

// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["token"],
// };

// const store = configureStore({
//   reducer: {
//     auth: persistReducer(authPersistConfig, authReducer),
//     [contactsApi.reducerPath]: contactsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware(),
//     contactsApi.middleware,
//   ],
//   // devTools: true,
//   devtools: process.env.NODE_ENV === "development",
// });

// setupListeners(store.dispatch);

// export default store;
