import { create } from "zustand";

interface UserState {
  username: string | null;
  userId: string | null;
  setUser: (username: string, userId: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  userId: null,
  setUser: (username, userId) => set({ username, userId }),
  logout: () => set({ username: null, userId: null }),
}));
