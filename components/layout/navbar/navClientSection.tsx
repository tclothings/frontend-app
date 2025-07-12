"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import CartModal from "app/components/cart/modal";
import { useSession } from "next-auth/react";
import { publicAuthRoutes } from "app/lib/constants";

const ProfileAvatar = dynamic(() => import("./profileAvatar"), { ssr: false });

export default function NavClientSection() {
  const { data: session } = useSession()
  const pathname = usePathname();
  const role = session?.user?.roles?.[0];
  const isAccountRoute =
    pathname.startsWith("/my-account")
  const isUser = session && role === "customer";
  const isNotCheckout = !pathname.startsWith("/checkout");
  const isPublicRoute = publicAuthRoutes.some((route) =>
    pathname.endsWith(route)
  );
  return (
    <div className="flex gap-2 items-center justify-end md:w-1/3">
      {isAccountRoute && <ProfileAvatar />}

      {isUser && isNotCheckout && !isPublicRoute && <CartModal />}
    </div>
  );
}
