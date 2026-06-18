import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Global styles
import "./assets/css/global.css";
import Router from './Router';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
)
