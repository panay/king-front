import { createDomain, restore } from "effector";
import { ICampaignData } from "../../types/CampaignsData";

const campaignDomain = createDomain("CampaignForm");

export const changeForm = campaignDomain.event<boolean>();
export const catchError = campaignDomain.event<string | null>();
export const resetCampaignData = campaignDomain.event<void>();
export const resetErrorForm = campaignDomain.event<void>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const getCampaignDataFx = campaignDomain.effect<
  ICampaignData | null,
  string | null
>();
export const createCampaignFx = campaignDomain.effect<ICampaignData, boolean>();
export const updateCampaignFx = campaignDomain.effect<ICampaignData, boolean>();
export const deleteCampaignFx = campaignDomain.effect<string, boolean>();

export const $campaignError = campaignDomain.store<string | null>(null);
export const $campaignPending = campaignDomain.store<boolean>(false);
export const $campaignData = campaignDomain.store<ICampaignData | null>(null);
