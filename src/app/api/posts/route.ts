import { getCloudflareContext } from "@opennextjs/cloudflare";
const posts: string[] = [];

export async function GET() {
  const db = (await getCloudflareContext()).env.DB;
  const returnValue = await db.exec(`SELECT * FROM posts`);
  console.log(returnValue);
  return Response.json({ posts: returnValue });
}

export async function POST(request: Request) {
  const { post } = await request.json<{ post: string }>();
  posts.push(post);
  return Response.json({ success: true });
}
