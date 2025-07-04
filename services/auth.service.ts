// services/auth.service.ts
import { ISessionData } from "app/lib/types";
import { getSession, signOut } from "next-auth/react";

class AuthService {
  sessionData: ISessionData | undefined;
  constructor() {
    this.getSavedSession();
    this.getToken();
  }
  get token(): string {
    return this.sessionData?.accessToken as string;
  }
  async getToken(): Promise<string | undefined> {
    if (!this.sessionData) {
      const session: any = await getSession();
      this.sessionData = session;
    }
    return this.sessionData?.accessToken;
  }
  async getSavedSession() {
    try {
      const session: any = await getSession();
      this.sessionData = session;
    } catch (err) {}
  }
  async logout() {
    await signOut();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}

export const authService = new AuthService();
