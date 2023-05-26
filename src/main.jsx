import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Calculo from './routes/calculo/calculo.jsx';
import CalculoId from './routes/calculoId/calculoId.jsx';


const router = createBrowserRouter([
  {
    path: "calculo",
    element: <Calculo/>,
  },

  {
    path:'calculo/:id',
    element: <CalculoId/>
  }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
