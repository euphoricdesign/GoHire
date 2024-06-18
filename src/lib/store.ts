import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { paymentsApi } from "./services/paymentsApi";
import paymentsReducer from "./features/slices/paymentsSlice";
import { jobsApi } from "./services/jobsApi";
import { userApi } from "./services/userApi";
import { professionsApi } from "./services/professionsApi";

// Configurar el store
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      [jobsApi.reducerPath]: jobsApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [professionsApi.reducerPath]: professionsApi.reducer,
      [paymentsApi.reducerPath]: paymentsApi.reducer,
      payments: paymentsReducer, // Agrega el nuevo reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(jobsApi.middleware)
        .concat(userApi.middleware)
        .concat(paymentsApi.middleware)
        .concat(professionsApi.middleware),
  });
};

// Crea una instancia del store
const store = makeStore();

// Configura los listeners con la instancia del store
setupListeners(store.dispatch);

// Middleware se agregan para

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Se extrae el tipo de dato del Store del estado raíz
export type RootState = ReturnType<AppStore["getState"]>;
// Se extrae el tipo de las funciones que se van a poder ejecutar
export type AppDispatch = AppStore["dispatch"];

export default store;
