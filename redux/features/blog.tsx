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
      state.posts = [];
    },
    updateIsNew: (state, action) => {
      const { postId, isNew, newId } = action.payload;
      const postToUpdate = state.posts.find((post) => post.id === postId);
      if (postToUpdate) {
        postToUpdate.isNew = isNew;
        postToUpdate.id = newId;
      }
    },
    updateBlog: (state, action) => {
      const { postId, updatedContent, updateTitle, isNew } = action.payload;
      const postToUpdate = state.posts.find((post) => post.id === postId);
      if (postToUpdate) {
        postToUpdate.id = postId;
        postToUpdate.content = updatedContent;
        postToUpdate.title = updateTitle;
        postToUpdate.isNew = isNew;
      }
    },
    defaultBlog: (state) => {
      state.posts = [];
    },
    finalUpdate(state, action) {
      const { postId, updatedContent, updateTitle, isNew, newId } =
        action.payload;
      const postToUpdate = state.posts.find((post) => post.id === postId);
      if (postToUpdate) {
        postToUpdate.id = newId;
        postToUpdate.content = updatedContent;
        postToUpdate.title = updateTitle;
        postToUpdate.isNew = isNew;
      }
    },
  },
});

export const {
  saveBlog,
  deleteBlog,
  updateBlog,
  defaultBlog,
  updateIsNew,
  finalUpdate,
} = authSlice.actions;
export default authSlice.reducer;
