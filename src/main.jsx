import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Calculo from './routes/calculo/calculo.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Calculo/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
