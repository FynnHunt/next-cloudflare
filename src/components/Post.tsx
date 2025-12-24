import { getTimeAgo } from "@/lib/dateFormatter";
import { VoteStatus } from "../types/posts";
import Vote from "./Vote";

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
  return (
    <div
      className={`bg-zinc-800 w-full md:w-9/12 md:max-w-7xl h-32 rounded-md p-6 h-fit`}
    >
      <div className="flex">
        <div className="flex-auto">{text}</div>
        <Vote votes={votes} postId={postId} voteStatus={userVoteStatus} />
      </div>
      <span style={{ color: "grey" }}>
        {date && getTimeAgo(Number(date))}
      </span>
    </div>
  );
}
