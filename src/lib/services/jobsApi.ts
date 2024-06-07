import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { JobsData, JobsPostData } from "@/types/jobsTypes"

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints: (builder) => ({
        getAllJobs: builder.query<JobsData[], null>({
            query: () => "publication"
        }),
        getJobById: builder.query<JobsData, {id: string}>({
            query: ({id}) => `publication/${id}`
        }),
        postJob: builder.mutation<JobsData,FormData>({
            query: (newJob) => ({
                url: "publication",
                method: "POST",
                body: newJob,
            }),
        }),
    })
})

// builder.query es cuando se quiere hacer una peticion tipo GET
// builder.mutation es cuando se quiere hacer una modificacion de datos POST PUT

export const {useGetAllJobsQuery, useGetJobByIdQuery, usePostJobMutation} = jobsApi

// se crean hooks de react desde la configuracion del enrutado de jobsApi con el nombre de hook use+{endpoint}+Query