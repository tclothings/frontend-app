"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import SubmitButton from "app/components/form/submitButton";
import { userInfoSchema } from "app/lib/schemas/biodata";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "app/components/form/button";
import Image from "next/image";
import { toast } from "sonner";
import { uploadToS3 } from "app/lib/configs/s3Client";
import User from "app/components/icons/user";
import ChangeProfileImg from "app/components/icons/changeProfileImg";
import { useProfile } from "app/apis/useAuth";

export default function Biodata() {
  const { userProfile, updateBioData } = useProfile();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const imgInputRef = useRef<HTMLInputElement>(null);
  const methods = useForm({
    resolver: yupResolver(userInfoSchema),
  });

  const { setValue, handleSubmit, watch } = methods;

  const profilePicture = watch("profilePicture");

  useEffect(() => {
    if (updateBioData.isSuccess) {
      toast.success(updateBioData.data?.message);
      updateBioData.reset();
      setProfileImageFile(null);
      // Clean up temporary URL if it exists
      if (profilePicture && profilePicture.startsWith("blob:")) {
        URL.revokeObjectURL(profilePicture);
      }
    }
  }, [updateBioData.isSuccess, profilePicture]);
  useEffect(() => {
    if (userProfile.isSuccess) {
      setValue("firstName", userProfile?.data?.firstName);
      setValue("lastName", userProfile?.data?.lastName);
      setValue("phoneNumber", userProfile?.data?.phoneNumber?.number);
      setValue("profilePicture", userProfile?.data?.profilePicture);
    }
  }, [userProfile.isSuccess]);

  // Cleanup temporary URLs on component unmount
  useEffect(() => {
    return () => {
      if (profilePicture && profilePicture.startsWith('blob:')) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [profilePicture]);

  function handleUploadClick() {
    if (imgInputRef.current) {
      imgInputRef?.current.click();
    }
  }

  function handleImgUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;
    const maxSize = 10 * 1024 * 1024;
    if (file?.size > maxSize) {
      return alert("file is too large");
    }
    // Store the file instead of uploading immediately
    setProfileImageFile(file);
    // Create a temporary URL for immediate display
    const tempUrl = URL.createObjectURL(file);
    setValue("profilePicture", tempUrl, { shouldValidate: true });
    e.target.value = ""; // Reset input
  }

  const onUpdateProfile = async (data: any) => {
    try {
      let cleanedData = { ...data };
      cleanedData.profilePicture = undefined;
      if (profileImageFile) {
        try {
          const profileImageUrl = await uploadToS3(profileImageFile, "profile");
          cleanedData.profilePicture = profileImageUrl;
        } catch (error) {
          console.error("Error uploading profile image:", error);
          toast.error("Failed to upload profile image. Please try again.");
          return;
        }
      } else if (userProfile?.data?.profilePicture) {
        cleanedData.profilePicture = userProfile.data.profilePicture;
      }

      const finalData = Object.fromEntries(
        Object.entries(cleanedData).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      updateBioData.mutate(finalData as any);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4 py-6">
        <div className="flex justify-center items-center w-[96px] h-[96px] md:w-[160px] md:h-[160px] rounded-[200px] border border-[4px] border-primary-500">
          {profilePicture ? (
            <Image
              src={profilePicture}
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
            className="!text-[var(--foreground)] !dark:text-grey-700 font-medium border border-[1.5px]  border-[var(--foreground)] dark:border-grey-300 py-[10px] px-4 rounded-lg"
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
