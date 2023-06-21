import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "http://localhost:3000/posts";
const initialState = {
  loading: false,
  error: null,
  data: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialState) => {
    try {
      const response = await axios.post(POSTS_URL, initialState);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.data.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      let minute = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: minute++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });
      state.data = state.data.concat(loadedPosts);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addNewPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.loading = false;

      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      state.data.push(action.payload);
    });
  },
});
export const selectAllPosts = (state) => state.posts.data;
export const selectLoading = (state) => state.posts.loading;
export const selectError = (state) => state.posts.error;
export const { addPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
