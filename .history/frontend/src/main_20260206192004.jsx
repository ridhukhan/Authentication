import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
export const server = "http://localhost:3000"
createRoot(document.getElementById('root')).render(
 
    <AppProvider>
       <StrictMode>
    <App />
     </StrictMode>,
  </AppProvider>
 
)
