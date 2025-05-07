"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { loginSchema, passwordSchema } from "app/lib/schemas/auth";
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
          Reset Password
        </h1>
        <p className="text-sm text-grey-600">
          We now know that it is You!. Its time to create a new password
        </p>
      </header>
      <div className="flex flex-col gap-5">
        <PasswordInput
          name="newPassword"
          placeholder="New Password"
          type="password"
          methods={methods}
          schema={passwordSchema}
        />
        <PasswordInput
          name="confirmNewPassword"
          placeholder="Confirm Password"
          type="password"
          methods={methods}
          schema={passwordSchema}
        />
        <SubmitButton
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={false}
          name="Reset Password"
        />
        <div className="flex justify-center">
          <Link
            href={"/login"}
            className="mt-6 font-semibold text-blue-600 text-sm"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </section>
  );
}
