import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DailyPostsCount, MonthlyPostsCount, MonthlyUsersCount, StatisticsData, WeeklyPostsCount } from "@/types/statisticsTypes";

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
    getUsersStatistics: builder.query<MonthlyUsersCount[], null>({
      query: () => "statistics/month",
    }),
    getPostStatistics: builder.query<MonthlyPostsCount[], null>({
      query: () => "statistics/publication/month"
    }),
    getPostWeeklyStatistics: builder.query<WeeklyPostsCount[], null>({
      query: () => "statistics/publication/week"
    }),
    getPostDailyStatistics: builder.query<DailyPostsCount[], null>({
      query: () => "statistics/publication/days"
    })
  }),
});

export const {
  useGetStatisticsQuery,
  useGetPostStatisticsQuery,
  useGetPostWeeklyStatisticsQuery,
  useGetPostDailyStatisticsQuery,
  useGetUsersStatisticsQuery,
} = statisticsApi;
