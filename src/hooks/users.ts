import { User } from '../types/users';
import { api } from '../services/api';
import { USER_ENDPOINTS } from '../constants/endpoints';
import { useApi } from './useApi';

export const useUsers = () => {
    const { data: users, loading, error, refetch } = useApi<User[]>(
        () => api.get<User[]>(USER_ENDPOINTS.USERS),
        { immediate: true }
    );

    return {
        users: users || [],
        loading,
        error,
        refetch,
    };
};