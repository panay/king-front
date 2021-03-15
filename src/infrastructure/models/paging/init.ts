import { $paging, setPaging } from ".";
import { IPagination } from "../../types";

const pagingReducer = (state: IPagination, payload: IPagination) => {
  return {
    ...state,
    ...payload,
  };
};

$paging.on(setPaging, pagingReducer);
