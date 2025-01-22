import { PostsResult } from "@/types/posts";

const END_POST = "#ENDPOST#";

export const getPosts = async (): Promise<string[]> => {
  const results = await fetch("http://localhost:3000/api/posts");
  const postsResult = await results.json<PostsResult>();
  let postContents: string[] = [];
  if (postsResult) {
    postContents = postsResult.posts.map((post) => post.content);
  }
  return postContents;

  // let posts = "";
  // if (typeof window !== "undefined") {
  //   posts = window.localStorage.getItem("posts") || "";
  // }
  // return posts.split(END_POST).filter((post) => post !== "");
};

export const createPost = (post: string) => {
  // fetch("http://localhost:3000/api/posts", {
  //   method: "POST",
  //   body: JSON.stringify({ post }),
  // });

  if (typeof window !== "undefined") {
    const currentPosts = window.localStorage.getItem("posts") || "";
    const newPosts = currentPosts + post + END_POST;
    window.localStorage.setItem("posts", newPosts);
  }
};
