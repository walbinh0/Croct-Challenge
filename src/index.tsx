import React from 'react'
import ReactDOM from 'react-dom/client'
import { AvatarUpload } from './components/AvatarUpload/AvatarUpload'
import { ImageDataProvider } from './context/imageData'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ImageDataProvider>
      <AvatarUpload />
    </ImageDataProvider>
  </React.StrictMode>
)
