import { globalService } from "infrastructure/config/axios.config";
import { ILocationListRequest } from "../types/LocationList";

const getLocationList = ({
  company_id,
  page_number = 1,
  row_count = 50,
  name,
}: ILocationListRequest) =>
  globalService.get(
    `${
      process.env.REACT_APP_LOCATION_ENDPOINT
    }/list?company_id=${company_id}&page_number=${page_number}&row_count=${row_count}&name=${
      name || ""
    }`
  );

export { getLocationList };
