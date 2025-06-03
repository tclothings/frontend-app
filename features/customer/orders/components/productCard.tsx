import { fullName } from "app/lib/utils";
import Image from "next/image";

export default function ProductCard({
  userFirstName,
  userLastName,
}: {
  userFirstName: string;
  userLastName: string;
}) {
  return (
    <div className="flex gap-3 w-full">
      {/* <div className="text-sm flex flex-col justify-between text-grey-500 w-full"> */}
        <p className="w-[99%] whitespace-nowrap text-ellipsis overflow-hidden ...">
          {fullName(userFirstName, userLastName)}
        </p>
        {/* <p className="underline w-[99%] whitespace-nowrap text-ellipsis overflow-hidden ...">
          {userLastName}
        </p>
      </div> */}
    </div>
  );
}
