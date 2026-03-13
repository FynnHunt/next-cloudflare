"use client";
import Post from "./Post";
import { useEffect, useState } from "react";
import { Post as PostType, VoteStatus } from "../types/posts";
import { Vote } from "../types/posts";
import { useLocation } from "../app/hooks/useLocation";
import { getPostsWithinDistanceOfPoint, getUsersPostVotes } from "../lib/clientData";
import { DEV_DATA_UPDATED_EVENT } from "../lib/devLocalData";

type PostListProps = {
  distanceKm: number;
};

export default function PostList({ distanceKm }: PostListProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [usersPostVotes, setUsersPostVotes] = useState<Vote[]>([]);
  const location = useLocation();

  useEffect(() => {
    const loadPosts = async () => {
      const userId = window.localStorage.getItem("userId");

      if (!userId) {
        return;
      }

      let currentPosts: PostType[] = [];

      if (
        process.env.NODE_ENV === "development" ||
        (location?.location?.latitude && location?.location?.longitude)
      ) {
        currentPosts = await getPostsWithinDistanceOfPoint(
          String(location?.location?.latitude || ""),
          String(location?.location?.longitude || ""),
          String(distanceKm),
        );
      }

      setUsersPostVotes(await getUsersPostVotes(userId));

      if (window.location.search.includes("hot")) {
        currentPosts = currentPosts.sort(({ votes: a }, { votes: b }) => b - a);
      }

      setPosts(currentPosts.filter((post) => post.content !== ""));
    };

    loadPosts();

    const handleDevDataUpdate = () => {
      loadPosts();
    };

    window.addEventListener(DEV_DATA_UPDATED_EVENT, handleDevDataUpdate);

    return () => {
      window.removeEventListener(DEV_DATA_UPDATED_EVENT, handleDevDataUpdate);
    };
  }, [distanceKm, location.location]);

  const getUserVoteStatusForPost = (postId: string): VoteStatus => {
    const upv =
      usersPostVotes && Array.isArray(usersPostVotes)
        ? usersPostVotes.find((upv) => upv.post_id === postId)
        : null;
    if (upv) {
      switch (upv?.vote) {
        case 0:
          return "neutral";
        case 1:
          return "positive";
        case -1:
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
          date={post.date}
        />
      ))}
    </>
  );
}
