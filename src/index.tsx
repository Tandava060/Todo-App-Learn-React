import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/Home';
import NewForm from './pages/NewForm';
import EditForm from './pages/EditForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: < Navigate to="/home" replace />,
      },
      {
        index: true,
        path: '/home',
        element: <Home />,
      },
      {
        path: 'todo/new',
        element: <NewForm />,
      },
      {
        path: 'todo/edit/:id',
        element: <EditForm />,
      },
    ]
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
