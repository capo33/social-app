import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postServices from "./postServices";
import { IPost, IPostCreate } from "../../../interfaces/PostInterface";

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
      _id: "",
      username: "",
      image: "",
    },
    createdAt: 0,
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

// delete post

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (
    { postId, token, toast }: { postId: string; token: string; toast: any },
    thunkAPI
  ) => {
    try {
      const response = await postServices.deletePost(postId, token);
      toast.success(response?.message);
      thunkAPI.dispatch(getAllPosts());

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// like post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const response = await postServices.likePost(postId, token);
      thunkAPI.dispatch(getAllPosts());

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// unlike post
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const response = await postServices.unlikePost(postId, token);
      thunkAPI.dispatch(getAllPosts());

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
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

    // delete a post
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload.data;
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // like a post
    builder.addCase(likePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(likePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // unlike a post
    builder.addCase(unlikePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unlikePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: IPost) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(unlikePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export default postSlice.reducer;
