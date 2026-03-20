"use client";

import PostModal from "./PostModal";
import { useState } from "react";
import LocationTitle from "./LocationTitle";

export default function NavBar() {
  const [showComposeModal, setShowComposeModal] = useState(false);

  return (
    <div className="sticky top-0 z-20 w-full border-b border-lime-300/40 bg-lime-300/90 text-zinc-950 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.35em] text-zinc-700">
            Local feed
          </span>
          <LocationTitle />
        </div>
        <div className="hidden rounded-full border border-zinc-900/10 bg-lime-200/70 px-4 py-2 text-sm text-zinc-800 md:block">
          Anonymous posts near you
        </div>
      </div>
      <PostModal
        showModal={showComposeModal}
        setShowModal={setShowComposeModal}
      />
    </div>
  );
}
