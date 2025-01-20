"use client";

import Image from "next/image";
import ToggleButtons from "./ToggleButtons";
import Modal from "./Modal";
import { useState } from "react";

export default function NavBar() {
  const [showComposeModal, setShowComposeModal] = useState(false);

  return (
    <div className="p-6 border-solid border-2 border-lime-400 w-full bg-lime-400">
      <div className="flex justify-between">
        <div className="flex items-center">
          <button>
            <Image
              src="/icons/hamburger.svg"
              width={40}
              height={40}
              alt="compose icon"
            />
          </button>
        </div>
        <ToggleButtons />
        <div className="flex items-center">
          <button onClick={() => setShowComposeModal(true)}>
            <Image
              src="/icons/compose.svg"
              width={40}
              height={40}
              alt="compose icon"
            />
          </button>
        </div>
      </div>
      <Modal showModal={showComposeModal} setShowModal={setShowComposeModal} />
    </div>
  );
}
