import axios from "axios";

import { USER_URL } from "../../../constants/constants";
import { IUpdateUser } from "../../../interfaces/UserInterface";

// get user profile
const getUserProfile = async (token: string) => {
  const response = await axios.get(`${USER_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// update user profile

const updateUserProfile = async (
  userId: string,
  token: string,
  formData: IUpdateUser
) => {
  const response = await axios.put(`${USER_URL}/update-profile`, {
    userId,
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const userService = {
  getUserProfile,
  updateUserProfile,
};

export default userService;
