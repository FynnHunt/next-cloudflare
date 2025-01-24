"use client";

import Image from "next/image";
import { colors } from "../globalStyles";
import { upsertUserPostVote } from "../app/actions/postActions";
import { VoteStatus } from "../types/posts";

export default function Vote({
  votes,
  postId,
  voteStatus,
}: {
  votes: number;
  postId: string;
  voteStatus: VoteStatus;
}) {
  const upVote = () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      if (userId) {
        upsertUserPostVote(postId, userId, 1);
        window.location.reload();
      }
    }
  };

  const downVote = () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      if (userId) {
        upsertUserPostVote(postId, userId, -1);
        window.location.reload();
      }
    }
  };

  return (
    <div
      className="flex flex-none justify-center items-center flex-col"
      style={{ color: colors.neutral }}
    >
      <button onClick={() => upVote()}>
        <Image
          src={`/icons/up-${
            voteStatus === "positive" ? "positive" : "neutral"
          }.svg`}
          alt="up arrow"
          width={40}
          height={40}
          style={{}}
        />
      </button>
      {votes}
      <button onClick={() => downVote()}>
        <Image
          src={`/icons/down-${
            voteStatus === "negative" ? "negative" : "neutral"
          }.svg`}
          alt="up arrow"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
