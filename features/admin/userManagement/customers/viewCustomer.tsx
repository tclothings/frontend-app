import { useAdminUsers } from "app/api/admin/users";
import DisableButton from "app/components/form/disableButton";
import SubmitButton from "app/components/form/submitButton";
import StatusTag from "app/components/ui/statusTag";
import { capitalizeWord, formatDate, roles } from "app/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

interface ViewCustomerProps {
  onSuccess: () => void;
  item: any;
}
const ViewCustomer = ({ onSuccess, item }: ViewCustomerProps) => {
  const { disableAdmin, enableAdmin } = useAdminUsers();

  const isAdminActive = item.status?.toLowerCase() === "active";

  useEffect(() => {
    if (disableAdmin.isSuccess) {
      toast.success(disableAdmin?.data?.message);
      disableAdmin.reset();
      onSuccess();
    }
  }, [disableAdmin.isSuccess]);

  useEffect(() => {
    if (enableAdmin.isSuccess) {
      toast.success(enableAdmin?.data?.message);
      enableAdmin.reset();
      onSuccess();
    }
  }, [enableAdmin.isSuccess]);

  const onHandleAdminUpdate = () => {
    if (isAdminActive) {
      disableAdmin.mutate(item._id);
    } else {
      enableAdmin.mutate(item._id);
    }
  };
  return (
    <div>
      <p className="text-sm mb-6 flex justify-between ">
        <span>
          <span className="text-neutral-500 dark:text-neutral-400">
            Date Joined:
          </span>
          <span> {formatDate(item?.createdAt)}</span>
        </span>{" "}
        <StatusTag status={item?.status} />
      </p>
      <div className="flex flex-col gap-6 border-b border-b-grey-50 mb-10 pb-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              First Name
            </h4>
            <p className="font-medium">{capitalizeWord(item?.firstName)}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Last Name
            </h4>
            <p className="font-medium">{capitalizeWord(item?.lastName)}</p>
          </div>
        </div>
        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">Email:</h4>
          <a href={`mailto:${item?.email}`} className="font-medium">
            {item?.email}
          </a>
        </div>
        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">Role</h4>
          <p className="font-medium"> {roles(item?.roles)}</p>
        </div>
      </div>
      <div className="flex justify-center">
           {isAdminActive ? <DisableButton
             isSmallBtn
             handleSubmit={onHandleAdminUpdate}
             isLoading={disableAdmin.isPending}
             name={"Disable"}
           /> :
             <SubmitButton
               isSmallBtn
               handleSubmit={onHandleAdminUpdate}
               isLoading={enableAdmin.isPending}
               name={"Enable"}
             />}
      </div>
    </div>
  );
};

export default ViewCustomer;
