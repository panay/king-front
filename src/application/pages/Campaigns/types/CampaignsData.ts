interface ICampaignData {
  geofence_count: number;
  in_action: {
    subtitle: string;
    text: string;
    title: string;
  };
  is_suspend: boolean;
  location: {
    id: string;
    name: string;
  };
  max_notify_count_per_day: number;
  name: string;
  out_action: {
    subtitle: string;
    text: string;
    title: string;
  };
  period: {
    end_date: string;
    start_date: string;
  };
  platforms: string;
  state: string;
  id?: string;
  company_id?: string;
}

interface ICampaignsResponse {
  data: ICampaignData[];
  rowCount: number;
}

interface ICampaignsRequest {
  company_id?: string;
  page_number?: number;
  row_count?: number;
  start_date?: string;
  end_date?: string;
  location_id?: string;
  platforms?: string;
  name?: string;
  states?: string[];
}

interface IPausedCampaign {
  campaign_id: string;
  paused: boolean;
}

interface IPausedCampaignResponse {
  campaign_id: string;
  state: string;
}

export type {
  ICampaignData,
  ICampaignsResponse,
  ICampaignsRequest,
  IPausedCampaign,
  IPausedCampaignResponse,
};
