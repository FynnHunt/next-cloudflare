"use server";

import { Post } from "@/types/posts";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getPosts = async (): Promise<Post[]> => {
  const db = (await getCloudflareContext()).env.DB;
  const { results }: { results: Post[] } = await db
    .prepare(`SELECT * FROM posts`)
    .all();
  console.log(results);
  return results;
};

export const createPost = async (post: string, userId: string) => {
  const uuid = crypto.randomUUID();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(
      "INSERT INTO POSTS (id, content, votes, longitude, latitude, hidden, user_id) VALUES (?1, ?2, 0, '1', '1', 'false', ?3)"
    )
    .bind(uuid, post, userId)
    .run();
};

export const updatePostVotes = async (postId: string, newVotes: number) => {
  const uuid = crypto.randomUUID();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare("UPDATE POSTS SET votes = ?1 WHERE id = ?2")
    .bind(newVotes, postId)
    .run();
};
