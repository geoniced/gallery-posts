import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment } from "../../types/comment";
import { Post } from "../../types/post";

// Define a service using a base URL and expected endpoints
export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `/photos?_page=1&_limit=21`,
    }),
    getPost: builder.query<Post, string | undefined>({
      query: (id) => `/photos/${id}`,
    }),
    getPostComments: builder.query<Comment[], string | undefined>({
      query: (id) => `/comments?postId=${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useGetPostQuery, useGetPostCommentsQuery } =
  galleryApi;
