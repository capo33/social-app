import axios from "axios";

import { POST_URL } from "../../../constants/constants";
import { IPostCreate } from "../../../interfaces/PostInterface";

// Get all posts
const getPosts = async () => {
  const response = await axios.get(POST_URL);
  return response.data;
};

// Get single post
const getPost = async (id: string) => {
  const response = await axios.get(`${POST_URL}/${id}`);
  return response.data;
};

// Create post
const createPost = async (formData: IPostCreate, token: string) => {
  const response = await axios.post(POST_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const postServices = {
  getPosts,
  getPost,
  createPost,
};

export default postServices;
