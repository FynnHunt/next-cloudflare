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
