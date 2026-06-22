export const MOCK_USERS = [
  {
    email: 'admin@bankify.com',
    password: 'admin123',
    role: 'admin',
    fullName: 'Administrador del Sistema'
  },
  {
    email: 'cliente@bankify.com',
    password: 'user123',
    role: 'client',
    fullName: 'Carlos Mendoza'
  }
];

export const initAuthStorage = () => {
  if (!localStorage.getItem('bankify_users')) {
    localStorage.setItem('bankify_users', JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem('bug_correlacion_fixed')) {
    localStorage.setItem('bug_correlacion_fixed', 'false');
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('bankify_current_user');
  return user ? JSON.parse(user) : null;
};