import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Employees from './components/Employees';
import Edit from './components/Edit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "departments/:id?/employees",
    element: <Employees />,
  },
  {
    path: "projects/edit/:id?",
    element: <Edit />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);