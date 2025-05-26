"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import { authService } from "app/app/services/client/auth.service";
import Button from "app/components/form/button";
import Logout from "app/components/ui/logout";

export default function ProfileAvatar() {
  const user = authService.getUser();
  return (
    <>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton
            as={Button}
            icon={
              <div className="flex items-center gap-2 p-2">
                <UserIcon width={24} />
                <p className="hidden md:flex">
                  Hi {user?.firstName || user?.email}
                </p>
                {/* <span> */}
                <ChevronDownIcon width={16} className="hidden md:flex" />
                {/* </span> */}
              </div>
            }
          />

          <MenuItems
            className="absolute left-1/2 mt-2 w-56 origin-top-center rounded-md dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20
             -translate-x-1/2 flex flex-col items-center"
          >
            {/* Optionally wrap your items */}
            <div className="py-1 px-4">
              <Logout />
            </div>
          </MenuItems>
        </Menu>
    </>
  );
}
