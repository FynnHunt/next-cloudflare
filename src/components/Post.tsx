"use client";

import { getTimeAgo } from "@/lib/dateFormatter";
import { parsePostDate } from "@/lib/postDates";
import { Comment, VoteStatus } from "../types/posts";
import Vote from "./Vote";
import Icon from "./Icon";
import { FormEvent, useEffect, useState } from "react";
import { createComment } from "@/lib/clientData";
import { useLocation } from "@/app/hooks/useLocation";

type PostProps = {
  text: string;
  votes: number;
  postId: string;
  userVoteStatus: VoteStatus;
  date: string;
  comments: Comment[];
};

export default function Post({
  text,
  votes,
  postId,
  userVoteStatus,
  date,
  comments,
}: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  //   const { locationName } = useLocation();
  useEffect(() => setLocalComments(comments), [comments]);

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = commentContent.trim();
    if (!content || submittingComment) return;

    const userId = window.localStorage.getItem("userId");
    if (!userId) {
      setCommentError(
        "Your anonymous account is not ready. Refresh and try again.",
      );
      return;
    }

    setSubmittingComment(true);
    setCommentError("");
    try {
      const comment = await createComment(postId, userId, content);
      setLocalComments((current) =>
        current.some((item) => item.id === comment.id)
          ? current
          : [...current, comment],
      );
      setCommentContent("");
      setShowCommentForm(false);
      setShowComments(true);
    } catch {
      setCommentError("Your comment couldn’t be posted. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };
  const timestamp = parsePostDate(date);
  const tint =
    Array.from(postId).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className={"avatar tint-" + tint}>
          <Icon name={["chat", "spark", "home", "pin"][tint]} size={19} />
        </span>
        <div>
          <span className="post-author">A neighbour</span>
          <span className="post-time">
            {timestamp !== null ? getTimeAgo(timestamp) : "Date unavailable"}
          </span>
        </div>
        {/* <span className="post-local">
          <Icon name="pin" size={12} />
          {locationName}
        </span> */}
      </div>
      <p className="post-content">{text}</p>
      <div className="post-footer">
        <Vote votes={votes} postId={postId} voteStatus={userVoteStatus} />
        <div className="comment-actions">
          {localComments.length > 0 && (
            <button
              type="button"
              className="comment-toggle"
              aria-expanded={showComments}
              aria-controls={`comments-${postId}`}
              onClick={() => setShowComments((visible) => !visible)}
            >
              <Icon name="chat" size={14} />
              {localComments.length}{" "}
              {localComments.length === 1 ? "comment" : "comments"}
            </button>
          )}
          <button
            type="button"
            className="add-comment-button"
            aria-expanded={showCommentForm}
            aria-controls={`comment-form-${postId}`}
            onClick={() => {
              setShowCommentForm((visible) => !visible);
              setCommentError("");
            }}
          >
            Add comment
          </button>
        </div>
      </div>
      {showCommentForm && (
        <form
          className="comment-form"
          id={`comment-form-${postId}`}
          onSubmit={submitComment}
        >
          <label htmlFor={`comment-content-${postId}`}>Your comment</label>
          <textarea
            id={`comment-content-${postId}`}
            value={commentContent}
            maxLength={1000}
            autoFocus
            disabled={submittingComment}
            placeholder="Write a comment…"
            onChange={(event) => setCommentContent(event.target.value)}
          />
          {commentError && (
            <p className="comment-error" role="alert">
              {commentError}
            </p>
          )}
          <div className="comment-form-footer">
            <span>{commentContent.length}/1,000</span>
            <button
              type="button"
              className="secondary-button"
              disabled={submittingComment}
              onClick={() => setShowCommentForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={submittingComment || !commentContent.trim()}
            >
              {submittingComment ? "Posting…" : "Post comment"}
            </button>
          </div>
        </form>
      )}
      {showComments && localComments.length > 0 && (
        <div className="comments-list" id={`comments-${postId}`}>
          {localComments.map((comment) => (
            <div className="comment" key={comment.id}>
              <span className="comment-avatar" aria-hidden="true">
                <Icon name="chat" size={14} />
              </span>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
