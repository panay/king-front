import { createDomain, restore } from "effector";

const filterFormDomain = createDomain("FilterForm");

export const setModel = filterFormDomain.event<{ [key: string]: unknown }>();
export const $model = restore<{ [key: string]: unknown }>(setModel, {});

export const changeModel = filterFormDomain.event<boolean>();
export const $modelIsChanged = restore<boolean>(changeModel, false);
