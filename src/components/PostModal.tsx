"use client";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "../app/hooks/useLocation";
import { createPost } from "../lib/clientData";
import Icon from "./Icon";
type ModalProps = {
  showModal: boolean;
  setShowModal: (cond: boolean) => void;
};
export default function PostModal({ showModal, setShowModal }: ModalProps) {
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const dialog = useRef<HTMLDialogElement>(null);
  const { location } = useLocation();

  useEffect(() => {
    if (showModal) {
      dialog.current?.showModal();
      setError("");
    } else dialog.current?.close();
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showModal]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!content.trim() || pending) return;

    if (!location) {
      setError(
        "Enable location access in your browser to share with neighbours.",
      );
      return;
    }

    setPending(true);
    setError("");

    try {
      let userId = window.localStorage.getItem("userId");

      if (!userId) {
        userId = crypto.randomUUID();
        window.localStorage.setItem("userId", userId);
      }

      await createPost(
        content.trim(),
        String(location.latitude),
        String(location.longitude),
        userId,
      );

      setContent("");
      setShowModal(false);

      if (process.env.NODE_ENV !== "development") window.location.reload();
    } catch {
      setError("Your post couldn’t be shared. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="post-dialog"
      aria-labelledby="modal-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!pending) setShowModal(false);
      }}
      onClick={(event) => {
        if (event.target === dialog.current && !pending) setShowModal(false);
      }}
    >
      <form onSubmit={submit}>
        <div className="dialog-heading">
          <h2 id="modal-title">New post</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Close dialog"
            disabled={pending}
            onClick={() => setShowModal(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        <label htmlFor="post-content">
          What’s happening in your neighbourhood?
        </label>
        <textarea
          id="post-content"
          autoFocus
          value={content}
          maxLength={1000}
          placeholder="Write your post…"
          onChange={(event) => setContent(event.target.value)}
          disabled={pending}
        />
        <div className="dialog-detail">
          <span>
            <Icon name="shield" size={13} />
            Posted anonymously · Within 3 km
          </span>
          <span>{content.length}/1,000</span>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button
            type="button"
            className="secondary-button"
            disabled={pending}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="primary-button"
            disabled={pending || !content.trim()}
          >
            {pending ? "Sharing…" : "Post"}
            <Icon name="arrow" size={15} />
          </button>
        </div>
      </form>
    </dialog>
  );
}
