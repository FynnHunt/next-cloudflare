"use client";

import Image from "next/image";
import { useState } from "react";
import { colors } from "../globalStyles";
import { VoteStatus } from "../types/posts";
import { upsertUserPostVote } from "../lib/clientData";

export default function Vote({
  votes,
  postId,
  voteStatus,
}: {
  votes: number;
  postId: string;
  voteStatus: VoteStatus;
}) {
  const [currentVotes, setCurrentVotes] = useState(votes || 0);
  const [currentVoteStatus, setCurrentVoteStatus] = useState(voteStatus);

  const updateVote = async (
    userId: string,
    nextVoteStatus: VoteStatus,
    nextVoteValue: number,
  ) => {
    const previousVotes = currentVotes;
    const previousVoteStatus = currentVoteStatus;

    setCurrentVotes((value) => {
      if (nextVoteStatus === "positive") return value + 1;
      if (nextVoteStatus === "negative") return value - 1;
      if (previousVoteStatus === "positive") return value - 1;
      if (previousVoteStatus === "negative") return value + 1;
      return value;
    });
    setCurrentVoteStatus(nextVoteStatus);

    try {
      await upsertUserPostVote(postId, userId, nextVoteValue);
    } catch (error) {
      console.error("Unable to save vote", error);
      setCurrentVotes(previousVotes);
      setCurrentVoteStatus(previousVoteStatus);
    }
  };

  const upVote = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      if (userId) {
        if (currentVoteStatus === "negative") {
          await updateVote(userId, "neutral", 0);
        } else if (currentVoteStatus === "neutral") {
          await updateVote(userId, "positive", 1);
        }
      }
    }
  };

  const downVote = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      if (userId) {
        if (currentVoteStatus === "positive") {
          await updateVote(userId, "neutral", 0);
        } else if (currentVoteStatus === "neutral") {
          await updateVote(userId, "negative", -1);
        }
      }
    }
  };

  return (
    <div
      className="flex min-w-[72px] flex-none items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-900/70 px-2 py-3"
      style={{ color: colors.neutral }}
    >
      <button
        className="rounded-full p-1 transition-colors hover:bg-zinc-800"
        onClick={() => upVote()}
      >
        <Image
          src={`/icons/up-${
            currentVoteStatus === "positive" ? "positive" : "neutral"
          }.svg`}
          alt="up arrow"
          width={40}
          height={40}
          style={{}}
        />
      </button>
      <span className="my-1 text-lg font-semibold text-zinc-100">
        {currentVotes}
      </span>
      <button
        className="rounded-full p-1 transition-colors hover:bg-zinc-800"
        onClick={() => downVote()}
      >
        <Image
          src={`/icons/down-${
            currentVoteStatus === "negative" ? "negative" : "neutral"
          }.svg`}
          alt="up arrow"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
