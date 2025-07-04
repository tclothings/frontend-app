"use client";
import { Dispatch, SetStateAction } from "react";
import Modal from "./modal";
import Button from "../form/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  confirmationMessage: string;
  acceptAction: any;
  title?: string;
}
const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  confirmationMessage,
  acceptAction,
  title
}: ConfirmationModalProps) => {
  const handleAcceptAction = () => {
    acceptAction();
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        className="text-black text-center"
      >
        <div className="flex flex-col gap-10 items-center">
          <p>Are you sure you want to {confirmationMessage} ?</p>
          <div className="flex items-center gap-10 justify-between">
            <Button
              text="Yes"
              onClick={handleAcceptAction}
              className="bg-blue-500 text-white rounded !px-6"
            />
            <Button
              text="No"
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white rounded !px-6"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
