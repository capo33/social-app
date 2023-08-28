import { Request, Response } from "express";

import PostModel from "../models/Post";

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find({})
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort({ date: -1 });

    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private
const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      res.status(422);
      throw new Error("Please add all the fields");
    }

    // Hide password from user object
    req.body.postedBy = req.user?._id;

    const post = await PostModel.create({
      title,
      description,
      image,
      postedBy: req.user,
    });

    res.status(201).json({
      message: "Post created successfully",
      result: post,
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

// @desc    Get all posts by a user
// @route   GET /api/v1/posts/my-posts
// @access  Private
const getMyPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find({ postedBy: req.user?._id })
      .populate("postedBy", "_id name")
      .sort({ date: -1 });

    if (!posts) {
      res.status(404);
      throw new Error("No posts found");
    }
    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

export { getPosts, createPost, getMyPosts };
