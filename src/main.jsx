import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Global styles
import "./assets/css/global.css";
import Router from './Router';

const existingUsers = localStorage.getItem('bankify_users');
if (!existingUsers) {
  const initialUsers = [
    {
      email: 'admin@bankify.com',
      password: 'admin123',
      role: 'admin',
      fullName: 'Admin Bankify'
    },
    {
      email: 'cliente@bankify.com',
      password: 'user123',
      role: 'client',
      fullName: 'Carlos Mendoza'
    }
  ];
  localStorage.setItem('bankify_users', JSON.stringify(initialUsers));
}

if (!localStorage.getItem('bug_correlacion_fixed')) {
  localStorage.setItem('bug_correlacion_fixed', 'false');
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
)