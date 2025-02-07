"use server";

import { Post } from "@/types/posts";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
  const { results }: { results: Post[] } = await db
    .prepare(
      `SELECT 
    posts.*, 
    (6371 * acos(
        cos(radians(?1)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(?2)) + 
        sin(radians(?1)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) AS distance_km
FROM posts
WHERE 
    (6371 * acos(
        cos(radians(?1)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(?2)) + 
        sin(radians(?1)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) <= ?3
ORDER BY distance_km;`
    )
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
    .prepare(
      "INSERT INTO POSTS (id, content, votes, longitude, latitude, hidden, user_id) VALUES (?1, ?2, 0, ?3, ?4, 'false', ?5)"
    )
    .bind(uuid, post, latitude, longitude, userId)
    .run();
};

export const getTotalPostVotes = async (postId: string): Promise<number> => {
  const db = (await getCloudflareContext()).env.DB;
  const totalVotes = await db
    .prepare(`SELECT SUM(vote) AS total_votes FROM votes WHERE post_id = ?1`)
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
    .prepare(
      "INSERT INTO votes (id, post_id, user_id, vote) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(post_id, user_id) DO UPDATE SET vote = excluded.vote"
    )
    .bind(uuid, postId, userId, vote)
    .run();
};
