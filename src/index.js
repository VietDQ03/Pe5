import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Employees from './components/Employees';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "departments/:id?/employees",
    element: <Employees />,
  },
  // {
  //   path: "cart",
  //   element: <Cart />,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);