"use client"
import Login from "app/features/auth/Login";
import { Suspense } from "react";

export default function Page() {

  return (
    <Suspense fallback={null}>
      <Login />
      </Suspense>
  );
}
