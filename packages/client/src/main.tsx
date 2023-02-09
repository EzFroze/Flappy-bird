import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './app/router/router'
import { RouterProvider } from 'react-router-dom'
import { store } from './app/store/store'
import { Provider } from 'react-redux'

ReactDOM.hydrateRoot(
  (document.getElementById('root') as HTMLElement),
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
