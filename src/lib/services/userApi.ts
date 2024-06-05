import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userPostData,UserData } from "@/types/userTypes" 
export const userApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints: (builder) => ({
       
        postJob: builder.mutation<UserData, userPostData>({
            query: (newUse) => ({
                url: "auth/signup",
                method: "POST",
                body: newUse,
            }),
        }),
    })
})

// builder.query es cuando se quiere hacer una peticion tipo GET
// builder.mutation es cuando se quiere hacer una modificacion de datos POST PUT

export const {usePostJobMutation} = userApi

// se crean hooks de react desde la configuracion del enrutado de jobsApi con el nombre de hook use+{endpoint}+Query