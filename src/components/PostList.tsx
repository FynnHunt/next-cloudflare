"use client";
import { getPosts } from "@/helpers/posts";
import Post from "./Post";
import { useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const currentPosts = getPosts();
    if (window.location.search.includes("new")) {
      currentPosts.reverse();
    } else {
      // sort by votes
    }
    setPosts(currentPosts);
  }, []);

  return (
    <>
      {posts.map((post, idx) => (
        <Post key={idx} text={post} />
      ))}
    </>
  );
}
