"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "app/apis/useAuth";
import Input from "app/components/form/Input";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { loginSchema } from "app/lib/schemas/auth";
// import useAuth from "app/store/authStore";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const { verifyEmail } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const verifyLink = params.get("response");

  useLayoutEffect(() => {
    const error = params.has("error");
    const authError = params.has("isAuthError");
    const callbackUrl = params.get("callbackUrl");

    if (authError || error) {
      const message = params.get("error");
      toast.error(
        message ||
          "Ooops An Error occurred while trying to login, please try again later"
      );
      router.push(`${pathname}?callbackUrl=${callbackUrl}`);
    }
  }, []);

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

  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit, setValue } = methods;

  const onLogin = async (data: any) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.error) {
      toast.error(res?.error || "Login failed");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.success("Login successful");
      router.push("/my-account/orders");
    }
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
          isLoading={isLoading}
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
