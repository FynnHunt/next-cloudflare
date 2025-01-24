"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Vote } from "../../types/posts";

export const createUser = async (userId: string) => {
  const db = (await getCloudflareContext()).env.DB;
  await db.prepare("INSERT INTO users (id) VALUES (?1)").bind(userId).run();
};

export const getUsersPostVotes = async (userId: string): Promise<Vote[]> => {
  const db = (await getCloudflareContext()).env.DB;
  const usersVotes: Vote[] = await db
    .prepare("SELECT * FROM votes WHERE user_id = ?1")
    .bind(userId)
    .all();
  console.log("user votes: ", usersVotes);
  return usersVotes;
};
