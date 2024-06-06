import { UserData } from "./userTypes";




export interface JobsData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  timelapse: string;
  category: string;
  user: UserData
}
export interface JobsPostData {
  title: string;
  description: string;
  image: File | null;
  category: string;
}

