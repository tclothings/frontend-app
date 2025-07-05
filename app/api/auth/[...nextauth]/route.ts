// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "app/lib/authOptions";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await post(
//             "auth/login",
//             {
//               email: credentials?.email,
//               password: credentials?.password,
//             },
//             { suppressToast: true } // 👈 prevent toast
//           );
//           const data = res.data?.data;

//           if (data?.user && data?.access_token) {
//             return {
//               id: data.user.id,
//               firstName: data.user.firstName,
//               lastName: data.user.lastName,
//               email: data.user.email,
//               accessToken: data.access_token,
//               roles: data.user.roles,
//             };
//           }
//           return null;
//         } catch (err: any) {
//           throw new Error(err?.customMessage || "Invalid credentials");
//           console.error("Login failed", err);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: any; user?: any }) {
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       session.user = token.user;
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login", // your current login page
//   },
// };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
