import PostList from "@/components/PostList";
import Auth from "../components/Auth";
import LocationTitle from "@/components/LocationTitle";
import ToggleButtons from "@/components/ToggleButtons";
import NewPostButton from "@/components/NewPostButton";

export default function Home() {
  return (
    <div className="bg-zinc-900 w-full flex flex-col items-center p-6 gap-y-3">
      {/* <ToggleButtons /> */}
      <NewPostButton />
      <PostList distanceKm={3} />
      <Auth />
    </div>
  );
}
