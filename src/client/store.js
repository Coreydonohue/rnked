import { configureStore } from "@reduxjs/toolkit";
import { rankApi } from "./reducers/api";

const store = configureStore({
  reducer: {
    [rankApi.reducerPath]: rankApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rankApi.middleware),
});

export default store;
