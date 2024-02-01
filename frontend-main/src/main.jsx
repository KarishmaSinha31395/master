import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-a9oimnpv.us.auth0.com"
    clientId="Wfvelw7581hP80boXZip0ELqNFdVjpVS"
    
    authorizationParams={{
      redirect_uri: window.location.origin
      
    }}
  >
    <App />
  </Auth0Provider>,
)
