import { IKeyValue } from "infrastructure/types";

interface IUserData {
  id: string;
  is_active: boolean;
  login: string;
  name: string;
  role: IKeyValue;
}

interface IUsersResponse {
  data: IUserData[];
  rowCount: number;
}

interface IUsersRequest {
  company_id?: string;
  page_number?: number;
  row_count?: number;
  name?: string;
}

export type { IUserData, IUsersResponse, IUsersRequest };
