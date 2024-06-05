import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userPostData, UserData } from "@/types/userTypes";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    postUser: builder.mutation<UserData, userPostData>({
      query: (newUser) => ({
        url: "auth/signup",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { usePostUserMutation } = userApi;
