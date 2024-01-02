import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import auth from "../../server/auth/firebase";

export const rankApi = createApi({
  tagTypes: ["rank"],
  reducerPath: "rankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: async (headers) => {
      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, () => {
          resolve();
          unsubscribe();
        });
      });
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
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
    getUserbyId: builder.query({
      query: (id) => `api/users/${id}`,
    }),

    // channels
    getUserChannel: builder.query({
      query: (admin_id) => `api/channels/current`,
      // query: (admin_id) => `api/channels/${admin_id}`,
    }),
    getAdminChannels: builder.query({
      query: (id) => `api/channels/admin/${id}`,
    }),
    getJoinedChannels: builder.query({
      query: (id) => `api/channels/joined/${id}`,
    }),
    getPublicChannels: builder.query({
      query: () => `api/channels/public`,
    }),
    getPrivateChannels: builder.query({
      query: () => `api/channels/private`,
    }),
    createChannel: builder.mutation({
      query: (body) => ({
        url: "api/channels/create",
        method: "POST",
        body: body,
      }),
    }),
    joinChannel: builder.mutation({
      query: (body) => ({
        url: "api/role/join",
        method: "POST",
        body: body,
      }),
    }),
    // joinPrivateChannel: builder.mutation({
    //   query: (body) => ({
    //     url: "api/role/join",
    //     method: "POST",
    //     body: body,
    //   }),
    // }),

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
    getPostsByUserId: builder.query({
      query: (id) => `api/posts/${id}`,
    }),
    getAllPosts: builder.query({
      query: () => `api/posts/all`,
    }),
    // followers
    createNewFollower: builder.mutation({
      query: (id) => ({
        url: `api/follow/follow/${id}`,
        method: "POST",
        body: id,
      }),
    }),
    deleteFollow: builder.mutation({
      query: (id) => ({
        url: `api/follow/unfollow/${id}`,
        method: "DELETE",
      }),
    }),
    //likes
    createPostLike: builder.mutation({
      query: (id) => ({
        url: `api/like/post/${id}`,
        method: "POST",
        body: id,
      }),
    }),
    deleteLike: builder.mutation({
      query: (id) => ({
        url: `api/like/remove/${id}`,
        method: "DELETE",
      }),
    }),
    //comments
    createComment: builder.mutation({
      query: (id) => ({
        url: `api/comment/${id}`,
        method: "POST",
        body: id,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `api/comment/delete/${id}`,
        method: "DELETE",
      }),
    }),
    //join channel requests 
    createJoinRequest: builder.mutation({
      query: (id) => ({
        url: `api/joinRequest/request/${id}`,
        method: "POST",
        body: id,
      }),
    }),
    getJoinRequests: builder.query({
      query: (id) => `api/joinRequest/channel/${id}`,
    }),
    acceptJoinRequest: builder.mutation({
      query: (id) => ({
        url: `api/joinRequest/accept`,
        method: "POST",
        body: id,
      }),
    }),

    //books 
    getAllBooks: builder.query({
      query: () => `api/books/all`,
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUserChannelQuery,
  useGetAdminChannelsQuery, 
  useGetPublicChannelsQuery, 
  useGetPrivateChannelsQuery,
  useGetJoinedChannelsQuery,
  useCreateChannelMutation,
  useJoinChannelMutation,
  useAcceptJoinRequestMutation,
  useGetCurrentUserQuery,
  useGetUserbyIdQuery,
  useCreateNewPostMutation,
  useGetCurrentUserPostsQuery,
  useGetAllPostsQuery,
  useGetPostsByUserIdQuery,
  useCreateNewFollowerMutation, 
  useDeleteFollowMutation,
  useCreatePostLikeMutation,
  useDeleteLikeMutation,
  useCreateCommentMutation, 
  useDeleteCommentMutation,
  useCreateJoinRequestMutation, 
  useGetJoinRequestsQuery,
  useGetAllBooksQuery
} = rankApi;
