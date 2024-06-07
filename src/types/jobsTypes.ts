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
  user: UserData
}

export interface JobsPostData {
  title: string;
  description: string;
  category: string;
  location: string;
  remoteWork: boolean;
  file?: File; // Asegúrate de que image sea opcional si no siempre se envía.
}

export interface UserData{
id:string,
name:string,
lastName:string,
dni:string,
country:string,
city:string,
birthdate:Date,
bio:string,
availableToWork:boolean,
professionalRate:string,
newMember:boolean
}