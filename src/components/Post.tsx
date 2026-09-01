import { getTimeAgo } from "@/lib/dateFormatter";
import { VoteStatus } from "../types/posts";
import Vote from "./Vote";
import Icon from "./Icon";
type PostProps = {
  text: string;
  votes: number;
  postId: string;
  userVoteStatus: VoteStatus;
  date: string;
};
export default function Post({
  text,
  votes,
  postId,
  userVoteStatus,
  date,
}: PostProps) {
  const tint =
    Array.from(postId).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className={"avatar tint-" + tint}>
          <Icon name={["chat", "spark", "home", "pin"][tint]} size={19} />
        </span>
        <div>
          <span className="post-author">A neighbor</span>
          <span className="post-time">
            {date ? getTimeAgo(Number(date)) : "Nearby"}
          </span>
        </div>
        <span className="post-local">
          <Icon name="pin" size={12} />
          Nearby
        </span>
      </div>
      <p className="post-content">{text}</p>
      <div className="post-footer">
        <Vote votes={votes} postId={postId} voteStatus={userVoteStatus} />
        <span className="anonymous-label">
          <Icon name="shield" size={13} />
          Anonymous
        </span>
      </div>
    </article>
  );
}
