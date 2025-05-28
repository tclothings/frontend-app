"use client";
import PasswordChange from "./passwordChange";
import Biodata from "./biodata";
import AccountPageHeader from "app/components/ui/accountPageHeader";

export default function Profile() {
  return (
    <div className="">
      <div className="flex flex-col pb-4 px-4">
        {/* <div className="py-6 px-0 md:px-6"> */}
        <AccountPageHeader title="Profile" />

        {/* <ProfileImage /> */}
        <Biodata />
        <PasswordChange />
        {/* </div> */}
      </div>
    </div>
  );
}
