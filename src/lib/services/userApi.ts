import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userPostData, UserData, UsersData } from "@/types/userTypes";
import type { RootState } from "@/lib/store";


const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;


export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === "postJob" || "listJobs" || "getUserMe") {
        const token = (getState() as RootState).user.userDetail?.token;
        if (token) {
          headers.set("authorization", token);
          console.log("Token added to headers:", token);
          localStorage.setItem("token", token);
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
    getUserMe: builder.query<UserData, null>({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: "users/me",
          headers: token ? { authorization: `${token}` } : {},
        };
      },
    }),
    // Consulta para obtener los usuarios por página
    listUsers: builder.query<UsersData, number | void>({
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
    updateUser: builder.mutation<UserData, Partial<UserData> & { id: string }>({
      query: ({ id, ...patch }) => {
        console.log(patch);
        const token = localStorage.getItem("token");
        return {
          url: `users/${id}`,
          headers: token ? { authorization: `${token}` } : {},
          method: "PATCH",
          body: patch,
        };
      },
    }),
  }),
});

// Exporta los hooks generados automáticamente para las consultas y mutaciones
export const {
  useGetAllUsersQuery,
  usePostUserMutation,
  useListUsersQuery,
  useGetUserByIdQuery,
  useGetUserMeQuery,
  useUpdateUserMutation,
} = userApi;
