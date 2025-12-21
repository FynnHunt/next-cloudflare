"use client";

import { useState } from "react";
import PostModal from "./PostModal";

export default function NewPostButton() {
  const [showComposeModal, setShowComposeModal] = useState(false);

  return (
    <>
      <button className="bg-lime-200 w-full md:w-9/12 md:max-w-7xl h-32 rounded-md p-6 h-fit text-black" onClick={() => setShowComposeModal(true)}>
        New Post
      </button>
      <PostModal
        showModal={showComposeModal}
        setShowModal={setShowComposeModal}
      />
    </>
  );
}
