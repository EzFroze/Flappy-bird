import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { routes } from './app/router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
