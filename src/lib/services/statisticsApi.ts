import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from '@/lib/store';

interface MonthlyUsersCount {
  month: string,
  countUsers: number
}

interface MonthlyPostsCount {
  month: string,
  countPublications: number
}

interface WeeklyPostsCount {
  week: string,
  countPublications: number
}

interface DailyPostsCount {
  day: string,
  countPublications: number
}

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.userDetail?.token;
      if (token) {
        headers.set("authorization", `${token}`)
        console.log('Token added to headers:', token)
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
  })
})

export const { 
  useGetUsersStatisticsQuery,
  useGetPostStatisticsQuery,
  useGetPostWeeklyStatisticsQuery,
  useGetPostDailyStatisticsQuery
} = statisticsApi
