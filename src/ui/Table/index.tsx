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
  }  = useTable<Record<string, unknown>>({
    data: rowData,
    columns: columns,
  });

  return (
      <table {...getTableProps()} className="w-full h-full border-separate">
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="-mx-2.5">
              {headerGroup.headers.map(column => (
                  <th
                      {...column.getHeaderProps()}
                      className="text-icon-grey text-xs px-2.5 text-left font-normal"
                  >
                    {column.render('Header')}
                  </th>
              ))}
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
              <tr {...row.getRowProps()} className="-mx-2.5 hover:bg-lighten-blue cursor-pointer border-b border-border-grey">
                {row.cells.map(cell => {
                  return (
                      <td
                          {...cell.getCellProps()}
                          className="px-2.5 py-4 my-2 mx-0 first:rounded-l-xl last:rounded-r-xl"
                      >
                        {cell.render('Cell')}
                      </td>
                  )
                })}
              </tr>
          )
        })}
        </tbody>
      </table>
  )
}

export default Table;
