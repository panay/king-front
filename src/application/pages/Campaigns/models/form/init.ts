import {
  $formIsChanged,
  $campaignData,
  $campaignError,
  $campaignPending,
  catchError,
  changeForm,
  createCampaignFx,
  deleteCampaignFx,
  getCampaignDataFx,
  resetErrorForm,
  resetCampaignData,
  updateCampaignFx,
} from "./";
import "infrastructure/models/paging/init";
import {
  createCampaign,
  deleteCampaign,
  updateCampaign,
} from "../../services/campaigns-service";
import { ICampaignData } from "../../types/CampaignsData";
import { IKeyValue } from "infrastructure/types";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: string | null, payload: string | null) => payload;
const campaignDataReducer = (
  state: IKeyValue | null,
  payload: IKeyValue | null
) => (payload ? { ...payload } : null);

const deleteCurrentCampaign = async (id: string) => {
  let response = null;
  try {
    response = await deleteCampaign(id);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
  }

  return response?.status === 200;
};

const createNewCampaign = async (campaign: ICampaignData) => {
  let response = null;
  try {
    response = await createCampaign(campaign);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
  }

  return response?.status === 200;
};

const updateCurrentCampaign = async (campaign: ICampaignData) => {
  let response = null;
  try {
    response = await updateCampaign(campaign);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
  }

  return response?.status === 200;
};

resetCampaignData.watch(() => getCampaignDataFx(null));
resetErrorForm.watch(() => catchError(null));

$campaignError.on(catchError, failReducer).reset(changeForm);
$campaignPending
  .on(createCampaignFx.pending, pendingReducer)
  .on(updateCampaignFx.pending, pendingReducer)
  .on(deleteCampaignFx.pending, pendingReducer)
  .reset(changeForm)
  .reset($campaignError);

$formIsChanged
  .on(createCampaignFx, () => false)
  .on(updateCampaignFx, () => false)
  .on(deleteCampaignFx, () => false);

$campaignData.on(getCampaignDataFx, campaignDataReducer);

createCampaignFx.use(createNewCampaign);
updateCampaignFx.use(updateCurrentCampaign);
deleteCampaignFx.use(deleteCurrentCampaign);
