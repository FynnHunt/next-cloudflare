"use client";

import { useState } from "react";
import PostModal from "./PostModal";

export default function NewPostButton() {
  const [showComposeModal, setShowComposeModal] = useState(false);

  return (
    <>
      <button
        className="mb-4 w-full rounded-3xl border border-lime-300/70 bg-gradient-to-br from-lime-200 via-lime-300 to-lime-400 px-6 py-5 text-left text-black shadow-[0_18px_50px_rgba(163,230,53,0.18)] transition-transform duration-200 hover:-translate-y-0.5 md:mb-6 md:max-w-7xl md:px-8 md:py-6"
        onClick={() => setShowComposeModal(true)}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-700">
              New sighting
            </p>
            <p className="mt-2 text-2xl font-semibold md:text-3xl">
              Start a new post
            </p>
          </div>
          <div className="rounded-full border border-zinc-900/15 bg-amber-100/80 px-4 py-2 text-sm font-medium">
            Compose
          </div>
        </div>
      </button>
      <PostModal
        showModal={showComposeModal}
        setShowModal={setShowComposeModal}
      />
    </>
  );
}
