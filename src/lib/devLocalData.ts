"use client";

import { mockPosts } from "./testData";
import { Post, Vote } from "../types/posts";

const DEV_POSTS_KEY = "dev.posts";
const DEV_VOTES_KEY = "dev.votes";
const DEV_USERS_KEY = "dev.users";

export const DEV_DATA_UPDATED_EVENT = "dev-data-updated";

const readJson = <T>(key: string, fallback: T): T => {
  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Unable to parse localStorage key: ${key}`, error);
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const ensureDevData = () => {
  if (!window.localStorage.getItem(DEV_POSTS_KEY)) {
    writeJson(DEV_POSTS_KEY, mockPosts);
  }

  if (!window.localStorage.getItem(DEV_VOTES_KEY)) {
    writeJson(DEV_VOTES_KEY, []);
  }

  if (!window.localStorage.getItem(DEV_USERS_KEY)) {
    writeJson(DEV_USERS_KEY, []);
  }
};

export const getDevPosts = (): Post[] => {
  ensureDevData();
  return readJson<Post[]>(DEV_POSTS_KEY, []);
};

export const createDevPost = (
  content: string,
  latitude: string,
  longitude: string,
  userId: string,
) => {
  ensureDevData();

  const nextPost: Post = {
    id: crypto.randomUUID(),
    content,
    latitude,
    longitude,
    hidden: "false",
    votes: 0,
    user_id: userId,
    date: Date.now().toString(),
  };

  const posts = getDevPosts();
  writeJson(DEV_POSTS_KEY, [nextPost, ...posts]);
  window.dispatchEvent(new Event(DEV_DATA_UPDATED_EVENT));
};

export const createDevUser = (userId: string) => {
  ensureDevData();

  const users = readJson<string[]>(DEV_USERS_KEY, []);
  if (!users.includes(userId)) {
    writeJson(DEV_USERS_KEY, [...users, userId]);
  }
};

export const getDevUsersPostVotes = (userId: string): Vote[] => {
  ensureDevData();

  const votes = readJson<Vote[]>(DEV_VOTES_KEY, []);
  return votes.filter((vote) => vote.user_id === userId);
};

export const upsertDevUserPostVote = (
  postId: string,
  userId: string,
  vote: number,
) => {
  ensureDevData();

  const votes = readJson<Vote[]>(DEV_VOTES_KEY, []);
  const posts = getDevPosts();
  const existingVoteIndex = votes.findIndex(
    (existingVote) =>
      existingVote.post_id === postId && existingVote.user_id === userId,
  );
  const previousVote = existingVoteIndex >= 0 ? votes[existingVoteIndex].vote : 0;
  const voteDifference = vote - previousVote;

  const nextVotes =
    existingVoteIndex >= 0
      ? votes.map((existingVote, index) =>
          index === existingVoteIndex ? { ...existingVote, vote } : existingVote,
        )
      : [
          ...votes,
          {
            id: crypto.randomUUID(),
            post_id: postId,
            user_id: userId,
            vote,
          },
        ];

  const nextPosts = posts.map((post) =>
    post.id === postId ? { ...post, votes: post.votes + voteDifference } : post,
  );

  writeJson(DEV_VOTES_KEY, nextVotes);
  writeJson(DEV_POSTS_KEY, nextPosts);
  window.dispatchEvent(new Event(DEV_DATA_UPDATED_EVENT));
};
