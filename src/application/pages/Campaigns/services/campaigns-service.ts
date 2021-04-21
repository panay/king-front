import { globalService } from "infrastructure/config/axios.config";
import { ICampaignsRequest } from "../types/CampaignsData";

const getCampaignList = ({
  company_id,
  page_number = 1,
  row_count = 50,
  start_date,
  end_date,
  location_id,
  platforms,
  name,
}: ICampaignsRequest) => {
  const params = `${name ? "&name=" + name : ""}${
    start_date ? "&start_date=" + start_date : ""
  }${end_date ? "&end_date=" + end_date : ""}${
    location_id ? "&location_id=" + location_id : ""
  }${platforms ? "&platforms=" + platforms : ""}`;

  return globalService.get(
    `${process.env.REACT_APP_CAMPAIGN_ENDPOINT}/list?company_id=${company_id}&page_number=${page_number}&row_count=${row_count}${params}`
  );
};
const createCampaign = (body: unknown) =>
  globalService.post(
    `${process.env.REACT_APP_CAMPAIGN_ENDPOINT}`,
    JSON.stringify(body)
  );
const updateCampaign = (body: unknown) =>
  globalService.put(
    `${process.env.REACT_APP_CAMPAIGN_ENDPOINT}`,
    JSON.stringify(body)
  );
const deleteCampaign = (id: string) =>
  globalService.delete(`${process.env.REACT_APP_CAMPAIGN_ENDPOINT}`, {
    data: { id },
  });
const suspendCampaign = (campaign_id: string) =>
  globalService.put(
    `${process.env.REACT_APP_CAMPAIGN_ENDPOINT}/${campaign_id}/suspend`
  );
const activateCampaign = (campaign_id: string) =>
  globalService.put(
    `${process.env.REACT_APP_CAMPAIGN_ENDPOINT}/${campaign_id}/activate`
  );

export {
  getCampaignList,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  suspendCampaign,
  activateCampaign,
};
