import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { StatisticsData } from "@/types/statisticsTyoes";





const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const statistics = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.userDetail?.token;
      if (token) {
        headers.set("Authorization", token);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStatistics: builder.query< StatisticsData[], null>({
        query: () => "statistics/payment/month",
        
      }),
    }),

})

export const { useGetStatisticsQuery } = statistics;