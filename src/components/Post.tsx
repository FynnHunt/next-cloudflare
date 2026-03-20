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
      className="w-full rounded-3xl border border-zinc-700/80 bg-zinc-800/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur transition-colors duration-200 hover:border-lime-300/40 md:max-w-7xl md:p-6"
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="flex-auto">
          <p className="whitespace-pre-wrap text-base leading-7 text-zinc-100 md:text-lg">
            {text}
          </p>
        </div>
        <Vote votes={votes} postId={postId} voteStatus={userVoteStatus} />
      </div>
      <span className="mt-4 inline-block text-sm uppercase tracking-[0.22em] text-zinc-500">
        {date ? getTimeAgo(Number(date)) : "No date :("}
      </span>
    </div>
  );
}
