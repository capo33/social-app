import { Request, Response } from "express";

import UserModel from "../models/User";
import { generateToken } from "../utils/generateToken";
import { Types } from "mongoose";

// @desc    Get logged in user
// @route   GET /api/v1/users/me
// @access  Private
const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      message: "User profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/update-profile
// @access  Private
const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user exists
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user?._id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
};

// @desc    Delete user profile
// @route   DELETE /api/v1/users/delete-user
// @access  Private
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user exists
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Check if user is authorized to delete the user
    if (user?._id.toString() !== req.user?._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this user");
    }

    // Delete user
    await UserModel.findByIdAndDelete(req.user?._id);

    res.status(200).json({
      success: true,
      message: "Sad to see you go, user deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
};

// @desc    Follow a user
// @route   PUT /api/v1/users/follow
// @access  Private
const followUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // We are following this user now - so we add this user to our following list
    const user = await UserModel.findByIdAndUpdate(
      req.body.followId, // followId is the id of the user we want to follow
      {
        // we are adding the user id to the following array
        $push: { followers: req.user?._id },
      },
      { new: true }
    ).select("-password");

    // This user is following us now - so we add this user to our followers list
    const me = await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ user, me });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Unfollow a user
// @route   PUT /api/v1/users/unfollow
// @access  Private
const unfollowUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // We are unfollowing this user now - so we remove this user from our following list
    const user = await UserModel.findByIdAndUpdate(
      req.body.unfollowId, // unfollowId is the id of the user we want to unfollow
      {
        // we are removing the user id from the following array
        $pull: { followers: req.user?._id },
      },
      { new: true }
    ).select("-password");

    // This user is unfollowing us now - so we remove this user from our followers list
    const me = await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $pull: { following: req.body.unfollowId },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ user, me });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export { getProfile, updateProfile, deleteUser, followUser, unfollowUser };
