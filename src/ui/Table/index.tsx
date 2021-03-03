import React from "react";
import { Column, useTable } from "react-table";

type Props = {
  rowData: Array<Record<string, unknown>>;
  columns: Array<Column<Record<string, unknown>>>;
};

function Table({ rowData, columns }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Record<string, unknown>>({
    data: rowData,
    columns: columns,
  });

  return (
    <section {...getTableProps()} className="table-fixed w-full">
      {headerGroups.map((headerGroup) => (
        <header {...headerGroup.getHeaderGroupProps()} className="flex -mx-2.5">
          {headerGroup.headers.map((column) => (
            <div
              {...column.getHeaderProps()}
              className="flex-1 text-icon-grey text-xs px-2.5 text-left font-normal"
            >
              {column.render("Header")}
            </div>
          ))}
        </header>
      ))}

      <div {...getTableBodyProps()} className="">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div
              {...row.getRowProps()}
              className="relative flex -mx-2.5 mt-2.5 cursor-pointer rounded-xl hover:bg-lighten-blue"
            >
              {row.cells.map((cell) => {
                return (
                  <div
                    {...cell.getCellProps()}
                    className="flex-1 px-2.5 py-4"
                  >
                    {cell.render("Cell")}
                  </div>
                );
              })}
              <span className="absolute left-0 -bottom-1.5 w-full border-b border-border-grey" />
            </div>
          );
        })}
      </div>
    </section>

    // <table {...getTableProps()} className="w-full">
    //   <thead>
    //     {headerGroups.map((headerGroup) => (
    //       <tr {...headerGroup.getHeaderGroupProps()} className="-mx-2.5">
    //         {headerGroup.headers.map((column) => (
    //           <th
    //             {...column.getHeaderProps()}
    //             className="text-icon-grey text-xs px-2.5 text-left font-normal"
    //           >
    //             {column.render("Header")}
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()}>
    //     {rows.map((row) => {
    //       prepareRow(row);
    //       return (
    //         <tr
    //           {...row.getRowProps()}
    //           className="-mx-2.5 hover:bg-lighten-blue cursor-pointer border-b border-border-grey"
    //         >
    //           {row.cells.map((cell) => {
    //             return (
    //               <td
    //                 {...cell.getCellProps()}
    //                 className="px-2.5 py-4 first:rounded-l-xl last:rounded-r-xl"
    //               >
    //                 {cell.render("Cell")}
    //               </td>
    //             );
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
  );
}

export default Table;
