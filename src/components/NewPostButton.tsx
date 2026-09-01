"use client";
import { useState } from "react";
import PostModal from "./PostModal";
import Icon from "./Icon";
export default function NewPostButton({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className={compact ? "primary-button" : "compose-card"}
        onClick={() => setShow(true)}
      >
        {compact ? (
          <>
            <Icon name="plus" size={17} />
            New post
          </>
        ) : (
          <>
            <span className="avatar compose-avatar">
              <Icon name="chat" />
            </span>
            <span className="compose-prompt">Start a new post</span>
            <span className="compose-plus">
              <Icon name="plus" />
            </span>
          </>
        )}
      </button>
      <PostModal showModal={show} setShowModal={setShow} />
    </>
  );
}
