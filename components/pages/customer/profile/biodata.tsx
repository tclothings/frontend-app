"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import SubmitButton from "app/components/form/submitButton";
import { userInfoSchema } from "app/lib/schemas/biodata";
import { useForm } from "react-hook-form";
import PasswordChange from "./passwordChange";
import { useProfile } from "app/api/client/profile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProfileImage from "./profileImage";
import Button from "app/components/form/button";
import User from "app/components/icons/user";
import Image from "next/image";
import ChangeProfileImg from "app/components/icons/changeProfileImg";
import { toast } from "sonner";

export default function Biodata() {
  const { userProfile, updateBioData } = useProfile();

  const imgInputRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<string>("");
  const methods = useForm({
    resolver: yupResolver(userInfoSchema),
  });
  const { setValue } = methods

  useEffect(() => {
    if (updateBioData.isSuccess) {
      toast.success(updateBioData.data?.message);
      updateBioData.reset();
    }
  }, [updateBioData.isSuccess]);
  useEffect(() => {
    if (userProfile.isSuccess) {
      setValue("firstName", userProfile?.data?.firstName);
      setValue("lastName", userProfile?.data?.lastName);
      setValue("phoneNumber", userProfile?.data?.phoneNumber?.number);
      setValue("profilePicture", userProfile?.data?.profilePicture ?? "");
    }
  }, [userProfile.isSuccess]);

  function handleUploadClick() {
    if (imgInputRef.current) {
      imgInputRef?.current.click();
    }
  }
  function handleImgUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const maxSize = 10 * 1024 * 1024;
    if (e.target.files[0]?.size > maxSize) {
      alert("file is too large");
      return;
    }
    setImgFile(URL.createObjectURL(e.target.files[0]));
  }

  const { handleSubmit } = methods;

  const onUpdateProfile = (data: any) => {
     const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) =>
          value !== "" && value !== null && value !== undefined
      )
    );

    updateBioData.mutate(cleanedData as any);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4 py-6">
        <div className="flex justify-center items-center w-[96px] h-[96px] md:w-[160px] md:h-[160px] rounded-[200px] border border-[4px] border-primary-500">
          {imgFile ? (
            <Image
              src={imgFile}
              alt={"avatar"}
              width={160}
              height={160}
              className="w-[96px] h-[96px] md:w-[160px] md:h-[160px] rounded-[200px]"
            />
          ) : (
            <>
              <span className="block md:hidden">
                <User width="40" />
              </span>
              <span className="hidden md:block">
                <User width="80" />
              </span>
            </>
          )}
        </div>
        <div>
          <Button
            text="Change Photo"
            className="text-grey-700 font-medium border border-[1.5px] border-grey-300 py-[10px] px-4 rounded-lg"
            icon={<ChangeProfileImg />}
            onClick={handleUploadClick}
            disabled={updateBioData.isPending}
          />
          <input
            ref={imgInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => handleImgUpload(e)}
            disabled={updateBioData.isPending}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            type="text"
            name="firstName"
            methods={methods}
            placeholder="First Name"
            schema={userInfoSchema}
            disabled={updateBioData.isPending}
          />
          <Input
            type="text"
            name="lastName"
            methods={methods}
            placeholder="Last Name"
            schema={userInfoSchema}
            disabled={updateBioData.isPending}
          />
        </div>
          <NumberInput
            placeholder="Phone Number"
            name="phoneNumber"
            methods={methods}
            schema={userInfoSchema}
            disabled={updateBioData.isPending}
          />
          {/* <Input
                type="date"
                name="dateOfBirth"
                methods={methods}
                placeholder="D.O.B"
                schema={userInfoSchema}
              /> */}
        <div className="px-0 md:px-6 flex justify-end">
          <SubmitButton
            isSmallBtn={true}
            name="Save"
            isLoading={updateBioData.isPending}
            handleSubmit={handleSubmit(onUpdateProfile)}
          />
        </div>
      </div>
    </>
  );
}
