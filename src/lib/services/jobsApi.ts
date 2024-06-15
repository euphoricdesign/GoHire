import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobsData, JobsFindData, JobsPostData } from "@/types/jobsTypes";
import type { RootState } from '@/lib/store';
import { Category, CategoryResponse } from "@/types/categoryType";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.userDetail?.token;
      if (token) {
        headers.set("authorization", `${token}`);
        console.log('Token added to headers:', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobsData[], null>({
      query: () => "publication",
    }),
    listJobs: builder.query<JobsFindData, { page: number; category?: string; city?: string }>({
      query: ({ page = 1, category, city }) => {
        let url = `publication?page=${page}`;
        if (category) {
          url += `&category=${category}`;
        }
        if (city) {
          url += `&city=${city}`;
        }
        return { url };
      },
    }),
    getJobById: builder.query<JobsData[], { id: string }>({
      query: ({ id }) => `publication/${id}`,
    }),
    postJob: builder.mutation<JobsData, FormData>({
      query: (newJob) => ({
        url: "publication",
        method: "POST",
        body: newJob,
      }),
    }),
    updateJob: builder.mutation<JobsData, { id: string; updatedJob: Partial<JobsPostData> }>({
      query: ({ id, updatedJob }) => ({
        url: `publication/${id}`,
        method: "PATCH",
        body: updatedJob,
      }),
    }),
    getCategory: builder.query<CategoryResponse, null>({
      query: () => `publication/category`,
    }),
    getAllPublication: builder.query<JobsFindData, null>({
      query: () => `publication/allPublications`,
    }),
   
  }),
});

export const { 
  useGetAllJobsQuery, 
  useGetJobByIdQuery, 
  usePostJobMutation, 
  useListJobsQuery, 
  useGetCategoryQuery, 
  useGetAllPublicationQuery, 
  useUpdateJobMutation 
} = jobsApi;
