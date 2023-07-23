import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import ApiService from "./utils/apiService";
import App from "./pages/App";
import Login from "./pages/login";
import "./index.css";

export const apiService = new ApiService("/api");

const init = () => {
  apiService
    .getTasks(store.currentPage, store.sortOrder)
    .then((res) => res.json())
    .then((res) => {
      const { page, tasks, totalPages } = res;
      store.updateTasks(page, tasks, totalPages);
    });
  apiService
    .checkAuth()
    .then((res) => res.json())
    .then((res) => {
      store.updateUserStatus(res.msg === "ok");
    });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
