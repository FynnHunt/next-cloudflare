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

export const createPost = async (post: string) => {
  const uuid = crypto.randomUUID();
  const db = (await getCloudflareContext()).env.DB;
  await db
    .prepare(
      "INSERT INTO POSTS (id, content, longitude, latitude, hidden) VALUES (?1, ?2, '1', '1', 'false')"
    )
    .bind(uuid, post)
    .run();
};
