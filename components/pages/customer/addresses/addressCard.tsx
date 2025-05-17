import Button from "app/components/form/button";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const AddressCard = ({
  item,
}: {
  item?: any;
}) => {

  return (
    <div className="w-full">
      <div
        className={clsx("p-4 border rounded-sm dark:border-white ", {
          "bg-red-50": item?.default,
        })}
      >
        <p>
          {item?.firstName} {item?.lastName}
        </p>
        <p>{item?.address}</p>
        <p>{item?.phone}</p>
        {item?.default && <p>Default Address </p>}
      </div>
      <div className="p-2 flex item-center justify-between border rounded-sm dark:border-white">
        <Button
          text="Set as default"
          disabled={item?.default}
          className="p-2"
        />
        <div className="flex item-center gap-2">
          <Button
            icon={<PencilIcon width="24" color="#E04337" />}
            className="p-2"
            // onClick={() => setShowAddEditAddress(false)}
          />
          <Button
            icon={<TrashIcon width="24" color="#E04337" />}
            className="p-2"

            // onClick={() => setShowAddEditAddress(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
