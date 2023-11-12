import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Top } from './components/Top.jsx';
import DragDrop from './pages/DropZone.jsx';
import Fotos from './pages/FotosPlaceholder.jsx';
import Albums from './pages/AlbumsPlaceholder.jsx';
import { NotFound } from './pages/NotFound.jsx';

const router = createBrowserRouter([
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
      }
    
  ,
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
