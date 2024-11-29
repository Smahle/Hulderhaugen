import { useState } from "react";
import classes from "./TaskManagerList.module.css";
import CommentsModal from "./CommentsModal";
import React from "react";
import { TCard, DraggedCard, Comment, Upvote } from "../types";
import TaskCardModal from "./TaskCardModal";

type TaskArrays = {
  toDoArray: TCard[];
  inProgressArray: TCard[];
  reviewArray: TCard[];
  doneArray: TCard[];
};

export default function TaskManagerList() {
  const [taskArrays, setTaskArrays] = useState<TaskArrays>({
    toDoArray: [
      {
        title: "Design Homepage",
        description: "Create a modern homepage design.",
        deadline: new Date("2024-12-01"),
        comments: [{ commentText: "Add a hero section", upvotes: { sum: 3 } }],
      },
      {
        title: "Write Blog Post",
        description: "Draft the new blog post about React.",
        deadline: new Date("2024-12-05"),
        comments: [{ commentText: "Mention hooks", upvotes: { sum: 5 } }],
      },
    ],
    inProgressArray: [
      {
        title: "Develop Authentication",
        description: "Implement login and signup.",
        deadline: new Date("2024-12-10"),
        comments: [{ commentText: "Use OAuth for third-party login" }],
      },
    ],
    reviewArray: [
      {
        title: "Test Payment System",
        description: "Ensure smooth transactions.",
        deadline: new Date("2024-12-12"),
        comments: [{ commentText: "Test with both credit card and PayPal" }],
      },
    ],
    doneArray: [
      {
        title: "Setup Project",
        description: "Initialize repository and project structure.",
        deadline: new Date("2024-11-20"),
        comments: [{ commentText: "Repo looks good", upvotes: { sum: 10 } }],
      },
    ],
  });

  // Remaining component logic...


  

  const [cardDragged, setCardDragged] = useState<DraggedCard>({
    card: null,
    sourceArray: null,
  });

  // Handle card dragging
  function handleDragStart(e: React.DragEvent, card: TCard, sourceArray: keyof TaskArrays) {
    setCardDragged({ card, sourceArray });
  }

  const handleDrop = (e: React.DragEvent, targetArray: keyof TaskArrays) => {
    e.preventDefault();
    if (!cardDragged?.card || !cardDragged.sourceArray) return;
  
    setTaskArrays((prev) => {
      const sourceArray = cardDragged.sourceArray;
      if (!sourceArray) return prev; // Ensure sourceArray is valid
  
      const updatedSourceArray = prev[sourceArray].filter(
        (item) => item.title !== cardDragged.card?.title
      );
      const updatedTargetArray = [...prev[targetArray], cardDragged.card];
  
      return {
        ...prev,
        [sourceArray]: updatedSourceArray,
        [targetArray]: updatedTargetArray,
      };
    });
  
    setCardDragged({ card: null, sourceArray: null });
  };
  

  // Handle adding a new card
  const addCard = (newCard: TCard, targetArray: keyof TaskArrays) => {
    setTaskArrays((prev) => ({
      ...prev,
      [targetArray]: [...prev[targetArray], newCard],
    }));
  };

  return (
    <div className={classes.container}>
      {Object.entries(taskArrays).map(([arrayKey, cards]) => (
        <div
          key={arrayKey}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, arrayKey as keyof TaskArrays)}
          className={classes.listContainerWithButton}
        >
          <ul className={classes.listContainer}>
            
            {cards.map((card) => (
              <li
                draggable="true"
                onDragStart={(e) => handleDragStart(e, card, arrayKey as keyof TaskArrays)}
                className={classes.card}
                key={card.title}
              >
                <span className={classes.title}>{card.title}</span>
                <span className={classes.text}>{card.description}</span>
                <span className={classes.text}>Deadline: {new Date(card.deadline).toLocaleDateString()}</span>
                <CommentsModal commentArray={card.comments} />
                <TaskCardModal addCard={addCard} targetArray={arrayKey as keyof TaskArrays} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
