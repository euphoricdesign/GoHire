import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatisticsData } from "@/types/statisticsTypes";

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const statistics = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Ajusta la clave según cómo almacenes el token en localStorage
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsData[], null>({
      query: () => "statistics/payment/month",
    }),
  }),
});

export const { useGetStatisticsQuery } = statistics;
