import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { jobsApi } from "./services/jobsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./services/usersApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counterReducer,
      jobsApi: jobsApi.reducer,
      usersApi: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([jobsApi.middleware, usersApi.middleware]),
  });
};

// Crea una instancia del store
const store = makeStore();

// Configura los listeners con la instancia del store
setupListeners(store.dispatch);

// Middkeware se agregan para

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Se extrae el tipo de dato del Store del estado raiz
export type RootState = ReturnType<AppStore["getState"]>;
// Se extrae el tipo de las funciones que se van a poder ejecutar
export type AppDispatch = AppStore["dispatch"];
