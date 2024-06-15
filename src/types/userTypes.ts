import { UserEducation } from "./educationsTypes";
import { UserExperiences } from "./experiencesTypes";
import { JobsData } from "./jobsTypes";
import { Professions } from "./professionsTypes";

export interface userPostData {
  name: string;
  nickname: string;
  email: string;
  email_verified: boolean;
  picture: string;
}

export interface UsersData {
  usersFind: UserData[];
  count: number;
}

export interface UserData {
  id: string;
  name: string;
  lastName: string;
  dni: string;
  country: string;
  city: string;
  birthdate: Date;
  bio: string;
  availableToWork: boolean;
  professionalRate: string;
  newMember: boolean;
  profileImg?: string;
  profesions: Professions[];
  educations: UserEducation[];
  experiences: UserExperiences[];
  description: string;
  token?: string;
  email?: string;
}
