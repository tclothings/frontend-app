"use client";
import { usePathname } from "next/navigation";
import FilterList from "../categories/filter";
import { clientNavMenu, adminNavMenu } from "app/lib/constants";
import { useSession } from "next-auth/react";

export default function NavList() {
    const { data: session } = useSession()
    const pathname = usePathname();
    const role = session?.user?.roles?.[0];

    const isAdminRoute = pathname.startsWith("/admin");

    const nav = isAdminRoute
      ? role === "admin"
        ? adminNavMenu.filter((item) => item.title !== "Admins")
        : adminNavMenu
    : clientNavMenu;
  
  return <FilterList list={nav} title="Account" />;
}
