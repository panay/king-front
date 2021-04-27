import { createDomain, restore } from "effector";

const filterFormDomain = createDomain("FilterForm");

export const $field = filterFormDomain.store<object>({});
export const $model = filterFormDomain.store<object>({});
