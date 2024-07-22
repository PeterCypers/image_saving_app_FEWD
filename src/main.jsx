import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { Top } from './components/Top.jsx';
import DragDrop from './pages/DropZone.jsx';
import Fotos from './pages/Fotos.jsx';
import Albums from './pages/Albums.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: "/",
    element: <Top />,
    children: [
          {
            index: true,
            path: "dropzone",
            element: <DragDrop />
          },
          {
            path: "fotos",
            element: <Fotos />
          },
          {
            path: "albums",
            element: <Albums />
          }
        ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* <App /> */}
    {/* </AuthProvider> */}
  </React.StrictMode>,
)
