import { useAdminUsers } from "app/api/admin/users";
import SubmitButton from "app/components/form/submitButton";
import { capitalizeWord, formatDate } from "app/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

interface ViewAdminProps{
  onSuccess: () => void,
  item: any
}
const ViewAdmin = ({ onSuccess, item }: ViewAdminProps) => {
  const { disableAdmin, enableAdmin } = useAdminUsers();

  const isAdminActive = item.status?.toLowerCase === "active"
  
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
      disableAdmin.mutate(item._id)
    } else {
      enableAdmin.mutate(item._id);

    }
  };
  return (
    <div>
      <p className="text-sm text-grey-900">
        Date Registered: {formatDate(item?.createdAt)}
      </p>
      <div className="flex flex-col gap-3 border-b border-b-grey-50">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-xs space-y-1">
            <h4 className="text-grey-700">First Name</h4>
            <p className="text-grey-900 font-medium">
              {capitalizeWord(item?.firstName)}
            </p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-grey-700">Last Name</h4>
            <p className="text-grey-900 font-medium">
              {capitalizeWord(item?.lastName)}
            </p>
          </div>
        </div>
        <div className="text-xs space-y-1">
          <h4 className="text-grey-700">Email:</h4>
          <p className="text-grey-900 font-medium">{item?.email}</p>
        </div>
        <div className="text-xs space-y-1">
          <h4 className="text-grey-700">Role</h4>
          <p className="text-grey-900 font-medium">
            {" "}
            {item?.roles?.toString()}
          </p>
        </div>
      </div>
      <SubmitButton
        handleSubmit={onHandleAdminUpdate}
        isLoading={enableAdmin.isPending || disableAdmin.isPending}
        name={isAdminActive ? "Disbale" : "Enable"}
      />
    </div>
  );
};


export default ViewAdmin;