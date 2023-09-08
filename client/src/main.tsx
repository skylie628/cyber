import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/index2.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
