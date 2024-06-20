import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userPostData, UserData, UsersData, UserPatchData } from "@/types/userTypes";
import type { RootState } from "@/lib/store";
import { UserEducation } from "@/types/educationsTypes";
import { Professions } from "@/types/professionsTypes";
import { invitationsData } from "@/types/invitationsTypes";
import { NotificationData } from "@/types/notificationsType";

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
    getAllUsers: builder.query<UsersData, null>({
      query: () => "users",
    }),
    getAllActiveUsers: builder.query<any, null>({
      query: () => "users/all",
    }),
    getAllBlockedUsers: builder.query<any, null>({
      query: () => "users/blocks",
    }),
    getUserById: builder.query<UserData, { id: string }>({
      query: ({ id }) => `users/${id}`,
    }),
    getUserMe: builder.query<UserData, null>({
      query: () => "users/me",
    }),
    getNotificationsMe: builder.query<NotificationData[], null>({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: "notifications/me",
          headers: token ? { authorization: `${token}` } : {},
        };
      },
    }),
    getInvitationOffers: builder.query<invitationsData[], null>({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: "invitation/offers",
          method: "GET",
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
    updateUser: builder.mutation<UserPatchData, Partial<UserPatchData> & { id: string }>({
      query: ({ id, ...patch }) => {
        const token = localStorage.getItem("token");
        if (patch.imgPictureUrl) {
          const formData = new FormData();
          formData.append("imgPictureUrl", patch.imgPictureUrl!);
          return {
            url: `users/${id}`,
            headers: token ? { authorization: `${token}` } : {},
            method: "PATCH",
            body: formData,
            formData: true,
          };
        }
        return {
          url: `users/${id}`,
          headers: token ? { authorization: `${token}` } : {},
          method: "PATCH",
          body: patch,
        };
      },
    }),
    postEducation: builder.mutation<UserEducation, UserEducation>({
      query: (newEducation) => {
        const token = localStorage.getItem("token");
        return {
          url: "education",
          method: "POST",
          body: newEducation,
          headers: token ? { authorization: `${token}` } : {},
        };
      },
    }),
    postProfession: builder.mutation<Professions, Professions>({
      query: (newProfession) => {
        const token = localStorage.getItem("token");
        return {
          url: "profesions/me",
          method: "PATCH",
          body: newProfession,
          headers: token ? { authorization: `${token}` } : {},
        };
      },
    }),
  }),
});

// Exporta los hooks generados automáticamente para las consultas y mutaciones
export const {
  useGetAllUsersQuery,
  useGetAllActiveUsersQuery,
  useGetAllBlockedUsersQuery,
  usePostUserMutation,
  useListUsersQuery,
  useGetUserByIdQuery,
  useGetUserMeQuery,
  useUpdateUserMutation,
  usePostEducationMutation,
  usePostProfessionMutation,
  useGetNotificationsMeQuery,
  useGetInvitationOffersQuery,
} = userApi;
