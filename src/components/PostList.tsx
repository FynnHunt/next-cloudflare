"use client";
import { getPosts } from "@/app/actions/postActions";
import Post from "./Post";
import { useEffect, useState } from "react";
import { Post as PostType, VoteStatus } from "../types/posts";
import { Vote } from "../types/posts";
import { getUsersPostVotes } from "../app/actions/userActions";

export default function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [usersPostVotes, setUsersPostVotes] = useState<Vote[]>([]);

  useEffect(() => {
    let userId = window.localStorage.getItem("userId");
    let newUser = false;

    if (!userId) {
      const uuid = crypto.randomUUID();
      window.localStorage.setItem("userId", uuid);
      userId = uuid;
      newUser = true;
    }

    const getAndSetPosts = async () => {
      const currentPosts = await getPosts();
      if (window.location.search.includes("new")) {
        currentPosts.reverse();
      } else {
        // sort by votes
      }
      setPosts(currentPosts.filter((c) => c.content !== ""));
    };

    const getAndSetUsersPostVotes = async () => {
      const uPV = await getUsersPostVotes(userId);
      setUsersPostVotes(uPV);
    };

    getAndSetPosts();
    getAndSetUsersPostVotes();
  }, []);

  const getUserVoteStatusForPost = (postId: string): VoteStatus => {
    const upv =
      usersPostVotes && Array.isArray(usersPostVotes)
        ? usersPostVotes.find((upv) => upv.post_id === postId)
        : null;
    console.log(usersPostVotes);
    if (upv) {
      switch (upv.vote) {
        case 0:
          return "neutral";
        case 1:
          return "positive";
        case 2:
          return "negative";
        default:
          return "neutral";
      }
    }
    return "neutral";
  };

  return (
    <>
      {posts.map((post, idx) => (
        <Post
          key={post.id}
          text={post.content}
          votes={post.votes}
          postId={post.id}
          userVoteStatus={getUserVoteStatusForPost(post.id)}
        />
      ))}
    </>
  );
}
