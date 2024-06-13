import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Define the type for the data you will send in the body
interface PaymentData {
    // Aquí deberías definir las propiedades que contiene `dataSelect`
    // Por ejemplo:
    title: string,
    quantity: number, // 7 días
    unit_price: number,
    description: string,
    idPost: string
    // etc.
}

// Define the response type if you expect any response
export interface PaymentResponse {
  // Aquí deberías definir las propiedades que contiene la respuesta del servidor
  // Por ejemplo:
  url: string;
  // etc.
}

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
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
