import React, { CSSProperties, ReactElement, useCallback } from "react";
import { Column, useTable } from "react-table";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { $paging, setPaging } from "infrastructure/models/paging";
import { useStore } from "effector-react";
import { IPagination } from "infrastructure/types";

type Props = {
  items: any[];
  rowCount: number;
  columns: Array<Column<Record<string, unknown>>>;
  rowClicked?: (value: unknown) => void;
  loadNextPage?: (
    startIndex: number,
    stopIndex: number,
    page: number
  ) => Promise<any> | null;
  noDataComponent?: ReactElement;
};

function Table({
  items,
  rowCount,
  columns,
  rowClicked,
  loadNextPage = async (
    startIndex: number,
    stopIndex: number,
    page: number
  ) => {},
  noDataComponent,
}: Props) {
  const paging = useStore<IPagination>($paging);

  const loadMore = useCallback(
    (startIndex: number, stopIndex: number) => {
      const page = paging.perPage
        ? Math.ceil(stopIndex / paging.perPage) + 1
        : 1;

      const loadingPage = setPaging({
        isNextPageLoading: true,
        hasNextPage: page === 1 ? true : items.length < rowCount,
      });

      if (loadingPage.hasNextPage && loadingPage.isNextPageLoading) {
        return loadNextPage(startIndex, stopIndex, page);
      }

      return null;
    },
    [items.length, loadNextPage, paging.perPage, rowCount]
  );

  const itemCount = paging?.hasNextPage ? items.length + 1 : items.length;

  const loadMoreItems = paging?.isNextPageLoading
    ? async (startIndex: number, stopIndex: number) => {}
    : loadMore;

  const isItemLoaded = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) =>
      !!items[index],
    [items]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Record<string, unknown>>({
    data: items,
    columns,
  });

  const noDataRender = () => {
    if (items.length === 0) {
      const className =
        "text-center flex justify-center items-center m-auto h-full w-full";
      if (noDataComponent) {
        return <div className={className}>{noDataComponent}</div>;
      }
      return (
        <div className={className}>
          <h2>Данных нет</h2>
        </div>
      );
    }
  };

  const RenderRow = useCallback(
    ({ index, style }) => {
      if (
        !isItemLoaded({
          index: index,
          style: style,
        })
      ) {
        return <div className="h-10">Загрузка...</div>;
      } else {
        const onClickRowHandler = (value: unknown) => {
          if (rowClicked) {
            rowClicked(value);
          }
        };

        const row = rows[index];
        prepareRow(row);

        return (
          <div
            {...row.getRowProps({
              style,
            })}
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
          </div>
        );
      }
    },
    [isItemLoaded, rows, prepareRow, rowClicked]
  );

  return (
    <AutoSizer defaultHeight={600} defaultWidth={600}>
      {({ height, width }) => (
        <section {...getTableProps()} className="table-fixed w-full">
          {headerGroups.map((headerGroup) => (
            <header
              {...headerGroup.getHeaderGroupProps()}
              className="flex -mx-2.5"
              style={{
                width: width + "px"
              }}
            >
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

          <div {...getTableBodyProps()}>
            <InfiniteLoader
              isItemLoaded={(index: number) => !!items[index]}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height}
                  itemCount={itemCount}
                  itemSize={50}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                >
                  {RenderRow}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          </div>
        </section>
      )}
    </AutoSizer>
  );
}

export default Table;
