import { UserData } from "./userTypes";

export interface invitationsData {
  id: string;
  jobDescription: string;
  payPerHour: number;
  issue: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  jobState: string;
  employee: UserData;
}
