"use client";
import Post from "./Post";
import Icon from "./Icon";
import { useEffect, useState } from "react";
import { Post as PostType, VoteStatus } from "../types/posts";
import { Vote } from "../types/posts";
import { useLocation } from "../app/hooks/useLocation";
import {
  getPostsWithinDistanceOfPoint,
  getUsersPostVotes,
} from "../lib/clientData";
import { DEV_DATA_UPDATED_EVENT } from "../lib/devLocalData";
import { comparePostDatesNewestFirst } from "../lib/postDates";
type PostListProps = {
  distanceKm: number;
};
export default function PostList({ distanceKm }: PostListProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [usersPostVotes, setUsersPostVotes] = useState<Vote[]>([]);
  const location = useLocation();
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const userId = window.localStorage.getItem("userId");
        if (!userId) {
          return;
        }
        let currentPosts: PostType[] = [];
        if (
          process.env.NODE_ENV === "development" ||
          (location?.location?.latitude !== undefined &&
            location?.location?.longitude !== undefined)
        ) {
          currentPosts = await getPostsWithinDistanceOfPoint(
            String(location?.location?.latitude || ""),
            String(location?.location?.longitude || ""),
            String(distanceKm),
          );
        }
        setUsersPostVotes(await getUsersPostVotes(userId));
        setPosts(currentPosts.filter((post) => post.content !== ""));
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    setSort(window.location.search.includes("hot") ? "hot" : "new");
    loadPosts();

    const handleDevDataUpdate = () => {
      loadPosts();
    };

    window.addEventListener(DEV_DATA_UPDATED_EVENT, handleDevDataUpdate);

    return () => {
      window.removeEventListener(DEV_DATA_UPDATED_EVENT, handleDevDataUpdate);
    };
  }, [distanceKm, location.location]);

  const getUserVoteStatusForPost = (postId: string): VoteStatus => {
    const upv =
      usersPostVotes && Array.isArray(usersPostVotes)
        ? usersPostVotes.find((upv) => upv.post_id === postId)
        : null;
    if (upv) {
      switch (upv?.vote) {
        case 0:
          return "neutral";
        case 1:
          return "positive";
        case -1:
          return "negative";
        default:
          return "neutral";
      }
    }
    return "neutral";
  };
  return (
    <section aria-label="Neighbourhood feed">
      <div className="feed-toolbar">
        <div className="feed-tabs">
          <button
            className={sort === "new" ? "selected" : ""}
            onClick={() => setSort("new")}
            aria-pressed={sort === "new"}
          >
            <Icon name="clock" size={16} />
            Latest
          </button>
          <button
            className={sort === "hot" ? "selected" : ""}
            onClick={() => setSort("hot")}
            aria-pressed={sort === "hot"}
          >
            <Icon name="trend" size={16} />
            Popular
          </button>
        </div>
        <span className="feed-distance">
          <Icon name="pin" size={13} />
          Within {distanceKm} km
        </span>
      </div>
      <div className="post-list">
        {loading ? (
          <div className="empty-state" role="status">
            Finding conversations nearby…
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            We couldn’t load your neighbourhood. Please refresh to try again.
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <Icon name="chat" size={28} />
            <h3>No posts nearby yet.</h3>
            <p>Enable location access to see nearby posts.</p>
          </div>
        ) : (
          [...posts]
            .sort((a, b) =>
              sort === "hot"
                ? b.votes - a.votes
                : comparePostDatesNewestFirst(a, b),
            )
            .map((post) => (
              <Post
                key={post.id}
                text={post.content}
                votes={post.votes}
                postId={post.id}
                userVoteStatus={getUserVoteStatusForPost(post.id)}
                date={post.date}
                comments={post.comments || []}
              />
            ))
        )}
      </div>
    </section>
  );
}
