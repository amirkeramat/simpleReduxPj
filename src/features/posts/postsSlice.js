import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
// const POSTS_URL = "http://localhost:3000/posts";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
  loading: false,
  error: null,
  posts: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.data.push(action.payload);
      },
      prepare(title, desc, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            desc,
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
            date: new Date().toISOString(),
          },
        };
      },
    },
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
      state.data.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data.loading = false;
      // let minute = 1;
      // const loadedPosts = action.payload.map((post) => {
      //   post.data = sub(new Date(), { minutes: minute++ }).toISOString();
      //   post.reactions = {
      //     thumbsUp: 0,
      //     wow: 0,
      //     heart: 0,
      //     rocket: 0,
      //     coffee: 0,
      //   };
      //   return post;
      // });
      // state.data = state.data.concat(loadedPosts);
      state.data = action.payload.posts;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export const selectAllPosts = (state) => state.posts.posts;
export const { addPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
