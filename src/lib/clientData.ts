"use client";

import {
  createPost as createPostAction,
  getPostsWithinDistanceOfPoint as getPostsWithinDistanceOfPointAction,
  upsertUserPostVote as upsertUserPostVoteAction,
} from "@/app/actions/postActions";
import {
  createUser as createUserAction,
  getUsersPostVotes as getUsersPostVotesAction,
} from "@/app/actions/userActions";
import { Post, Vote } from "../types/posts";
import {
  createDevPost,
  createDevUser,
  getDevPosts,
  getDevUsersPostVotes,
  upsertDevUserPostVote,
} from "./devLocalData";

export const createUser = async (userId: string) => {
  if (process.env.NODE_ENV === "development") {
    createDevUser(userId);
    return;
  }

  await createUserAction(userId);
};

export const getUsersPostVotes = async (userId: string): Promise<Vote[]> => {
  if (process.env.NODE_ENV === "development") {
    return getDevUsersPostVotes(userId);
  }

  return getUsersPostVotesAction(userId);
};

export const createPost = async (
  post: string,
  latitude: string,
  longitude: string,
  userId: string,
) => {
  if (process.env.NODE_ENV === "development") {
    createDevPost(post, latitude, longitude, userId);
    return;
  }

  await createPostAction(post, latitude, longitude, userId);
};

export const getPostsWithinDistanceOfPoint = async (
  latitude: string,
  longitude: string,
  distanceKm: string,
): Promise<Post[]> => {
  if (process.env.NODE_ENV === "development") {
    return getDevPosts();
  }

  return getPostsWithinDistanceOfPointAction(latitude, longitude, distanceKm);
};

export const upsertUserPostVote = async (
  postId: string,
  userId: string,
  vote: number,
) => {
  if (process.env.NODE_ENV === "development") {
    upsertDevUserPostVote(postId, userId, vote);
    return;
  }

  await upsertUserPostVoteAction(postId, userId, vote);
};
