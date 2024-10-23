import { createSlice } from "@reduxjs/toolkit";

const Post = createSlice({
  name: "Post",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
      return state;
    },
  },
});

export const { setPosts } = Post.actions;
export default Post.reducer;
