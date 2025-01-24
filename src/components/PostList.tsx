"use client";
import { getPosts } from "@/app/actions/postActions";
import Post from "./Post";
import { useEffect, useState } from "react";
import { Post as PostType } from "../types/posts";

export default function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const getAndSetPosts = async () => {
      const currentPosts = await getPosts();
      if (window.location.search.includes("new")) {
        currentPosts.reverse();
      } else {
        // sort by votes
      }
      setPosts(currentPosts.filter((c) => c.content !== ""));
    };
    getAndSetPosts();
  }, []);

  return (
    <>
      {posts.map((post, idx) => (
        <Post
          key={post.id}
          text={post.content}
          votes={post.votes}
          postId={post.id}
        />
      ))}
    </>
  );
}
