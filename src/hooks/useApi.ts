/**
 * Hook genérico reutilizable para manejar llamadas a API
 * Elimina duplicación de lógica de loading/error en todos los hooks
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { ApiState, UseApiOptions } from '../types/api';

export const useApi = <T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions<T> = {}
) => {
  const { immediate = false, onSuccess, onError } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Usar ref para mantener la referencia estable de apiCall
  const apiCallRef = useRef(apiCall);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Actualizar refs cuando cambian
  useEffect(() => {
    apiCallRef.current = apiCall;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [apiCall, onSuccess, onError]);

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await apiCallRef.current();
      setState({ data, loading: false, error: null });
      onSuccessRef.current?.(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      const error = err instanceof Error ? err : new Error(errorMessage);
      onErrorRef.current?.(error);
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  // Ejecutar inmediatamente si se solicita
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    refetch: execute, // Alias para compatibilidad
  };
};

