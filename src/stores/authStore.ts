import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { STORAGE_KEYS } from '../lib/constants';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Mock API call - simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock user data based on email
          const mockUser: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: email.includes('student') ? 'student' :
                  email.includes('lecturer') ? 'lecturer' :
                  email.includes('admin') ? 'admin' :
                  email.includes('finance') ? 'finance' : 'student',
            isEmailVerified: true,
            hasCompletedOnboarding: true,
            createdAt: new Date().toISOString(),
          };

          // Mock token
          const mockToken = `mock-jwt-token-${Date.now()}`;

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: 'Login failed. Please try again.',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
