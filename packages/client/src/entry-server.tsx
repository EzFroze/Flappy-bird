import { StrictMode } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'
import { store } from './app/store/store'

interface IRenderProps {
  path: string
}

export const render = ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToString(
    <StrictMode>
      <Provider store={store}>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </Provider>
    </StrictMode>
  )
}
