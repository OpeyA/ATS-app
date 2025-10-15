import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.tsx";
import "./index.css";
//import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
