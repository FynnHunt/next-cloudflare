export type Post = {
  id: string;
  content: string;
  longitude: string;
  latitude: string;
  hidden: string;
  votes: number;
  user_id: string;
};

export type PostsResult = {
  posts: Post[];
};

export type Vote = {
  id: string;
  post_id: string;
  user_id: string;
  vote: number;
};

export type VoteStatus = "positive" | "negative" | "neutral";
