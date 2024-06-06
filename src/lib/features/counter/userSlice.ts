import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { UserData } from '@/types/userTypes';

// Define a type for the slice state
interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action: AnyAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      (action: AnyAction) => action.type.endsWith('/fulfilled'),
      (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      (action: AnyAction) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch user data';
      }
    );
  },
});

// Exportar las acciones que modifican el estado
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

// Selector para obtener el estado del usuario
export const selectUser = (state: RootState) => state.user.user;

// Exportar el reducer para configurarlo en el store
export default userSlice.reducer;
