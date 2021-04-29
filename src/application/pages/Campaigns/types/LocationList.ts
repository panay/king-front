import { IKeyValue } from "infrastructure/types";

interface ILocationListRequest {
  company_id?: string;
  page_number?: number;
  row_count?: number;
  name?: string;
}

interface ILocationListResponse {
  data: IKeyValue[];
  rowCount: number;
}

export type { ILocationListRequest, ILocationListResponse };
