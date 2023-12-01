import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rankApi = createApi({
  tagTypes: ["rank"],
  reducerPath: "rankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    // users
    addUser: builder.mutation({
      query: (body) => ({
        url: "api/users/register",
        method: "POST",
        body: body,
      }),
    }),
    getCurrentUser: builder.query({
      query: (id) => `api/users/me`,
      // query: (id) => `api/users/${id}`,
    }),

    // channels
    getUserChannel: builder.query({
      query: (admin_id) => `api/channels/current`,
      // query: (admin_id) => `api/channels/${admin_id}`,
    }),

    //posts
    createNewPost: builder.mutation({
      query: (body) => ({
        url: "api/posts/",
        method: "POST",
        body: body,
      }),
    }),
    getCurrentUserPosts: builder.query({
      query: (id) => `api/posts/me`,
      // query: (id) => `api/users/${id}`,
    }),
    getAllPosts: builder.query({
      query: () => `api/posts/all`,
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUserChannelQuery,
  useGetCurrentUserQuery,
  useCreateNewPostMutation, 
  useGetCurrentUserPostsQuery, 
  useGetAllPostsQuery,
} = rankApi;
