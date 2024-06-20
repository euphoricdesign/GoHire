import { UserData } from "./userTypes";

export interface PublicationData {
  id: string;
  title: string;
  location: string;
  remoteWork: boolean;
  description: string;
  category: string;
  imgUrl: string;
  date: string;
  time: string;
  timelapse: string;
  premium: boolean;
  endDate: string;
  usersList: UserData[];
}
