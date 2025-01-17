"use client";

import Image from "next/image";
import { colors } from "../globalStyles";
import { useState } from "react";

type VoteClicked = "positive" | "negative" | "neutral";

export default function Vote() {
  const [currentVote, setCurrentVote] = useState(0);
  const [voteClicked, setVoteClicked] = useState<VoteClicked>("neutral");

  return (
    <div
      className="flex flex-none justify-center items-center flex-col"
      style={{ color: colors.neutral }}
    >
      <button
        onClick={() => {
          setCurrentVote(currentVote + 1);
          setVoteClicked("positive");
        }}
      >
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
      {currentVote}
      <button
        onClick={() => {
          setCurrentVote(currentVote - 1);
          setVoteClicked("negative");
        }}
      >
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
