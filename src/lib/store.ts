import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/slices/userSlice";
import paymentsReducer from "./features/slices/paymentsSlice"; // Importa paymentsReducer
import { setupListeners } from "@reduxjs/toolkit/query";
import { paymentsApi } from "./services/paymentsApi";
import { jobsApi } from "./services/jobsApi";
import { userApi } from "./services/userApi";
import { professionsApi } from "./services/professionsApi";
import { statisticsApi } from "./services/statisticsApi";  // Importa statisticsApi correctamente

// Configurar el store
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      payments: paymentsReducer, // Asegúrate de tener definido e importado paymentsReducer
      [jobsApi.reducerPath]: jobsApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [professionsApi.reducerPath]: professionsApi.reducer,
      [paymentsApi.reducerPath]: paymentsApi.reducer,
      [statisticsApi.reducerPath]: statisticsApi.reducer,  // Añade el reducer del statisticsApi
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(jobsApi.middleware)
        .concat(userApi.middleware)
        .concat(paymentsApi.middleware)
        .concat(professionsApi.middleware)
        .concat(statisticsApi.middleware),  // Añade el middleware del statisticsApi
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
