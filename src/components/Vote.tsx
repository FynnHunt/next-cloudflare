"use client";
import Icon from "./Icon";
import { useState } from "react";
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
    <div className="vote-control">
      <button
        aria-label="Upvote post"
        aria-pressed={currentVoteStatus === "positive"}
        className={
          currentVoteStatus === "positive" ? "voted voted-up" : "vote-up"
        }
        onClick={() => upVote()}
      >
        <Icon name="up" size={17} />
      </button>
      <span>{currentVotes}</span>
      <button
        aria-label="Downvote post"
        aria-pressed={currentVoteStatus === "negative"}
        className={
          currentVoteStatus === "negative" ? "voted voted-down" : "vote-down"
        }
        onClick={() => downVote()}
      >
        <Icon name="down" size={17} />
      </button>
    </div>
  );
}
