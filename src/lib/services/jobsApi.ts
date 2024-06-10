import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobsData, JobsPostData } from "@/types/jobsTypes";
import { RootState } from "../store";

const userToken = localStorage.getItem("userToken");

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === "postUser") {
        const token = (getState() as RootState).user.userDetail?.token;
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
          console.log("Token added to headers:", token);
          localStorage.setItem("userToken", token);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobsData[], null>({
      query: () => "publication",
    }),
    listJobs: builder.query<JobsData[], { page: number; category?: string; city?: string }>({
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
          headers: {
            Authorization: userToken || "",
          },
        };
      },
    }),
    getJobById: builder.query<JobsData, { id: string }>({
      query: ({ id }) => `publication/${id}`,
    }),
    postJob: builder.mutation<JobsData, FormData>({
      query: (newJob) => ({
        url: "publication",
        method: "POST",
        body: newJob,
        headers: {
          Authorization: userToken || "",
        },
      }),
    }),
  }),
});

// builder.query es cuando se quiere hacer una peticion tipo GET
// builder.mutation es cuando se quiere hacer una modificacion de datos POST PUT

export const { useGetAllJobsQuery, useGetJobByIdQuery, usePostJobMutation, useListJobsQuery } =
  jobsApi;

// se crean hooks de react desde la configuracion del enrutado de jobsApi con el nombre de hook use+{endpoint}+Query
