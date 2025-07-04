import { IUser } from "app/lib/types";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      roles?: string[];
    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    roles?: string[];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    // roles?: string[];
    accessToken?: string;
    user: IUser
  }
}
