export type Post = {
  id: string;
  content: string;
  longitude: string;
  latitude: string;
  hidden: string;
  votes: number;
};

export type PostsResult = {
  posts: Post[];
};
