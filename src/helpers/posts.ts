const END_POST = "#ENDPOST#";

export const getPosts = (): string[] => {
  // const posts = fetch("http://localhost:3000/api/posts");
  // console.log(JSON.stringify(posts));
  // return posts;

  let posts = "";
  if (typeof window !== "undefined") {
    posts = window.localStorage.getItem("posts") || "";
  }
  return posts.split(END_POST).filter((post) => post !== "");
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
