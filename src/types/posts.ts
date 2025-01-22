export type Post = {
  id: string;
  content: string;
  longitude: string;
  latitude: string;
  hidden: string;
};

export type PostsResult = {
  posts: Post[];
};
