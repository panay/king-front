import { IPagination } from "../../types";
import { createDomain } from "effector";

const commonTableDomain = createDomain("CommonTable");

export const setPaging = commonTableDomain.event<IPagination>();

export const $paging = commonTableDomain.store<IPagination>({
  perPage: 50,
  hasNextPage: true,
  isNextPageLoading: false,
});
