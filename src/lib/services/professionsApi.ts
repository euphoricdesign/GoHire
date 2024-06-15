import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Professions } from "@/types/professionsTypes";

export const professionsApi = createApi({
  reducerPath: "professionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "RUTA_BACKEND_ONRENDER",
  }),
  endpoints: (builder) => ({
    getAllProfessions: builder.query<Professions[], null>({
      query: () => "profesions",
    }),
  }),
});

export const { useGetAllProfessionsQuery } = professionsApi;
