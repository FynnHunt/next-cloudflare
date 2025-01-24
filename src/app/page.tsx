import PostList from "@/components/PostList";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <div className="bg-zinc-900 w-full h-screen flex flex-col items-center p-6 gap-y-3">
      <PostList />
      <Auth />
    </div>
  );
}
