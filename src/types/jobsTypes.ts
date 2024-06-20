import { UserData } from "./userTypes";
// recibir desde el back

export interface JobsFindData {
  publicationsFind: JobsData[],
  count: number;
}


export interface JobsData {
  id: string;
  title: string;
  location: string;
  description: string;
  imgUrl: string;
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
  paymentPlan?: string
}

export interface JobsHistory {
  title: string;
  company: string;
  testimonial: string;
  startDate: string;
  endDate: string;
}
