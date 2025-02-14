"use client";
import { getPostsWithinDistanceOfPoint } from "@/app/actions/postActions";
import Post from "./Post";
import { useEffect, useState } from "react";
import { Post as PostType, VoteStatus } from "../types/posts";
import { Vote } from "../types/posts";
import { getUsersPostVotes } from "../app/actions/userActions";
import { useLocation } from "../app/hooks/useLocation";

type PostListProps = {
  distanceKm: number;
};

export default function PostList({ distanceKm }: PostListProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [usersPostVotes, setUsersPostVotes] = useState<Vote[]>([]);
  const location = useLocation();

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    const getAndSetPosts = async () => {
      console.log(location);
      let currentPosts: PostType[] = [];
      if (location?.latitude && location?.longitude) {
        currentPosts = await getPostsWithinDistanceOfPoint(
          String(location.latitude),
          String(location.longitude),
          String(distanceKm)
        );
        console.log("CURRENT POSTS: ", currentPosts);
      }
      if (window.location.search.includes("new")) {
        // sort by most recent
        currentPosts.reverse();
      } else {
        // sort by votes
        currentPosts = currentPosts.sort(({ votes: a }, { votes: b }) => b - a);
      }
      setPosts(currentPosts.filter((c) => c.content !== ""));
    };

    const getAndSetUsersPostVotes = async () => {
      const uPV = await getUsersPostVotes(userId);
      setUsersPostVotes(uPV);
    };

    getAndSetPosts();
    getAndSetUsersPostVotes();
  }, [distanceKm, location]);

  const getUserVoteStatusForPost = (postId: string): VoteStatus => {
    const upv =
      usersPostVotes && Array.isArray(usersPostVotes)
        ? usersPostVotes.find((upv) => upv.post_id === postId)
        : null;
    console.log(usersPostVotes);
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
        />
      ))}
    </>
  );
}
