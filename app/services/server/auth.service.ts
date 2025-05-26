// app/services/server/auth.service.ts
import { cookies } from "next/headers";

class AuthServiceServer {
  async getUserCookies(): Promise<{
    access_token?: string;
    user?: any;
  } | null> {
    const cookieStore = await cookies(); // ✅ Await only if running in dynamic context
    const userCookie = cookieStore.get("user")?.value;
    if (!userCookie) return null;

    try {
      const parsed = JSON.parse(userCookie);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (err) {
      console.error("Failed to parse user cookie:", err);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    const parsedUser = await this.getUserCookies();
    return parsedUser?.access_token ?? null;
  }

  async getUser(): Promise<any | null> {
    const parsedUser = await this.getUserCookies();
    return parsedUser?.user ?? null;
  }
}

export const authServiceServer = new AuthServiceServer();
