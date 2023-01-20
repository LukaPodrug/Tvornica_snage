import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { ProSidebarProvider } from 'react-pro-sidebar'

import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ProSidebarProvider>
        <App/>
      </ProSidebarProvider>
    </RecoilRoot>
  </React.StrictMode>
)