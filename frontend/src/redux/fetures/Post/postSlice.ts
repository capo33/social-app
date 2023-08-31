import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postServices from "./postServices";
import { IPost, IPostCreate } from "../../../interfaces/PostInterface";
import { NavigateFunction } from "react-router-dom";

interface PostState {
  posts: IPost[];
  post: IPost;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;

  message: string;
}

const initialState: PostState = {
  posts: [],
  post: {
    _id: "",
    title: "",
    description: "",
    image: "",
    likes: [],
    tags: [],
    comments: [],
    postedBy: {
      id: "",
      username: "",
      image: "",
    },
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all posts
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postServices.getPosts();

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// get post by id

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await postServices.getPost(id);

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    {
      formData,
      token,
      toast,
    }: {
      formData: IPostCreate;
      token: string;
      toast: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postServices.createPost(formData, token);
      toast.success(response.message);
      return response;
    } catch (error: unknown | any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload;
    });
    builder.addCase(getAllPosts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // get post by id
    builder.addCase(getPostById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getPostById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post = payload;
    });
    builder.addCase(getPostById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // delete a post
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload.data;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export default postSlice.reducer;
