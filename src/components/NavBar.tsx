"use client";

import Image from "next/image";
import ToggleButtons from "./ToggleButtons";
import PostModal from "./PostModal";
import { useState } from "react";
import LocationTitle from "./LocationTitle";

export default function NavBar() {
  const [showComposeModal, setShowComposeModal] = useState(false);

  return (
    <div className="p-6 border-solid border-2 border-lime-400 w-full bg-lime-400">
      <div className="flex justify-between">
        <div className="flex items-center">
          <button>
            <Image
              src="/icons/goose2.svg"
              width={40}
              height={40}
              alt="compose icon"
            />
          </button>
        </div>
        {/* <ToggleButtons /> */}
        <LocationTitle />
        <div className="flex items-center">
          <button onClick={() => setShowComposeModal(true)}>
            <Image
              src="/icons/compose2.svg"
              width={30}
              height={30}
              alt="compose icon"
            />
          </button>
        </div>
      </div>
      <PostModal
        showModal={showComposeModal}
        setShowModal={setShowComposeModal}
      />
    </div>
  );
}
