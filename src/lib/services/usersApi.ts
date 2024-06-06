import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/types";

interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], null>({
      query: () => "users",
    }),
    listUsers: builder.query<ListResponse<IUser>, number | void>({
      query: (page = 1) => `users?page=${page}`,
    }),
  }),
});

// builder.query es cuando se quiere hacer una peticion tipo GET
// builder.mutation es cuando se quiere hacer una modificacion de datos POST PUT

export const { useGetAllUsersQuery, useListUsersQuery } = usersApi;
