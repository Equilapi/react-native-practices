/**
 * Tipos genéricos reutilizables para API y hooks
 */

// Estado genérico para hooks que manejan datos de API
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Opciones para el hook genérico useApi
export interface UseApiOptions<T> {
  immediate?: boolean; // Si debe ejecutarse inmediatamente
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

