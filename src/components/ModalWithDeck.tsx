import React, { useState } from "react";
import Modal from "./ModalWithDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import classes from "./Modal.module.css";

type TCard = {
  title: string;
  description: string;
  deadline: Date;
  comments: comment[];
} | null;

type upvote = {
  sum: number;
};

type comment = {
  commentText: string | undefined;
  upvotes?: upvote;
};

const ModalWithDeck: React.FC<{ cards: TCard[] }> = ({ cards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Open and close modal functions
  const openModal = () => {
    console.log("Opening Modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing Modal");
    setIsModalOpen(false);
  };

  // Handle form data change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! Thank you.");
    closeModal(); // Close the modal after form submission
  };

  return (
    <div>
      <button onClick={openModal}>+ add card</button>

      {/* Conditional rendering of modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Task Manager Cards</h1>
                  <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <ul>
                    {cards?.map((card, index) => (
                      <li key={index}>
                        <h3>{card?.title}</h3>
                        <p>{card?.description}</p>
                        <ul>
                          {card?.comments.map((comment, i) => (
                            <li key={i}>{comment.commentText}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>

                  {/* Form for submitting messages */}
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <br />

                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <br />

                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <br />

                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default ModalWithDeck;
