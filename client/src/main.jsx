import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import FutureContextProvider from './context/FutureContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <FutureContextProvider>
    <App />
  </FutureContextProvider>
    
  </BrowserRouter>,
)
