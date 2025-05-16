import { TableProps } from "app/lib/types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({
  isLoading,
  children,
  length,
  className,
  headers,
  img,
  title,
  text,
}: TableProps) => {
  
  return (
    // <div className="max-w-[1267px] xl:max-w-[calc(100vw-280px)] hidden-scroll-bar z-30">
    <div className={`w-full overflow-x-auto hidden-scroll-bar z-30`}>
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
  );
};

export default Table;
