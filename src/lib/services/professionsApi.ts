import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Professions } from "@/types/professionsTypes";
import { RootState } from "@/lib/store"

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.userDetail?.token;
    if (token) {
      headers.set("authorization", `${token}`);
      console.log('Token added to headers:', token);
    }
    return headers;
  },
});

export const professionsApi = createApi({
  reducerPath: "professionsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAllProfessions: builder.query<Professions[], null>({
      query: () => "profesions",
    }),
    createProfession: builder.mutation<Professions, { category: string }>({
      query: (newProfession) => ({
        url: "profesions",
        method: "POST",
        body: newProfession,
      }),
    }),
    updateProfession: builder.mutation<Professions, Partial<Professions>>({
      query: ({ id, ...patch }) => ({
        url: `profesions/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetAllProfessionsQuery,
  useCreateProfessionMutation,
  useUpdateProfessionMutation,
} = professionsApi;
