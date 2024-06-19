import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { UserData } from "@/types/userTypes";
import { userApi } from "@/lib/services/userApi";

// Define a type for the slice state
interface UserState {
  userDetail: UserData | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userDetail: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<UserData>) => {
      state.userDetail = action.payload;
    },
    clearUserDetail: (state) => {
      state.userDetail = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<UserData>) {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.postUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(userApi.endpoints.postUser.matchFulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addMatcher(userApi.endpoints.postUser.matchRejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch user data";
      });
  },
});

// Exportar las acciones que modifican el estado
export const { setUserDetail, clearUserDetail, setLoading, setError, setUser } = userSlice.actions;

// Selector para obtener el estado del usuario
export const selectUserDetail = (state: RootState) => state.user.userDetail;

// Exportar el reducer para configurarlo en el store
export default userSlice.reducer;
