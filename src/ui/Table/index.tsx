import React from "react";
import { Column, useTable } from "react-table";

type Props = {
  rowData: Array<Record<string, unknown>>;
  columns: Array<Column<Record<string, unknown>>>;
  rowClicked?: (value: unknown) => void;
};

function Table({ rowData, columns, rowClicked }: Props) {
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

  const onClickRowHandler = (value: unknown) => {
    if (rowClicked) {
      rowClicked(value);
    }
  };

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
              onClick={() => onClickRowHandler(row.original)}
            >
              {row.cells.map((cell) => {
                return (
                  <div {...cell.getCellProps()} className="flex-1 px-2.5 py-4">
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
  );
}

export default Table;
