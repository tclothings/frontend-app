"use client";
import PasswordChange from "./passwordChange";
import Biodata from "./biodata";

export default function Profile() {

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="py-6 px-0 md:px-6 border-t border-b border-l-none border-r-none md:border-r md:border-l border-grey-100 rounded-none md:rounded-lg">
          <h2 className="text-grey-900 font-medium text-lg border-b border-b-grey-50 pb-3">
            Personal Information
          </h2>
          {/* <ProfileImage /> */}
          <Biodata />
          <PasswordChange />
        </div>
      </div>
    </div>
  );
}
