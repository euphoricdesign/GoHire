export interface IJob {
  title: string;
  company: string;
  testimonial: string;
  startDate: string;
  endDate: string;
}

// export interface IUser {
//   id: number;
//   profileImg: string;
//   name: string;
//   lastName: string;
//   country: string;
//   city: string;
//   description: string;
//   profesions: { category: string }[];
//   educations: string[];
//   jobs: IJob[];
// }

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  profileImg: string;
  country: string;
  city: string;
  description: string;
  profesions: { category: string }[];
}

export interface ListResponse<T> {
  data: T[];
  page: number;
  total: number;
  total_pages: number;
}

export interface IProfessions {
  id: string;
  category: string;
}

export interface IJobPost {
  id: number;
  title: string;
  description: string;
  professions: string[];
  userId: number;
  readingTime: string;
}
