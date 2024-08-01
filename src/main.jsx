import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { Top } from './components/Top.jsx';
import DragDrop from './pages/DropZone.jsx';
import Fotos from './pages/Fotos.jsx';
import Albums from './pages/Albums.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';
import Logout from './pages/Logout.jsx';
import Register from './pages/Register.jsx';
import AlbumImages from './pages/AlbumImages.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        // index: true,
        path: "/",
        element: <Top />,
        children: [
          {
            path: "dropzone",
            element: <DragDrop />
          },
          {
            path: "fotos",
            element: <Fotos />
          },
          {
            path: "albums",
            element: <Albums />,
            children: [
              {
                path: ":albumId", // NEW PATH
                element: <AlbumImages />, // Component to display album images
              }
            ]
          }
        ]
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
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>,
)
