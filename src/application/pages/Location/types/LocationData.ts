import { IKeyValue } from "infrastructure/types";

interface ILocationData {
  name: string;
  id?: string;
  company_id?: string;
}

interface ILocationResponse {
  data: IKeyValue[];
  rowCount: number;
}

interface ILocationRequest {
  company_id?: string;
  page_number?: number;
  row_count?: number;
  name?: string;
}

export type { ILocationData, ILocationResponse, ILocationRequest };
