// store/useUserStore.ts
import { create } from "zustand";

interface UserState {
  user: any;
  isUserLoading: boolean;
  setUser: (user: any) => void;
  clearUser: () => void;
  setIsUserLoading: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isUserLoading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsUserLoading: (value) => set({ isUserLoading: value }),
}));
