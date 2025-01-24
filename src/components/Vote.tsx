"use client";

import Image from "next/image";
import { colors } from "../globalStyles";
import { useState } from "react";
import { updatePostVotes } from "../app/actions/postActions";

type VoteClicked = "positive" | "negative" | "neutral";

export default function Vote({
  votes,
  postId,
}: {
  votes: number;
  postId: string;
}) {
  const [voteClicked, setVoteClicked] = useState<VoteClicked>("neutral");

  const upVote = () => {
    if (voteClicked === "negative") {
      setVoteClicked("neutral");
      updatePostVotes(postId, votes + 1);
    } else if (voteClicked === "neutral") {
      setVoteClicked("positive");
      updatePostVotes(postId, votes + 1);
    }
    window.location.reload();
  };

  const downVote = () => {
    if (voteClicked === "positive") {
      setVoteClicked("neutral");
      updatePostVotes(postId, votes - 1);
    } else if (voteClicked === "neutral") {
      setVoteClicked("negative");
      updatePostVotes(postId, votes - 1);
    }
    window.location.reload();
  };

  return (
    <div
      className="flex flex-none justify-center items-center flex-col"
      style={{ color: colors.neutral }}
    >
      <button onClick={() => upVote()}>
        <Image
          src={`/icons/up-${
            voteClicked === "positive" ? "positive" : "neutral"
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
            voteClicked === "negative" ? "negative" : "neutral"
          }.svg`}
          alt="up arrow"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
