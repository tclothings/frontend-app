"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "app/api/auth";
import Input from "app/components/form/Input";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { registerSchema } from "app/lib/schemas/auth";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const { register } = useAuth();
  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, setValue } = methods;

  // useEffect(() => {
  //   if (register.error) {
  //     if (
  //       axios.isAxiosError(register.error) &&
  //       register.error?.status === 400
  //     ) {
  //       setValue("password", "");
  //     }
  //   }
  // }, [register.error]);

  useEffect(() => {
    if (register.isSuccess) {
      toast.success(register.data?.message);
      const savedEmail = register.data?.data?.user?.email!;
      if (savedEmail) {
        localStorage.setItem("savedEmail", savedEmail);
      }
      register.reset();
      setValue("email", "");
      setValue("password", "");
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }, [register.isSuccess]);

  useEffect(() => {
    if (register.isError) {
      register.reset();
    }
  }, [register.isError]);

  const onSignup = async (data: any) => {
    register.mutate(data);
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
          schema={registerSchema}
        />

        <PasswordInput
          name="password"
          placeholder="Password"
          methods={methods}
          schema={registerSchema}
        />
        <Input
          name="firstName"
          placeholder="First Name"
          methods={methods}
          type="text"
          schema={registerSchema}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          methods={methods}
          type="text"
          schema={registerSchema}
        />
        <SubmitButton
          handleSubmit={handleSubmit(onSignup)}
          isLoading={register.isPending}
          name="Register"
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
