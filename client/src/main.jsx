import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

ReactDOM.render(
  <TransactionsProvider>
  <RouterProvider router={router}>
    
  
  </RouterProvider>
  </TransactionsProvider>,
  document.getElementById("root"),
);
