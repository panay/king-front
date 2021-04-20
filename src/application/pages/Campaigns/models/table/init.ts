import {
  $rowCount,
  $rowData,
  updateCampaignListSuccess,
  getCampaignsFx,
  getCampaignsList,
  updateCampaignsFx,
} from "./";
import { setPaging } from "infrastructure/models/paging";
import {
  ICampaignData,
  ICampaignsRequest,
  ICampaignsResponse,
} from "../../types/CampaignsData";
import { getCampaignList } from "../../services/campaigns-service";

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

getCampaignsList.watch((body) => getCampaignsFx(body));
updateCampaignListSuccess.watch(() => {
  setPaging({
    isNextPageLoading: false,
    hasNextPage: true,
  });
});

$rowData
  .on(getCampaignsFx.doneData, campaignListReducer)
  .on(updateCampaignsFx.doneData, updateCampaignsReducer)
  .on(updateCampaignListSuccess, () => []);
$rowCount
  .on(getCampaignsFx.doneData, countReducer)
  .on(updateCampaignsFx.doneData, countReducer)
  .on(updateCampaignListSuccess, () => 0);

getCampaignsFx.use(getCampaigns);
updateCampaignsFx.use(getCampaigns);
