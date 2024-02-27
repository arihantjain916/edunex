import { createSlice } from "@reduxjs/toolkit";

export interface BlogState {
  posts: any[];
}
const initialState: BlogState = {
  posts: [],
};

export const authSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    saveBlog: (state, action) => {
      state.posts.push(action.payload);
    },
    deleteBlog: (state) => {
      // state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.posts = []
    },
    updateBlog: (state, action) => {
      const { postId, updatedContent } = action.payload;
      const postToUpdate = state.posts.find((post) => post.id === postId);
      if (postToUpdate) {
        postToUpdate.content = updatedContent;
      }
    },
  },
});

export const { saveBlog, deleteBlog, updateBlog } = authSlice.actions;
export default authSlice.reducer;
