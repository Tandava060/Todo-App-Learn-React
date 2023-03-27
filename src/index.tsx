import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import NewTodosForm from './components/NewTodoForm/NewTodoForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: < Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/new",
    element: <NewTodosForm />,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
