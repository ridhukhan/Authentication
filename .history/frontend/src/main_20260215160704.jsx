import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
export const server = "http://localhost:3000"
createRoot(document.getElementById('root')).render(
 
    
       <StrictMode>
        <AppProvider>
          <SocketProvider>
    <App />
    </SocketProvider>
    </AppProvider>
  
  </StrictMode>,
)
