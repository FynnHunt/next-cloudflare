import PostList from "@/components/PostList";
import Auth from "../components/Auth";
import LocationTitle from "@/components/LocationTitle";
import ToggleButtons from "@/components/ToggleButtons";
import NewPostButton from "@/components/NewPostButton";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center px-4 pb-10 pt-6 md:px-8 md:pb-16 md:pt-8">
      {/* <ToggleButtons /> */}
      <NewPostButton />
      <PostList distanceKm={3} />
      <Auth />
    </div>
  );
}
