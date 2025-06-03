import { TableBodyProps } from "app/lib/types";
import emptyData from "app/public/images/emptyData.png";
import Image from "next/image";

const TableBody = ({
  children,
  className,
  length,
  headerLength,
}: TableBodyProps) => {
  return (
    <>
      {!length ? (
        <tbody>
          <tr className="">
            <td colSpan={headerLength}>
              <div className="flex flex-col items-center justify-center pt-20">
                <Image src={emptyData} alt="no data" />
                <p>No data</p>
              </div>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody className={className}>{children}</tbody>
      )}
    </>
  );
};

export default TableBody;
