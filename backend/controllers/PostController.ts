import { Request, Response } from "express";

import PostModel from "../models/Post";
import { Types } from "mongoose";

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

// @desc    Get a single post
// @route   GET /api/v1/posts/:postId
// @access  Public

const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json(post);
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
    const { title, description, image, tags } = req.body;

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
      tags,
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

// @desc    Like a post
// @route   PUT /api/v1/posts/like
// @access  Private
const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user?._id },
        $inc: { likesCount: 1 },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

// @desc    Unlike a post
// @route   PUT /api/v1/posts/unlike
// @access  Private
const unlikePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user?._id },
        $inc: { likesCount: -1 },
      },
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

export { getPosts, getPost, createPost, getMyPosts, likePost, unlikePost };
