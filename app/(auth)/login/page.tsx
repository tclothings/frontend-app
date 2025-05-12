"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "app/api/auth";
import Input from "app/components/form/Input";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { loginSchema } from "app/lib/schemas/auth";
import axios from "axios";
// import useAuth from "app/store/authStore";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const { login } = useAuth();
  const router = useRouter();
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
    if (login.isSuccess) {
      login.reset();
      console.log(login.data, "data");
    }
  }, [login.isSuccess]);

  useEffect(() => {
    if (login.error) {
      console.log(login.error, "login.error", login.data);
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
    console.log(data);
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
          <Link shallow={true} href="/forgot_password" className="text-sm">
            Forgot Password?
          </Link>
        </div>
        <SubmitButton
          handleSubmit={handleSubmit(onLogin)}
          isLoading={login.isPending}
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
