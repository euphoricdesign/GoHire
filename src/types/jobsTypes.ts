// recibir desde el back
export interface JobsData {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  date: string;
  time: string;
  timelapse: string;
  category: string;
}
export interface JobsPostData {
  title: string;
  description: string;
  imgUrl: string;
  category: string;
}
