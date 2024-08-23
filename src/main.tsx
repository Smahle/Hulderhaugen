import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'

/* React Slick carousel, to be used for PhotoGallery */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* ------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
