import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    username: string | null;
    token: string | null;
    setUsername: (username: string) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            username: null,
            token: null,
            setUsername: (username) => set({ username }),
            setToken: (token) => set({ token }),
            clearAuth: () => set({ username: null, token: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);