import { createDomain, restore } from "effector";
import { ICampaignData } from "../../types/CampaignsData";
import { IKeyValue } from "infrastructure/types";

const campaignDomain = createDomain("CampaignForm");

export const changeForm = campaignDomain.event<boolean>();
export const catchError = campaignDomain.event<string | null>();
export const resetCampaignData = campaignDomain.event<void>();
export const resetErrorForm = campaignDomain.event<void>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const getCampaignDataFx = campaignDomain.effect<
  IKeyValue | null,
  IKeyValue | null
>();
export const createCampaignFx = campaignDomain.effect<ICampaignData, boolean>();
export const updateCampaignFx = campaignDomain.effect<ICampaignData, boolean>();
export const deleteCampaignFx = campaignDomain.effect<string, boolean>();

export const $campaignError = campaignDomain.store<string | null>(null);
export const $campaignPending = campaignDomain.store<boolean>(false);
export const $campaignData = campaignDomain.store<IKeyValue | null>(null);
