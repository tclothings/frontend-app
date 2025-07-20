
import StatusCard from "app/components/ui/statusCard";
import StatusTag from "app/components/ui/statusTag";
import { formatAmount, formatDate, roles } from "app/lib/utils";

interface ViewOrderProps {
  onSuccess: () => void;
  item: any;
}
const ViewOrder = ({ onSuccess, item }: ViewOrderProps) => {
  // const { disableAdmin, enableAdmin } = useAdminUsers();

  // const isAdminActive = item.status?.toLowerCase() === "active";

  // useEffect(() => {
  //   if (disableAdmin.isSuccess) {
  //     toast.success(disableAdmin?.data?.message);
  //     disableAdmin.reset();
  //     onSuccess();
  //   }
  // }, [disableAdmin.isSuccess]);

  // useEffect(() => {
  //   if (enableAdmin.isSuccess) {
  //     toast.success(enableAdmin?.data?.message);
  //     enableAdmin.reset();
  //     onSuccess();
  //   }
  // }, [enableAdmin.isSuccess]);

  // const onHandleAdminUpdate = () => {
  //   if (isAdminActive) {
  //     disableAdmin.mutate(item._id);
  //   } else {
  //     enableAdmin.mutate(item._id);
  //   }
  // };
  return (
    <div>
      <p className="text-sm mb-6 flex justify-between ">
        <span>
          <span className="text-neutral-500 dark:text-neutral-400">
            Date Created:
          </span>
          <span> {formatDate(item?.createdAt)}</span>
        </span>
        {/* <StatusTag status={item?.isActive ? "Active" : "Inactive"} /> */}
      </p>
      <div className="flex flex-col gap-6 border-b border-b-grey-50 mb-10 pb-5">
        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">
            Order Number
          </h4>
          <p className="font-medium">{item?.orderNumber}</p>
        </div>
        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">
            Payment Status{" "}
          </h4>
          <p className="font-medium">
            {<StatusCard status={item?.paymentStatus} />}
          </p>
        </div>

        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">
            Amount Paid
          </h4>
          <p className="font-medium">{formatAmount(item?.totalAmount)}</p>
        </div>

        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">
            Order Status
          </h4>
          <p className="font-medium">{<StatusCard status={item?.status}/>}</p>
        </div>
        <div className="text-xs space-y-1">
          <h4 className="text-neutral-500 dark:text-neutral-400">
            Delivery Note
          </h4>
          <p className="font-medium">{item?.customerNotes}</p>
        </div>
      </div>

      {/* <div className="flex justify-center">
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
      </div> */}
    </div>
  );
};

export default ViewOrder;
