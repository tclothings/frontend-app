import { TableHeaderProps } from "app/lib/types"
import TableIcon from "./TableIcon";

const TableHeader = ({ headers }: TableHeaderProps) => {
  

    return (
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th
              key={idx}
              className="text-start py-3 px-6 text-xs text-grey-500 font-medium bg-grey-50 bg-white dark:bg-[var(--background)] whitespace-nowrap"
            >
              <div className="flex gap-1 items-center">
                <span>{header.label}</span> <TableIcon iconKey={header.icon!} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
}

export default TableHeader