import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import chatBubble from "../assets/images/chatbobble.png";

import classes from "./TaskManagerList.module.css";
type comment = {
  commentText: string | undefined;
  upvotes?: upvote;
};

type upvote = {
  sum: number;
};

type CommentsModalProps = {
  commentArray: comment[];
};

export default function CommentsModal({ commentArray }: CommentsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Button to trigger modal */}
      <button type="button" className={classes.bottomIcon} onClick={openModal}>
        <img src={chatBubble} alt="Comments" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Comments
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {commentArray.map((value, index) => (
                    <li key={index}>{value.commentText}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional: Backdrop for the modal */}
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
