import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getCart } from "app/lib";
// import { CartProvider } from "app/components/cart/cart-context";
import { Navbar } from "app/components/layout/navbar";
import { Toaster } from "sonner";
import Footer from "app/components/layout/footer";
import { QueryProvider } from "app/components/providers/query-provider";
import Head from "next/head";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });



export const metadata: Metadata = {
  title: "T clothings",
  description: "T clothings",
  icons: [
    {
      rel: "icon",
      url: "/images/favicon-light.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/images/favicon-dark.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = getCart()
  return (

    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon-light.ico"/>
      </Head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {/* <CartProvider cartPromise={cart}> */}
        <QueryProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster
              richColors
              position="top-right"
              duration={5000}
              closeButton

            />
            <Footer />
        </QueryProvider>
        {/* </CartProvider> */}
      </body>
    </html>
  );
}
