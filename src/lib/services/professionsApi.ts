import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Professions } from "@/types/professionsTypes";
import { RootState } from "@/lib/store"

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.userDetail?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const professionsApi = createApi({
  reducerPath: "professionsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAllProfessions: builder.query<Professions[], null>({
      query: () => "professions",
    }),
    createProfession: builder.mutation<Professions, Partial<Professions>>({
      query: (newProfession) => ({
        url: "professions",
        method: "POST",
        body: newProfession,
      }),
    }),
    deleteProfession: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `professions/${id}`,
        method: "DELETE",
      }),
    }),
    updateProfession: builder.mutation<Professions, Partial<Professions>>({
      query: ({ id, ...patch }) => ({
        url: `professions/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetAllProfessionsQuery,
  useCreateProfessionMutation,
  useDeleteProfessionMutation,
  useUpdateProfessionMutation,
} = professionsApi;
