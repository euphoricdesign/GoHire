import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, ListResponse } from "@/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], null>({
      query: () => "users",
    }),
    listUsers: builder.query<IUser[], number | void>({
      query: (page = 1) => `users?page=${page}`,
    }),
  }),
});

export const { useGetAllUsersQuery, useListUsersQuery } = usersApi;
