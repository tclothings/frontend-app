import Cookies from "js-cookie";

class AuthService {
  getUserCookies(): { access_token?: string; user?: any } | null {
    const user = Cookies.get("user");
    if (!user) return null;
    try {
      const parsed = JSON.parse(user);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (err) {
      console.error("Failed to parse user cookie:", err);
      return null;
    }
  }

  getToken(): string | null {
      const parsedUser = this.getUserCookies();
    return parsedUser?.access_token ?? null;
  }

  getUser(): any | null {
    const parsedUser = this.getUserCookies();
    return parsedUser?.user ?? null;
  }
}

export const authService = new AuthService();
