import { UserData } from "./userTypes";
// recibir desde el back
export interface JobsData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  timelapse: string;
  category: string;
  user: UserData;
}

export interface JobsPostData {
  title: string;
  description: string;
  category: string;
  location: string;
  remoteWork: boolean;
  file?: File; // Asegúrate de que image sea opcional si no siempre se envía.
}

export interface JobsHistory {
  title: string;
  company: string;
  testimonial: string;
  startDate: string;
  endDate: string;
}
