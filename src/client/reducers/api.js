import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rankApi = createApi({
    tagTypes: ["rank"],
    reducerPath: "rankApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000/",
    }),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (body) => ({
              url: "auth/register",
              method: "POST",
              body: body,
            }),
          }),
    })
})