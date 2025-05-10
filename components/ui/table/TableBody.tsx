import { TableBodyProps } from "app/lib/types"

const TableBody = ({ children, className }: TableBodyProps) => { 
    return (
        <>
        <tbody className={className}>{children}</tbody>
        </>
    )
}

export default TableBody