import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/slices/userSlice";
import { jobsApi } from "./services/jobsApi";
import { userApi } from "./services/userApi";
import { paymentsApi } from "./services/paymentsApi";
import { professionsApi } from "./services/professionsApi"; // Importa tu API de profesiones
import paymentsReducer from "./features/slices/paymentsSlice"; 
import { setupListeners } from "@reduxjs/toolkit/query";
import { statisticsApi } from "./services/statisticsApi";

// Configurar el store
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      [jobsApi.reducerPath]: jobsApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [paymentsApi.reducerPath]: paymentsApi.reducer,
      [professionsApi.reducerPath]: professionsApi.reducer, // Agrega el nuevo reducer
      [statisticsApi.reducerPath]: statisticsApi.reducer,
      payments: paymentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(jobsApi.middleware)
        .concat(userApi.middleware)
        .concat(paymentsApi.middleware)
        .concat(professionsApi.middleware)
        .concat(statisticsApi.middleware),
  });
};

// Crea una instancia del store
const store = makeStore();

// Configura los listeners con la instancia del store
setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
