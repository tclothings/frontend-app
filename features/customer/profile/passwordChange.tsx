"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useProfile } from "app/api/client/profile";
import PasswordInput from "app/components/form/passwordInput";
import SubmitButton from "app/components/form/submitButton";
import { changePasswordSchema } from "app/lib/schemas/biodata";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function PasswordChange() {
  const { changePassword } = useProfile();
  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const { handleSubmit, reset } = methods;
  useEffect(() => {
    if (changePassword.isSuccess) {
      toast.success(changePassword.data?.message);
      changePassword.reset();
      reset();
    }
  }, [changePassword.isSuccess]);

  const onPasswordChange = (data: any) => {
    const cleanedData = { ...data };
    delete cleanedData.confirmNewPassword;
    changePassword.mutate(cleanedData);
  };

  return (
    <div className="mt-[38px] py-6 px-0 md:px-6 border-t border-l-none border-r-none border-b-none md:border-r md:border-l md:border-b border-grey-100 rounded-none md:rounded-lg">
      <h2 className="text-grey-900 font-medium text-lg border-b border-b-grey-50 pb-4">
        Change Password
      </h2>
      <div className="flex flex-col gap-6 w-full pt-4">
        <PasswordInput
          name="currentPassword"
          placeholder="Current Password"
          type="password"
          methods={methods}
          schema={changePasswordSchema}
          disabled={changePassword.isPending}
        />
        <PasswordInput
          name="newPassword"
          placeholder="New Password"
          type="password"
          methods={methods}
          schema={changePasswordSchema}
          disabled={changePassword.isPending}
        />
        <PasswordInput
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          type="password"
          methods={methods}
          schema={changePasswordSchema}
          disabled={changePassword.isPending}
        />
        <div className="px-0 md:px-6 flex justify-end">
          <SubmitButton
            isSmallBtn={true}
            name="Save"
            handleSubmit={handleSubmit(onPasswordChange)}
            isLoading={changePassword.isPending}
          />
        </div>
      </div>
    </div>
  );
}
