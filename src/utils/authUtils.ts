/** Usuario semilla para desarrollo */
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

/**
 * Inicializa el almacenamiento local con datos semilla si es la primera vez.
 * - Crea `bankify_users` con los usuarios por defecto.
 * - Marca `bug_correlacion_fixed` como `"false"`.
 *
 * Debe llamarse una única vez al arrancar la aplicación (main.jsx).
 */
export const initAuthStorage = () => {
  if (!localStorage.getItem('bankify_users')) {
    localStorage.setItem('bankify_users', JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem('bug_correlacion_fixed')) {
    localStorage.setItem('bug_correlacion_fixed', 'false');
  }
};

/**
 * Recupera el usuario actualmente autenticado desde localStorage.
 *
 * @returns {object|null} El objeto del usuario (con `email`, `role`, `fullName`, etc.)
 *                        o `null` si no hay sesión activa.
 */
export const getCurrentUser = () => {
  const raw = localStorage.getItem('bankify_current_user');
  return raw ? JSON.parse(raw) : null;
};

/**
 * Indica si el archivo de correlación (módulo de estadística) ya fue cargado
 * por el administrador.
 *
 * @returns {boolean} `true` si el bug está corregido, `false` en caso contrario.
 */
export const isBugFixed = () => {
  return localStorage.getItem('bug_correlacion_fixed') === 'true';
};
