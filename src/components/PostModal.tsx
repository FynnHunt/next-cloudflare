"use client";

// I made this file using cursor ai, it's a modal for creating a new post

import Image from "next/image";
import { useState } from "react";
import { useLocation } from "../app/hooks/useLocation";
import { createPost } from "../lib/clientData";

type ModalProps = {
  showModal: boolean;
  setShowModal: (cond: boolean) => void;
};

export default function PostModal({ showModal, setShowModal }: ModalProps) {
  const [postContent, setPostContent] = useState("");
  const location = useLocation();

  const post = async () => {
    if (typeof window !== "undefined") {
      if (location?.location?.latitude && location?.location?.longitude) {
        let userId = window.localStorage.getItem("userId");
        if (!userId) {
          userId = crypto.randomUUID();
          window.localStorage.setItem("userId", userId);
        }

        await createPost(
          postContent,
          location.location.latitude.toString(),
          location.location.longitude.toString(),
          userId,
        );

        if (process.env.NODE_ENV !== "development") {
          window.location.reload();
        }

        setPostContent("");
      } else {
        alert(
          "You must enable location services for this site to create posts."
        );
      }
    }
  };

  return showModal ? (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
          {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
          <div className="relative w-full transform overflow-hidden rounded-3xl border border-lime-300/40 bg-zinc-900 text-left shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition-all sm:my-8 sm:max-w-xl">
            <div className="bg-gradient-to-br from-lime-200 via-lime-300 to-lime-400 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="hidden shrink-0 items-center justify-center sm:flex sm:mx-0 sm:size-10">
                  {/* <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg> */}
                  <Image
                    src="/icons/compose2.svg"
                    width={30}
                    height={30}
                    alt="compose icon"
                  />
                </div>
                <div className="w-full text-left sm:ml-4 sm:mt-0">
                  <h3
                    className="text-xl font-semibold text-zinc-950"
                    id="modal-title"
                  >
                    New post
                  </h3>
                  <p className="mt-1 text-sm text-zinc-800/80">
                    Share something people nearby should know.
                  </p>
                  <div className="mt-3 w-full">
                    <textarea
                      className="h-[140px] w-full rounded-2xl border border-zinc-900/10 bg-amber-50 p-4 text-zinc-900 shadow-inner outline-none transition focus:border-zinc-900/30"
                      id="post"
                      name="post"
                      value={postContent}
                      style={{ resize: "none" }}
                      onChange={(e) => setPostContent(e.target.value)}
                    >
                      New post...
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-lime-200 sm:ml-3 sm:w-auto"
                onClick={async () => {
                  setShowModal(false);
                  await post();
                }}
              >
                Send
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-100 shadow-sm transition hover:bg-zinc-700 sm:mt-0 sm:w-auto"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
