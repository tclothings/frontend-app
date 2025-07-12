"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import { useProfile } from "app/api/useAuth";
import Button from "app/components/form/button";
import Logout from "app/components/ui/logout";
import Image from "next/image";

export default function ProfileAvatar() {

  const { userProfile } = useProfile();
  const avatar = userProfile?.data?.profilePicture ?? "";
  const email = userProfile?.data?.email ?? "";
  const firstName = userProfile?.data?.firstName ?? "";

  return (
    <>
      <Menu as="div" className="relative inline-block text-left border-none">
        <MenuButton
          as={Button}
          icon={
            <div className="flex items-center gap-2 p-2">
              <div className="flex justify-center items-center w-[24px] h-[24px]">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={"avatar"}
                    width={24}
                    height={24}
                    className="rounded-full border border-[var(--foreground)]"
                  />
                ) : (
                  <UserIcon
                    width={24}
                    className="text-black dark:text-white"
                  />
                )}
              </div>
              <p className="hidden md:flex text-[var(--foreground)]">
                Hi {firstName || email}
              </p>
              {/* <span> */}
              <ChevronDownIcon
                width={16}
                className="hidden md:flex text-black dark:text-white"
              />
              {/* </span> */}
            </div>
          }
        />

        <MenuItems
          className="absolute left-1/2 mt-2 max-w-56  w-full origin-top-center rounded-md dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20
             -translate-x-1/2 flex flex-col items-center"
        >
          {/* Optionally wrap your items */}
          <MenuItem>
            {() => (
              // { focus } // You can use 'active' for styling if needed
              // Pass a class to Logout if it needs active/hover styling
              // Or directly apply styling to the button within Logout
              <Logout />
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
