import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { App } from './App'
import { store } from './app/store/store'

ReactDOM.hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
