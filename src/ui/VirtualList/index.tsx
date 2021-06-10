import React, { CSSProperties, useCallback, useEffect, useRef } from "react";
import {
  ICheckbox,
  IKeyValue,
  IPagination,
  IRadio,
} from "infrastructure/types";
import InfiniteLoader from "react-window-infinite-loader";
import { useStore } from "effector-react";
import { $paging, setPaging } from "infrastructure/models/paging";
import { FixedSizeList } from "react-window";
import CheckboxItem from "./components/CheckboxItem";
import RadioItem from "./components/RadioItem";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import SearchInput from "ui/SearchInput";
import AutoSizer from "react-virtualized-auto-sizer";

type Props = {
  loadNextPage: (
    startIndex: number,
    stopIndex: number,
    page: number
  ) => Promise<any> | null;
  items: IKeyValue[];
  type: string;
  rowCount: number;
  onChangeModel: (value: IKeyValue) => unknown;
  searchInside?: boolean;
  selectedValues?: IKeyValue[];
  onSearch?: (value: string) => void;
  reload?: boolean;
};

function VirtualList(props: Props) {
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
        hasNextPage: page === 1 ? true : props.items.length < props.rowCount,
      });

      if (loadingPage.hasNextPage && loadingPage.isNextPageLoading) {
        return props.loadNextPage(startIndex, stopIndex, page);
      }

      return null;
    },
    [props.items.length, props.loadNextPage, paging.perPage, props.rowCount]
  );

  const itemCount = paging?.hasNextPage
    ? props.items.length + 1
    : props.items.length;

  const loadMoreItems = paging?.isNextPageLoading
    ? async (startIndex: number, stopIndex: number) => {}
    : loadMore;

  const isItemLoaded = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) =>
      !!props.items[index],
    [props.items]
  );

  const handleSearch = (value: string) => {
    if (props.onSearch) {
      props.onSearch(value);
    }
  };

  // Render an item or a loading indicator.
  const Item = ({ index, style }: { index: number; style: any }) => {
    if (!isItemLoaded({ index, style })) {
      return (
        <div style={style}>
          <IcLoader className="w-10 h-10 my-5 text-primary" />
        </div>
      );
    }

    switch (props.type) {
      case "checkbox": {
        const item: ICheckbox = {
          id: props.items[index].id,
          name: props.items[index].id,
          value: props.items[index].name,
        };
        return (
          <div style={style}>
            <CheckboxItem
              key={index}
              item={item}
              selected={
                props.selectedValues?.find((s) => s.id === item.id) || undefined
              }
              onChangeModel={props.onChangeModel}
            />
          </div>
        );
      }
      case "radio": {
        const item: IRadio = {
          name: props.items[index].id,
          value: props.items[index].name,
        };
        return (
          <RadioItem
            key={index}
            item={item}
            selected={
              props.selectedValues?.find((s) => s.id === item.value) ||
              undefined
            }
            onChangeModel={props.onChangeModel}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };

  useEffect(() => {
    if (props.reload) {
      if (listRef.current) {
        listRef.current?.resetloadMoreItemsCache(true);
      }
      hasMountedRef.current = true;
    }
  }, [props.reload]);

  return (
    <div className="font-normal">
      {props.searchInside ? (
        <SearchInput
          className="bg-input-grey px-2.5"
          onSearch={handleSearch}
          noSearchIcon={true}
          placeholder="Поиск по названию"
        />
      ) : (
        <></>
      )}
      <div
        className={props.searchInside ? 'border-t border-t-border-grey mt-4' : ''}
        style={{
          height: "240px",
        }}
      >
        <AutoSizer className={props.searchInside ? 'mt-4' : ''} defaultHeight={240} defaultWidth={240}>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={(index: number) => {
                return !paging.hasNextPage || !!props.items[index];
              }}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
              ref={listRef}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height}
                  itemCount={itemCount}
                  itemSize={50}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                  className="overflow-auto scrollbar-thin scrollbar-thumb-border-grey scrollbar-track-input-grey font-semibold"
                >
                  {Item}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default VirtualList;
