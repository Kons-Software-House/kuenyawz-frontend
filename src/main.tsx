import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Router>
  </StrictMode>,
)
