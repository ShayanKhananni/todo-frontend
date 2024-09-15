import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import sessionReducer from "./session-slice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import todoReducer from "./todo-slice";

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['user'], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  session: sessionReducer, 
  todo:todoReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
