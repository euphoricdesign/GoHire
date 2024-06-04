export interface IJob {
  title: string;
  company: string;
  testimonial: string;
  startDate: string;
  endDate: string;
}

export interface IUser {
  id: number;
  profileImg: string;
  name: string;
  lastName: string;
  country: string;
  city: string;
  description: string;
  professions: string[];
  educations: string[];
  jobs: IJob[];
}

export interface IJobPost {
  id: number;
  title: string;
  description: string;
  professions: string[];
  userId: number;
  readingTime: string;
}
