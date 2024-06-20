import { UserData } from "./userTypes";

export interface NotificationData {
  id: string;
  title: string;
  type: string;
  date: string;
  timelapse: string;
  user: UserData;
}
