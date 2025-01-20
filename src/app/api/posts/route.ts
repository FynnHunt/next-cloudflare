const posts: string[] = [];

export async function GET() {
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const { post } = await request.json<{ post: string }>();
  posts.push(post);
  return Response.json({ success: true });
}
