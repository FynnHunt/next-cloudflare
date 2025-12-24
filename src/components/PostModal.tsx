"use client";

// I made this file using cursor ai, it's a modal for creating a new post

import { createPost } from "@/app/actions/postActions";
import Image from "next/image";
import { useState } from "react";
import { useLocation } from "../app/hooks/useLocation";

type ModalProps = {
  showModal: boolean;
  setShowModal: (cond: boolean) => void;
};

export default function PostModal({ showModal, setShowModal }: ModalProps) {
  const [postContent, setPostContent] = useState("");
  const location = useLocation();

  const post = () => {
    if (typeof window !== "undefined") {
      if (location?.location?.latitude && location?.location?.longitude) {
        createPost(
          postContent,
          location.location.latitude.toString(),
          location.location.longitude.toString(),
          window.localStorage.getItem("userId") || crypto.randomUUID()
        );
        window.location.reload();
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
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:my-8 sm:max-w-xl">
            <div className="bg-lime-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-[200px]">
              <div className="sm:flex sm:items-start">
                <div className="hidden sm:flex sm:mx-0 sm:size-10 shrink-0 items-center justify-center">
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
                <div className="text-left w-full sm:ml-4 sm:mt-0">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    New post
                  </h3>
                  <div className="mt-2 w-full">
                    <textarea
                      className="w-full bg-amber-50 text-zinc-900 p-3 h-[120px]"
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
            <div className="bg-lime-400 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="text-zinc-900 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 sm:ml-3 sm:w-auto"
                onClick={() => {
                  setShowModal(false);
                  post();
                }}
              >
                Send
              </button>
              <button
                type="button"
                className="text-zinc-900 mt-3 inline-flex w-full justify-center rounded-md bg-amber-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
