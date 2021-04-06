import { createDomain, restore } from "effector";
import { ILocationData } from "../../types/LocationData";
import { IKeyValue } from "infrastructure/types";

const locationDomain = createDomain("LocationForm");

export const changeForm = locationDomain.event<boolean>();
export const catchError = locationDomain.event<string | null>();
export const resetLocationData = locationDomain.event<void>();
export const resetErrorForm = locationDomain.event<void>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const getLocationDataFx = locationDomain.effect<
  IKeyValue | null,
  IKeyValue | null
>();
export const createLocationFx = locationDomain.effect<ILocationData, boolean>();
export const updateLocationFx = locationDomain.effect<ILocationData, boolean>();
export const deleteLocationFx = locationDomain.effect<string, boolean>();

export const $locationError = locationDomain.store<string | null>(null);
export const $locationPending = locationDomain.store<boolean>(false);
export const $locationData = locationDomain.store<IKeyValue | null>(null);
