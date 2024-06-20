import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobsData, JobsFindData, JobsPostData } from "@/types/jobsTypes";
import type { RootState } from "@/lib/store";
import { Category, CategoryResponse } from "@/types/categoryType";

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === "postJob" || "listJobs") {
        const token = (getState() as RootState).user.userDetail?.token;
        if (token) {
          headers.set("authorization", `${token}`);
          console.log("Token added to headers:", token);
          localStorage.setItem("token", token);
        }
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
        return {
          url,
        };
      },
    }),
    getJobById: builder.query<any, { id: string }>({
      query: ({ id }) => `publication/${id}`,
    }),
    postJob: builder.mutation<JobsData, FormData>({
      query: (newJob) => ({
        url: "publication",
        method: "POST",
        body: newJob,
      }),
    }),
    postListMe: builder.mutation<JobsData, { id: string }>({
      query: ({ id }) => {
        const token = localStorage.getItem("token");
        return {
          url: `publication/listMe/${id}`,
          method: "POST",
          headers: token ? { authorization: `${token}` } : {},
        };
      },
    }),

    postInvitation: builder.mutation<
      JobsData,
      {
        id: string;
        jobDescription: string;
        payPerHour: number;
        issue: string;
        location: string;
        startDate: string;
      }
    >({
      query: ({ id, jobDescription, payPerHour, issue, location, startDate }) => {
        const token = localStorage.getItem("token");
        return {
          url: `invitation/${id}`,
          method: "POST",
          headers: token ? { authorization: `${token}` } : {},
          body: {
            jobDescription,
            payPerHour,
            issue,
            location,
            startDate,
          },
        };
      },
    }),

    updateJob: builder.mutation<JobsData, { id: string; updatedJob: Partial<JobsPostData> }>({
      query: ({ id, updatedJob }) => ({
        url: `publication/${id}`,
        method: "PATCH",
        body: updatedJob,
      }),
    }),
    deleteJob: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `publication/${id}`,
        method: "DELETE",
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
  useUpdateJobMutation,
  useDeleteJobMutation,
  usePostListMeMutation,
  usePostInvitationMutation,
} = jobsApi;
