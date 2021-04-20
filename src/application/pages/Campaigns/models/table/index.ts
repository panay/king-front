import { createDomain, restore } from "effector";
import {
  ICampaignData,
  ICampaignsRequest,
  ICampaignsResponse,
} from "../../types/CampaignsData";

const campaignsTableDomain = createDomain("CampaignsTable");

export const getCampaignsFx = campaignsTableDomain.effect<
  ICampaignsRequest,
  ICampaignsResponse
>();

export const updateCampaignsFx = campaignsTableDomain.effect<
  ICampaignsRequest,
  ICampaignsResponse
>();

export const changeCampaigns = campaignsTableDomain.event<boolean>();
export const getCampaignsList = campaignsTableDomain.event<ICampaignsRequest>();
export const updateCampaignListSuccess = campaignsTableDomain.event<void>();

export const $rowData = campaignsTableDomain.store<ICampaignData[]>([]);
export const $rowCount = campaignsTableDomain.store<number>(0);
export const $campaignsIsChanged = restore<boolean>(changeCampaigns, false);
