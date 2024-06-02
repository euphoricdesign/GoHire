import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { JobsData } from "@/types/jobsTypes"

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (builder) => ({
        getAllJobs: builder.query<JobsData[], null>({
            query: () => "publication"
        }),
        getJobById: builder.query<JobsData, {id: string}>({
            query: ({id}) => `publication/${id}`
        }),
        postJob: builder.mutation<JobsData, null> ({
            query: () => "publication"
        })
    })
})

// builder.query es cuando se quiere hacer una peticion tipo GET
// builder.mutation es cuando se quiere hacer una modificacion de datos POST PUT

export const {useGetAllJobsQuery, useGetJobByIdQuery} = jobsApi

// se crean hooks de react desde la configuracion del enrutado de jobsApi con el nombre de hook use+{endpoint}+Query