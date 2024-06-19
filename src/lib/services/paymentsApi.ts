import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface PaymentData {
    title: string,
    quantity: number,
    unit_price: number,
    description: string,
    id: string
    // etc.
}

export interface PaymentResponse {
  url: string;
  item: {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    title: string;
    quantity: number;
    unit_price: number;
  }
  // etc.
}

const baseUrl = process.env.NEXT_PUBLIC_RUTA_BACKEND_ONRENDER;

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
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
    postPayment: builder.mutation<PaymentResponse, PaymentData>({
      query: (dataSelect) => ({
        url: "payments",
        method: "POST",
        body: dataSelect,
      }),
    }),
  }),
});

export const { usePostPaymentMutation } = paymentsApi;
