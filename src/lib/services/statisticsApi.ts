import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatisticsData } from "@/types/statisticsTypes";

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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
    getPostStatistics: builder.query<StatisticsData[], null>({
      query: () => "statistics/post/month",
    }),
    getPostWeeklyStatistics: builder.query<StatisticsData[], null>({
      query: () => "statistics/post/weekly",
    }),
    getPostDailyStatistics: builder.query<StatisticsData[], null>({
      query: () => "statistics/post/daily",
    }),
    getUsersStatistics: builder.query<StatisticsData[], null>({
      query: () => "statistics/users",
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetPostStatisticsQuery,
  useGetPostWeeklyStatisticsQuery,
  useGetPostDailyStatisticsQuery,
  useGetUsersStatisticsQuery,
} = statisticsApi;
