"use client";
import FilterList from "../categories/filter";
import { clientNavMenu } from "app/lib/constants";

export default function NavList() {
  return <FilterList list={clientNavMenu} title="Account" />;
}
