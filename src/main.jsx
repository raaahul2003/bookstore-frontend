import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContext from './context/SearchContext.jsx'
import RouterGuard from './context/RouterGuard.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
      <GoogleOAuthProvider clientId="1017120184499-e2vih535oro78jtvlc2ek867toda04c8.apps.googleusercontent.com">
        <SearchContext>
          <RouterGuard>
            <App />
          </RouterGuard>
        </SearchContext>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
