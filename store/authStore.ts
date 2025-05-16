import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie"
type User = {
  email: string;
  firstName: string;
  fullName: string;
  id: number;
  lastName: string;
};
interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  token: string | null;
  role: string | null;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
let initialIsLoggedIn = false;
let initialUser: User | null = null;
let initialToken: string | null = null;
let initialRole: string | null = null;

try {
  const userData = Cookies.get("user");
  if (userData) {
    const parsedUser = JSON.parse(userData ?? "");
    initialIsLoggedIn = Boolean(parsedUser.access_token);
    // initialUser = parsedUser;
    // initialToken = Cookies.get("next-auth.session-token") || null;
    // initialRole = parsedUser.roles?.[0] || null;
  }
} catch (error) {
  console.warn("Invalid cookie user data");
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: initialIsLoggedIn,
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      token: null,
      role: null,
      user: null,
      login: (user) => set({ user: user }),
      logout: () => set({ token: null, role: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
