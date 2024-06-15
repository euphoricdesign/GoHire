import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Professions } from "@/types/professionsTypes";

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const professionsApi = createApi({
  reducerPath: "professionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getAllProfessions: builder.query<Professions[], null>({
      query: () => "profesions",
    }),
  }),
});

export const { useGetAllProfessionsQuery } = professionsApi;
