import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/post";
import { RootState } from "../store";

const initialState: Post[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
