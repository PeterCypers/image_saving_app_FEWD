import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Top } from './components/pageElements/Top.jsx';
import { OldNav, Nav} from './components/pageElements/Nav.jsx';
import DragDrop from './components/pageElements/DropZone.jsx';
import Fotos from './components/pageElements/FotosPlaceholder.jsx';
import Albums from './components/pageElements/AlbumsPlaceholder.jsx';
import { NotFound } from './components/pageElements/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
    children: [
      {
        path: "/",
        element: <Nav />,
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
            element: <Albums />
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
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
