"use server";

import { Comment, Post } from "@/types/posts";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  createPostQuery,
  createCommentQuery,
  getTotalPostVotesQuery,
  getPostCommentsQuery,
  postsWithinDistanceOfPointQuery,
  upsertUserPostVoteQuery,
} from "../../sql/postQueries";
import { mockPosts } from "../../lib/testData";

export const getPosts = async (): Promise<Post[]> => {
  const db = (await getCloudflareContext()).env.DB;
  const { results }: { results: Post[] } = await db
    .prepare(`SELECT * FROM posts;`)
    .all();
  const resultsWithVotes = await Promise.all(
    results.map(async (result) => {
      const totalVotes = await getTotalPostVotes(result.id);
      const comments = await getPostComments(result.id);
      return { ...result, votes: totalVotes, comments };
    }),
  );
  return resultsWithVotes || [];
};

export const getPostsWithinDistanceOfPoint = async (
  latitude: string,
  longitude: string,
  distanceKm: string,
): Promise<Post[]> => {
  // if running in dev mode use test posts
  if (process.env.NODE_ENV === "development") return mockPosts;

  const db = (await getCloudflareContext()).env.DB;
  const { results }: { results: Post[] } = await db
    .prepare(postsWithinDistanceOfPointQuery)
    .bind(Number(latitude), Number(longitude), Number(distanceKm))
    .all();
  const resultsWithVotes = await Promise.all(
    results.map(async (result) => {
      const totalVotes = await getTotalPostVotes(result.id);
      const comments = await getPostComments(result.id);
      return { ...result, votes: totalVotes, comments };
    }),
  );
  return resultsWithVotes || [];
};

export const createPost = async (
  post: string,
  latitude: string,
  longitude: string,
  userId: string,
) => {
  const uuid = crypto.randomUUID();
  const date = Date.now();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(createPostQuery)
    .bind(uuid, post, latitude, longitude, userId, date)
    .run();
};

export const getTotalPostVotes = async (postId: string): Promise<number> => {
  const db = (await getCloudflareContext()).env.DB;
  const totalVotes = await db
    .prepare(getTotalPostVotesQuery)
    .bind(postId)
    .all();
  if (totalVotes?.results?.length > 0) {
    return totalVotes.results[0].total_votes;
  }
  return 0;
};

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  const db = (await getCloudflareContext()).env.DB;
  const { results }: { results: Comment[] } = await db
    .prepare(getPostCommentsQuery)
    .bind(postId)
    .all();
  return results || [];
};

export const createComment = async (
  postId: string,
  userId: string,
  content: string,
): Promise<Comment> => {
  const trimmedContent = content.trim();
  if (!trimmedContent) throw new Error("Comment content is required");
  const comment: Comment = {
    id: crypto.randomUUID(),
    user_id: userId,
    post_id: postId,
    content: trimmedContent,
  };
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(createCommentQuery)
    .bind(comment.id, comment.user_id, comment.post_id, comment.content)
    .run();
  return comment;
};

export const upsertUserPostVote = async (
  postId: string,
  userId: string,
  vote: number,
) => {
  const uuid = crypto.randomUUID();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(upsertUserPostVoteQuery)
    .bind(uuid, postId, userId, vote)
    .run();
};
