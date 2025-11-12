/**
 * Configuración centralizada de la API
 * Todas las URLs se construyen aquí para evitar duplicación
 */

// Base URL de la API desde variables de entorno
const BASE_API_URL = process.env.EXPO_PUBLIC_BASE_API_URL || '';

// Prefijo común para todos los endpoints (ej: '/api')
const API_PREFIX = '';

/**
 * Construye la URL completa combinando base URL, prefijo y endpoint
 */
const buildFullUrl = (endpoint: string): string => {
  // Asegurar que el endpoint empiece con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  // Combinar: base URL + prefijo + endpoint
  return `${BASE_API_URL}${API_PREFIX}${normalizedEndpoint}`;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

export const apiClient = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const url = buildFullUrl(endpoint);
  
  // Validar que la base URL esté configurada
  if (!BASE_API_URL) {
    throw new Error(
      'BASE_API_URL no está configurada. Por favor, define EXPO_PUBLIC_BASE_API_URL en tu archivo .env'
    );
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Intentar obtener más información del error si está disponible
      let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        // Si no se puede parsear el JSON, usar el mensaje por defecto
      }
      
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).url = url;
      throw error;
    }

    return response.json();
  } catch (err) {
    // Si es un error de red o conexión
    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new Error(
        `Error de conexión: No se pudo conectar a ${url}. Verifica que la API esté disponible.`
      );
    }
    throw err;
  }
};

// Métodos helper para cada verbo HTTP
export const api = {
  get: <T>(endpoint: string) => apiClient<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, { method: 'PUT', body }),
  delete: <T>(endpoint: string) => apiClient<T>(endpoint, { method: 'DELETE' }),
  patch: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, { method: 'PATCH', body }),
};

