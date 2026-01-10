'use client';

// Authentication hook
export function useAuth() {
  // Implementation coming soon
  return {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    login: async (email: string, password: string) => {},
    logout: async () => {},
    signup: async (data: any) => {},
  };
}
