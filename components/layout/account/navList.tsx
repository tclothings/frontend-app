"use client"
import { usePathname } from 'next/navigation';
import FilterList from '../search/filter';
import { clientNavMenu, adminNavMenu } from "app/lib/constants";

export default function NavList() {
  const pathname = usePathname()
  const nav = pathname.startsWith("/admin") ? adminNavMenu : clientNavMenu;
  return <FilterList list={nav} title="Account" />;
}

