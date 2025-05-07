"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Input from "app/components/form/Input";
import SubmitButton from "app/components/form/submitButton";
import { loginSchema } from "app/lib/schemas/auth";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <section className="pb-8 md:pb-6 flex flex-col gap-10">
      <header className="my-6 flex flex-col items-center gap-5">
        <h1
          className={clsx(
            "font-medium text-2xl md:text-[36px] ",
            // testSohne.className,
            "antialiased"
          )}
        >
          Forgot Password?
        </h1>
        <p className="text-sm text-grey-600">
          Please enter your email address. You will receive a link to create a
          new password via email.{" "}
        </p>
      </header>
      <div className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          methods={methods}
          schema={loginSchema}
        />
        <SubmitButton
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={false}
          name="Reset Password"
        />
        <div className="flex justify-center">
          <Link
            href={"/login"}
            className="mt-6 font-semibold  text-blue-600 text-sm"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </section>
  );
}
