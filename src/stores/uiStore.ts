import { create } from 'zustand';
import type { Notification } from '../types';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface UIState {
  isMobile: boolean;
  sidebarOpen: boolean;
  desktopSidebarPreference: boolean; // Store user's preference on desktop
  notifications: Notification[];
  toasts: Toast[];
  isLoading: boolean;

  // Actions
  setIsMobile: (isMobile: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

// Get initial state from localStorage or default
const getInitialSidebarState = () => {
  const stored = localStorage.getItem('degreedesk_sidebar_open');
  if (stored !== null) {
    return stored === 'true';
  }
  // Default: open on desktop, closed on mobile
  return window.innerWidth >= 1280; // Only open on larger screens
};

export const useUIStore = create<UIState>((set) => ({
  isMobile: window.innerWidth < 1024,
  sidebarOpen: getInitialSidebarState(),
  desktopSidebarPreference: getInitialSidebarState(),
  notifications: [],
  toasts: [],
  isLoading: false,

  setIsMobile: (isMobile) => {
    set((state) => {
      // When switching to mobile, always close sidebar
      // When switching to desktop, restore user preference
      const newSidebarOpen = isMobile ? false : state.desktopSidebarPreference;
      return { isMobile, sidebarOpen: newSidebarOpen };
    });
  },

  toggleSidebar: () => {
    set((state) => {
      const newOpen = !state.sidebarOpen;
      // Save preference to localStorage only on desktop
      if (!state.isMobile) {
        localStorage.setItem('degreedesk_sidebar_open', String(newOpen));
      }
      return {
        sidebarOpen: newOpen,
        desktopSidebarPreference: !state.isMobile ? newOpen : state.desktopSidebarPreference,
      };
    });
  },

  setSidebarOpen: (open) => {
    set((state) => {
      // Save preference to localStorage only on desktop
      if (!state.isMobile) {
        localStorage.setItem('degreedesk_sidebar_open', String(open));
      }
      return {
        sidebarOpen: open,
        desktopSidebarPreference: !state.isMobile ? open : state.desktopSidebarPreference,
      };
    });
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  showToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-remove after duration (default 5 seconds)
    const duration = toast.duration || 5000;
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
