import PostList from "@/components/PostList";
import Auth from "@/components/Auth";
import LocationTitle from "@/components/LocationTitle";
import NewPostButton from "@/components/NewPostButton";

export default function Home() {
  return (
    <div className="app-shell">
      <Auth />
      <main className="main-column">
        <section className="page-heading">
          <LocationTitle />
          <h1>Local feed</h1>
        </section>
        <NewPostButton />
        <PostList distanceKm={3} />
      </main>
    </div>
  );
}
