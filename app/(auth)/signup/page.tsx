"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Input from "app/components/form/Input";
import PasswordInput from "app/components/form/passwordInput";
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

  const onSignup = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="text-grey-900 pb-8 md:pb-6">
      <header className="my-6 flex flex-col items-center gap-3">
        <h1
          className={clsx(
            "font-medium text-2xl md:text-[36px] ",
            // testSohne.className,
            "antialiased"
          )}
        >
          Create Account
        </h1>
        <p className="text-sm text-grey-600">
          Create your account and start shopping
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
        <SubmitButton
          handleSubmit={handleSubmit(onSignup)}
          isLoading={false}
          name="Login"
        />
      </div>
      <div className="flex justify-center mt-8">
        <Link href={"/login"}>
          Already have an account?
          <span className="text-blue-600 font-semibold ml-2"> Login</span>
        </Link>
      </div>
    </div>
  );
}
