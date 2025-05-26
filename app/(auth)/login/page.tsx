"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "app/api/auth";
import Input from "app/components/form/Input";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { loginSchema } from "app/lib/schemas/auth";
import useAuthStore from "app/store/authStore";
import axios from "axios";
// import useAuth from "app/store/authStore";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function Page() {
  const { login: setLoginData } = useAuthStore();
  const { login, verifyEmail } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const verifyLink = params.get("response");

  // const { login } = useAuth((state) => state);
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, []);

  useEffect(() => {
    if (verifyLink) {
      verifyEmail.mutate(verifyLink);
    }
  }, [verifyLink]);

  useEffect(() => {
    if (verifyEmail.isSuccess) {
      verifyEmail.reset();
      toast.success(verifyEmail.data?.message);
      router.replace("/login");
    }
    if (verifyEmail.isError) {
      verifyEmail.reset();
      router.replace("/login");
    }
  }, [verifyEmail.isSuccess, verifyEmail.isError]);

  useEffect(() => {
    if (login.isSuccess) {
      const { data } = login;
      login.reset();
      const user = JSON.stringify({
        user: data?.data?.user!,
        access_token: data?.data?.access_token!,
      });
      Cookies.set("user", user, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: data?.data?.exires_in, // 1 day
      });
      router.push("/my-account/orders");
      toast.success(data?.message);
    }
  }, [login.isSuccess]);

  useEffect(() => {
    if (login.error) {
      if (axios.isAxiosError(login.error) && login.error?.status === 400) {
        // setValue("password", "");
      }
      login.reset();
    }
  }, [login.error]);

  const onLogin = async (data: any) => {
    login.mutate(data);
    // login("134", "admin");
    // router.push("/my-account/profile")
  };
  return (
    <section className="pb-8 md:pb-6">
      <header className="my-6 flex flex-col items-center gap-3">
        <h1
          className={clsx(
            "font-medium text-2xl md:text-[36px] ",
            // testSohne.className,
            "antialiased"
          )}
        >
          Welcome Back
        </h1>
        <p className="text-sm text-grey-600">
          Access your account to continue shopping
        </p>
      </header>
      <div className="flex flex-col gap-5">
        <Input
          name="email"
          placeholder="Email"
          methods={methods}
          type="email"
          schema={loginSchema}
        />

        <PasswordInput
          name="password"
          placeholder="Password"
          methods={methods}
          schema={loginSchema}
        />
        <div className="flex justify-end">
          <Link shallow={true} href="/forgot-password" className="text-sm">
            Forgot Password?
          </Link>
        </div>
        <SubmitButton
          handleSubmit={handleSubmit(onLogin)}
          isLoading={login.isPending || verifyEmail.isPending}
          name="Login"
        />
      </div>
      <div className="flex justify-center leading-loose mt-8">
        <Link href={"/signup"}>
          Need to create an account?
          <span className="text-blue-600 font-semibold ml-1"> Register</span>
        </Link>
      </div>
    </section>
  );
}
