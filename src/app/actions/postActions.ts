"use server";

import { Post } from "@/types/posts";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  createPostQuery,
  getTotalPostVotesQuery,
  postsWithinDistanceOfPointQuery,
  upsertUserPostVoteQuery,
} from "../../sql/postQueries";

export const getPosts = async (): Promise<Post[]> => {
  const db = (await getCloudflareContext()).env.DB;
  const { results }: { results: Post[] } = await db
    .prepare(`SELECT * FROM posts`)
    .all();
  const resultsWithVotes = await Promise.all(
    results.map(async (result) => {
      const totalVotes = await getTotalPostVotes(result.id);
      return { ...result, votes: totalVotes };
    })
  );
  return resultsWithVotes || [];
};

export const getPostsWithinDistanceOfPoint = async (
  latitude: string,
  longitude: string,
  distanceKm: string
): Promise<Post[]> => {
  const db = (await getCloudflareContext()).env.DB;
  console.log(
    "GET POSTS WITHIN DISTANCE OF POINT: ",
    postsWithinDistanceOfPointQuery,
    latitude,
    longitude,
    distanceKm
  );
  const { results }: { results: Post[] } = await db
    .prepare(postsWithinDistanceOfPointQuery)
    .bind(latitude, longitude, distanceKm)
    .all();
  const resultsWithVotes = await Promise.all(
    results.map(async (result) => {
      const totalVotes = await getTotalPostVotes(result.id);
      return { ...result, votes: totalVotes };
    })
  );
  return resultsWithVotes || [];
};

export const createPost = async (
  post: string,
  latitude: string,
  longitude: string,
  userId: string
) => {
  const uuid = crypto.randomUUID();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(createPostQuery)
    .bind(uuid, post, latitude, longitude, userId)
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

export const upsertUserPostVote = async (
  postId: string,
  userId: string,
  vote: number
) => {
  const uuid = crypto.randomUUID();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(upsertUserPostVoteQuery)
    .bind(uuid, postId, userId, vote)
    .run();
};
