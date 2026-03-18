import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hames from './Hames.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hames />
    <App />
  </StrictMode>,
)