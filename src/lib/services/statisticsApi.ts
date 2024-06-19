import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatisticsData } from "@/types/statisticsTypes";

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const statistics = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); // Depuración
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Authorization header set:", headers.get("Authorization")); // Depuración
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsData[], null>({
      query: () => ({
        url: "statistics/payment/month",
        method: "GET"
      }),
    }),
  }),
});

export const { useGetStatisticsQuery } = statistics;
