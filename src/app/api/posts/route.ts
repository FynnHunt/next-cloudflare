import { getCloudflareContext } from "@opennextjs/cloudflare";
const posts: string[] = [];

export async function GET() {
  const db = (await getCloudflareContext()).env.DB;
  const { results } = await db.prepare("SELECT * FROM posts");
  console.log(results);
  return Response.json({ results });
}

export async function POST(request: Request) {
  const { post } = await request.json<{ post: string }>();
  posts.push(post);
  return Response.json({ success: true });
}
