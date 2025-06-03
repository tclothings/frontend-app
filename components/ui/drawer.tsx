"use client";

import clsx from "clsx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";


interface DrawerProps {
  drawerOpenerText?: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  drawerOpenerClass?: string;
  size?: "sm" | "lg"
}
export default function Drawer({
  drawerOpenerText,
  title,
  children,
  isOpen,
  onClose,
  onOpen,
  drawerOpenerClass,
  size="sm",
}: DrawerProps) {
  // const [isOpen, setIsOpen] = useState(false);
  // const openModal = () => setIsOpen(true);
  // const closeDrawer = () => setIsOpen(false);
  const getSize = {
    "sm": "max-w-[390px]",
    "lg": "max-w-[700px]"
  };
  return (
    <>
      {drawerOpenerText && (
        <button
          aria-label="Open drawer"
          onClick={onOpen}
          className={clsx(
            "hover:cursor-pointer text-blue-600 font-bold px-4 py-2 rounded",
            drawerOpenerClass
          )}
        >
          {drawerOpenerText}
        </button>
      )}
      <Transition show={isOpen}>
        <Dialog onClose={onClose} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel
              className={clsx(
                "fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white",
                getSize[size]
              )}
            >
              <div className="flex items-center justify-between mb-8 bg-[var(--background)]">
                <p className="text-lg font-semibold">{title}</p>
                <button
                  aria-label="Close drawer"
                  onClick={onClose}
                  className="hover:cursor-pointer"
                >
                  <CloseDrawer />
                </button>
              </div>
              <div className="h-full overflow-y-auto py-5"> {children}</div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseDrawer({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className
        )}
      />
    </div>
  );
}
