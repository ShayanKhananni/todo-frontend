import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { todoApi } from "./todo-api-slice";

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['user'], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [todoApi.reducerPath]: todoApi.reducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(todoApi.middleware), 
  devTools: true,
});

export const persistor = persistStore(store);
