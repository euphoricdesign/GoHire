import { JobsData } from "./jobsTypes";
import { Professions } from "./professionsTypes";


export interface userPostData {
    name: string;
    given_name: string;
    email: string;
    email_verified: boolean;
    picture: string;
    sub: string;
    family_name:string;
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
    educations: string[];
    jobs: JobsData[];
    description:string;
  }
  