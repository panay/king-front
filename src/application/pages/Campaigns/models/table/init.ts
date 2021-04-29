import {
  $rowCount,
  $rowData,
  getCampaignsFx,
  getCampaignsList,
  togglePause,
  updateCampaignListSuccess,
  updateCampaignsFx,
  updatePauseFx,
} from "./";
import { setPaging } from "infrastructure/models/paging";
import {
  ICampaignData,
  ICampaignsRequest,
  ICampaignsResponse,
  IPausedCampaign,
  IPausedCampaignResponse,
} from "../../types/CampaignsData";
import {
  activateCampaign,
  getCampaignList,
  suspendCampaign,
} from "../../services/campaigns-service";

const campaignListReducer = (
  state: ICampaignData[],
  payload: ICampaignsResponse
) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];
  const result = !rowData.length ? [] : state.concat(...rowData);

  setPaging({
    isNextPageLoading: false,
    hasNextPage: result.length < payload.rowCount,
  });

  return result;
};

const updateCampaignsReducer = (
  state: ICampaignData[],
  payload: ICampaignsResponse
) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];

  setPaging({
    isNextPageLoading: false,
    hasNextPage: rowData.length < payload.rowCount,
  });

  return rowData;
};

const updateCampaignState = (
  state: ICampaignData[],
  payload: IPausedCampaignResponse | null
) => {
  if (payload) {
    const rowData = state.slice();
    const campaignIndex = rowData.findIndex(
      (campaign) => campaign.id === payload.campaign_id
    );
    if (campaignIndex > -1) {
      const campaign = rowData.find(
        (campaign) => campaign.id === payload.campaign_id
      );

      rowData.splice(campaignIndex, 1, {
        ...campaign,
        state: payload.state,
      } as ICampaignData);
    }

    return rowData;
  }
};

const countReducer = (state: number, payload: ICampaignsResponse) => {
  return payload ? payload.rowCount : 0;
};

const getCampaigns = async (request: ICampaignsRequest) => {
  let response = null;
  try {
    response = await getCampaignList(request);
  } catch (err) {}

  return response?.data || [];
};

const updatePause = async (request: IPausedCampaign) => {
  let response = null;
  try {
    if (request.paused) {
      response = await suspendCampaign(request.campaign_id);
    } else {
      response = await activateCampaign(request.campaign_id);
    }
  } catch (err) {}

  return response?.status === 200
    ? {
        campaign_id: request.campaign_id,
        state: response?.data.state,
      }
    : null;
};

getCampaignsList.watch((body) => getCampaignsFx(body));
togglePause.watch((paused) => updatePauseFx(paused));
updateCampaignListSuccess.watch(() => {
  setPaging({
    isNextPageLoading: false,
    hasNextPage: true,
  });
});

$rowData
  .on(getCampaignsFx.doneData, campaignListReducer)
  .on(updateCampaignsFx.doneData, updateCampaignsReducer)
  .on(updateCampaignListSuccess, () => [])
  .on(updatePauseFx.doneData, updateCampaignState);
$rowCount
  .on(getCampaignsFx.doneData, countReducer)
  .on(updateCampaignsFx.doneData, countReducer)
  .on(updateCampaignListSuccess, () => 0);

getCampaignsFx.use(getCampaigns);
updateCampaignsFx.use(getCampaigns);
updatePauseFx.use(updatePause);
