import { configureStore } from "@reduxjs/toolkit";
import { rankApi } from "./reducers/api";
// import authReducer from './reducers/auth'

const store = configureStore({
    reducer: {
        [rankApi.reducerPath]: rankApi.reducer,
        // auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rankApi.middleware),
});

export default store;
