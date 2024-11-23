import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext.tsx'
import App from './App.tsx'
import './index.css'
import { TransitionColorProvider } from './contexts/TransitionColorContext.tsx'
import AuthProvider from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ModalProvider>
          <TransitionColorProvider>
            <App />
          </TransitionColorProvider>
        </ModalProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
