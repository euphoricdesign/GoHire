import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userPostData, UserData } from "@/types/userTypes";
import type { RootState } from '@/lib/store';

// Define el API con todas las consultas y mutaciones
export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === 'postUser') {
        const token = (getState() as RootState).user.userDetail?.token;
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
          console.log('Token added to headers:', token);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Consulta para obtener todos los usuarios
    getAllUsers: builder.query<UserData[], null>({
      query: () => "users",
    }),
    getUserById: builder.query<UserData, { id: string }>({
      query: ({ id }) => `users/${id}`,
    }),
    // Consulta para obtener los usuarios por página
    listUsers: builder.query<UserData[], number | void>({
      query: (page = 1) => `users?page=${page}`,
    }),
    // Mutación para crear un nuevo usuario
    postUser: builder.mutation<UserData, userPostData>({
      query: (newUser) => ({
        url: "auth/signIn",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

// Exporta los hooks generados automáticamente para las consultas y mutaciones
export const { useGetAllUsersQuery, usePostUserMutation, useListUsersQuery, useGetUserByIdQuery } =
  userApi;