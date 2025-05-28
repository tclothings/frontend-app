import { TableProps } from "app/lib/types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { Suspense } from "react";
import Pagination from "../pagination";

const Table = ({
  isLoading,
  children,
  length,
  className,
  headers,
  img,
  title,
  text,
  header,
  showRowCount,
  bulkActions,
  selectedRowKeys,
  totalPages = 0,
  rows,
  showPagination=false
}: TableProps) => {
  return (
    // <div className="max-w-[1267px] xl:max-w-[calc(100vw-280px)] hidden-scroll-bar z-30">
    <>
      <div className={`w-full overflow-x-auto hidden-scroll-bar z-30`}>
        <div className="pl-4 space-y-2 flex justify-between items-center">
          {header && (
            <h3 className="font-[tahoma] text-lg font-bold text-[var(--grey-800)]">
              {header} {showRowCount && `(${rows ?? 0})`}
            </h3>
          )}
          {bulkActions && selectedRowKeys && selectedRowKeys.length > 0 && (
            <div className="flex items-center gap-2">
              {bulkActions.map((each: any, idx: number) => (
                <div key={idx}>{each.render()}</div>
              ))}{" "}
            </div>
          )}
        </div>
        {/* {length &&  <table className={`${length ? "table-fixed" : "table-auto"} bg-white w-full max-w-[1267px] xl:max-w-[calc(100vw-280px)] rounded-s-lg`}> */}
        <table className={` w-full`}>
          <TableHeader headers={headers} />
          <TableBody
            isLoading={isLoading}
            length={length}
            className={className}
            img={img}
            title={title}
            text={text}
          >
            {children}
          </TableBody>
        </table>
      </div>
      {showPagination && (
        <Suspense>
          <div className="mt-6">
            <Pagination totalPages={totalPages} />
          </div>
        </Suspense>
      )}
    </>
  );
};

export default Table;
