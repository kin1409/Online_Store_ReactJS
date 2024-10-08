import React, { } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/indexx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.Suspense>
      <App />
    </React.Suspense>
  </Provider >


)
