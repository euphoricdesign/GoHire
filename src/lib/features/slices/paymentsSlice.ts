import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentResponse } from '../../services/paymentsApi'

interface PaymentState {
  paymentData: PaymentResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  paymentData: null,
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<PaymentResponse>) => {
      state.paymentData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPaymentData, setLoading, setError } = paymentsSlice.actions;

export const selectPaymentData = (state:any) => state.payments.paymentData;

export default paymentsSlice.reducer;
