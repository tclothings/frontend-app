"use client"
import Button from "app/components/form/button";
import ChangeProfileImg from "app/components/icons/ChangeProfileImg";
import User from "app/components/icons/User";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function ProfileImage({ profileImg }: { profileImg : string}) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<string>("");

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

  return (
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
        />
        <input
          ref={imgInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => handleImgUpload(e)}
        />
      </div>
    </div>
  );
}