import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import {  persistor, store } from "./Store/app-store";
import { PersistGate } from "redux-persist/integration/react";
import './App.css'
const App = () => {
  return (
    <>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <Outlet />
        </Provider>
      </PersistGate>
    </>
  );
};

export default App;
