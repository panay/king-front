import { createDomain, restore } from "effector";
import {
  ICampaignData,
  ICampaignsRequest,
  ICampaignsResponse,
  IPausedCampaign,
  IPausedCampaignResponse,
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

export const updatePauseFx = campaignsTableDomain.effect<
  IPausedCampaign,
  IPausedCampaignResponse | null
>();

export const changeCampaigns = campaignsTableDomain.event<boolean>();
export const getCampaignsList = campaignsTableDomain.event<ICampaignsRequest>();
export const updateCampaignListSuccess = campaignsTableDomain.event<void>();
export const togglePause = campaignsTableDomain.event<IPausedCampaign>();

export const $rowData = campaignsTableDomain.store<ICampaignData[]>([]);
export const $rowCount = campaignsTableDomain.store<number>(0);
export const $campaignsIsChanged = restore<boolean>(changeCampaigns, false);
