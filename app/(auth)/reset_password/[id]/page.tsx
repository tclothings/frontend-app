"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "app/api/auth";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { passwordSchema } from "app/lib/schemas/auth";
import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const token = params.id;
  const { resetPassword } = useAuth();

  const methods = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    if (resetPassword.isError) {
      resetPassword.reset();
    }
  }, [resetPassword.isError]);

  useEffect(() => {
    if (resetPassword.isSuccess) {
      resetPassword.reset();
      toast.success(resetPassword.data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 10000);
    }
  }, [resetPassword.isSuccess]);

  const onSubmit = async (data: any) => {
    const payload = { ...data };
    delete payload.confirmNewPassword;
    payload.resetToken = token;
    resetPassword.mutate(payload);
    console.log(data, payload);
    // resetToken;
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
          isLoading={resetPassword.isPending}
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
