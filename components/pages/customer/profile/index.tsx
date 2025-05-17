"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import SubmitButton from "app/components/form/submitButton";
import { userInfoSchema } from "app/lib/schemas/biodata";
import { useForm } from "react-hook-form";
import PasswordChange from "./passwordChange";

export default function Profile() {
  const methods = useForm({
    resolver: yupResolver(userInfoSchema),
  });
  const { handleSubmit } = methods;
  const onUpdateProfile = (data: any) => {
    
  }
  return (
    <div className="">
      <form className="flex flex-col">
        <div className="py-6 px-0 md:px-6 border-t border-b border-l-none border-r-none md:border-r md:border-l border-grey-100 rounded-none md:rounded-lg">
          <h2 className="text-grey-900 font-medium text-lg border-b border-b-grey-50 pb-3">
            Personal Information
          </h2>
          <div className="flex flex-col gap-5 pt-3">
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                name="firstName"
                methods={methods}
                placeholder="First Name"
                schema={userInfoSchema}
              />
              <Input
                type="text"
                name="lastName"
                methods={methods}
                placeholder="Last Name"
                schema={userInfoSchema}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <NumberInput
                placeholder="Phone Number"
                name="phone"
                methods={methods}
                schema={userInfoSchema}
              />
              <Input
                type="date"
                name="dateOfBirth"
                methods={methods}
                placeholder="D.O.B"
                schema={userInfoSchema}
              />
            </div>
            <div className="px-0 md:px-6 flex justify-end">
              <SubmitButton
                isSmallBtn={true}
                name="Save"
                isLoading={false}
                handleSubmit={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </div>
        <PasswordChange />
      </form>
    </div>
  );
}
