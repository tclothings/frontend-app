// components/navbar/NavbarClient.tsx
"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import CartModal from "app/components/cart/modal";
import Cookies from "js-cookie";

const ProfileAvatar = dynamic(() => import("./profileAvatar"), { ssr: false });

export default function NavClientSection() {
  const pathname = usePathname();
  const userToken = Cookies.get("user")
  return (
    <div className="flex gap-2 items-center justify-end md:w-1/3">
      {["/my-account", "/admin"].some((item) => pathname.startsWith(item)) && (
        <ProfileAvatar />
      )}
      {userToken && !pathname.startsWith("/checkout") && <CartModal />}
    </div>
  );
}
