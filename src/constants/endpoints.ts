/**
 * Constantes centralizadas para los endpoints de la API
 * Solo contiene las rutas relativas (sin prefijo /api ni base URL)
 * La construcción completa de URLs se hace en services/api.ts
 */

// Endpoints de usuarios (solo rutas relativas)
export const USER_ENDPOINTS = {
  USERS: '/users',
  BY_ID: (id: number | string) => `/users/${id}`,
} as const;

