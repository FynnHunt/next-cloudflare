import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const myKv = (await getCloudflareContext()).env.POSTS;
  await myKv.put("foo", "bar");
  const foo = await myKv.get("foo");

  return new Response(foo);
}
