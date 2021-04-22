import React, {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Column, useSortBy, useTable } from "react-table";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { $paging, setPaging } from "infrastructure/models/paging";
import { useStore } from "effector-react";
import { IPagination } from "infrastructure/types";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcSortColumn } from "infrastructure/assets/images/svgs/ic-sort-colum.svg";

type Props = {
  items: any[];
  rowCount: number;
  columns: Array<Column<any>>;
  rowClicked?: (value: unknown) => void;
  loadNextPage?: (
    startIndex: number,
    stopIndex: number,
    page: number
  ) => Promise<any> | null;
  onSort?: (field: any) => void;
  noDataComponent?: ReactElement;
  reload?: boolean;
};

function SimpleTable({
  items,
  rowCount,
  columns,
  rowClicked,
  loadNextPage = async (
    startIndex: number,
    stopIndex: number,
    page: number
  ) => {},
  onSort,
  noDataComponent,
  reload,
}: Props) {
  const paging = useStore<IPagination>($paging);
  const listRef = useRef<InfiniteLoader>(null);
  const hasMountedRef = useRef<boolean>(false);

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
    state: { sortBy },
  } = useTable(
    {
      data: items,
      columns,
      manualSortBy: true,
      autoResetSortBy: false,
      disableMultiSort: true,
      disableSortRemove: true,
    } as any,
    useSortBy
  ) as any;

  const noDataRender = useCallback(() => {
    const className =
      "absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 text-center";
    if (noDataComponent) {
      return <div className={className}>{noDataComponent}</div>;
    }
    return (
      <div className={className}>
        <h2>Данных нет</h2>
      </div>
    );
  }, [noDataComponent]);

  const RenderRow = useCallback(
    ({ index, style }) => {
      if (
        !isItemLoaded({
          index: index,
          style: style,
        })
      ) {
        if (paging.hasNextPage) {
          return <IcLoader className="w-10 h-10 my-5 text-primary" />;
        } else {
          return noDataRender();
        }
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
            className="relative flex mt-2.5 cursor-pointer rounded-xl hover:bg-lighten-blue"
            onClick={() => onClickRowHandler(row.original)}
          >
            {row.cells.map((cell: any) => {
              return (
                <div
                  {...cell.getCellProps()}
                  style={{
                    maxWidth: cell.column.maxWidth
                      ? cell.column.maxWidth + "px"
                      : "100%",
                  }}
                  className="px-2.5 py-4 w-full"
                >
                  {cell.render("Cell")}
                </div>
              );
            })}
          </div>
        );
      }
    },
    [
      isItemLoaded,
      paging.hasNextPage,
      noDataRender,
      rows,
      prepareRow,
      rowClicked,
    ]
  );

  useEffect(() => {
    if (reload) {
      if (listRef.current && hasMountedRef.current) {
        listRef.current?.resetloadMoreItemsCache(true);
      }
      hasMountedRef.current = true;
    }

    if (onSort && sortBy && sortBy[0]) {
      onSort(sortBy[0]);
    }
  }, [onSort, reload, sortBy]);

  return (
    <AutoSizer defaultHeight={600} defaultWidth={600}>
      {({ height, width }) => (
        <section {...getTableProps()} className="table-fixed w-full">
          {headerGroups.map((headerGroup: any) => (
            <header
              {...headerGroup.getHeaderGroupProps()}
              className="flex"
              style={{
                width: width + "px",
              }}
            >
              {headerGroup.headers.map((column: any) => (
                <div
                  {...column.getHeaderProps(onSort ? column.getSortByToggleProps() : undefined)}
                  className="flex items-center text-icon-grey text-xs px-2.5 text-left font-normal w-full"
                  style={{
                    maxWidth: column.maxWidth ? column.maxWidth + "px" : "100%",
                  }}
                >
                  {column.render("Header")}
                  <span className="block">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <IcSortColumn />
                        : <IcSortColumn className="transform rotate-180" />
                      : ""}
                  </span>
                </div>
              ))}
            </header>
          ))}

          <div {...getTableBodyProps()}>
            <InfiniteLoader
              isItemLoaded={(index: number) => {
                return !paging.hasNextPage || !!items[index];
              }}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
              ref={listRef}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height - 20}
                  itemCount={itemCount}
                  itemSize={50}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                  className="overflow-auto scrollbar-thin scrollbar-thumb-border-grey scrollbar-track-input-grey"
                >
                  {RenderRow}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          </div>
          {!paging.hasNextPage && !items.length ? noDataRender() : <></>}
        </section>
      )}
    </AutoSizer>
  );
}

export default SimpleTable;
