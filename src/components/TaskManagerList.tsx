import { useEffect, useState } from "react";
import classes from "./TaskManagerList.module.css";

import CommentsModal from "./CommentsModal";
import React from "react";
import ModalWithDeck from "./ModalWithDeck";

//TODO: add card poput.
// faktissk ta in data fra poput
// commenetttttscomments commenttttstt butttoons me onclick som gjer funksjon some tekst oog ferfattar.
// kontekstt meny oppe t høgre på hæle brettte. tre prekka åpna kontekstmeny me 3  valg elns
// LAG ICON

//types.ts
//export type TCard = {
 // id: string;
 // title: string;
 // description: string;
  // Add more fields as necessary
//};



type TCard = {
  title: string;
  description: string;
  deadline: Date;
  comments: comment[];
  //TODO: implement comment type
} | null;
type DraggedCard = {
  card: TCard | null;
  sourceArray?: string | null;
};
type upvote = {
  sum: number;
};
type comment = {
  commentText: string | undefined;
  upvotes?: upvote;
};

export default function TaskManagerList() {
  const [toDoArray, setToDoArray] = useState<TCard[]>([
    {
      title: "UI workflow AB Test",
      description: "denne teksten er utfyldene og gjjemmes",
      comments: [
        { commentText: "todoarraycomment" },
        { commentText: "todoarraqwerqweqweqweycomment" },
        { commentText: "todoarrayxcccomment" },
        { commentText: "todoarraycomment" },
      ],
      deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
    },
    {
      title: "Enterprise/wide static service/desk",
      description: "hjkasdfhbjkasdf ghjsdfaghjf asdghjkasdfhjkgasdf ghjk",
      deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
      comments: [{ commentText: "asdasd" }],
    },
  ]);
  const [inProgressArray, setInProgressArray] = useState<TCard[]>([
    {
      title: "mer fitte mindre kuuuuuuuuuuuuuuuk",
      description: "asease",
      deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
      comments: [{ commentText: "asdasd" }],
    },
  ]);
  const [reviewArray, setReviewArray] = useState<TCard[]>([
    {
      title: "bli 10x bedre paa ta her og gg",
      description: "asease",
      deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
      comments: [{ commentText: "asdasd" }],
    },
  ]);
  const [doneArray, setDoneArray] = useState<TCard[]>([
    {
      title: "kun 5%!!!",
      description: "asease",
      deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
      comments: [{ commentText: "asdasd" }],
    },
  ]);

  const [comments, setComments] = useState<comment[]>([]);
  const [currentVote, setCurrentVote] = useState(1);

  const [cardDragged, setCardDragged] = useState<DraggedCard>({
    card: null,
    sourceArray: null,
  });

  function handleDragStart(
    e: React.DragEvent,
    card: TCard,
    sourceArray: string
  ) {
    // Set data on the drag event (you can use different formats like 'text' or 'text/plain')
    setCardDragged({ card: card, sourceArray: sourceArray });
  }

  function upvote() {
    // +1 fer kvar tr;kk, mins fer andre v'g.
    // on click
    setCurrentVote(currentVote + 1);
  }
  function downvote() {
    setCurrentVote(currentVote - 1);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // This is necessary to allow dropping and also handledrop.
  };
  const handleDrop = (e: React.DragEvent, endArray: string) => {
    e.preventDefault();
    if (!cardDragged?.card) return;
    if (cardDragged?.sourceArray == "toDoArray") {
      if (endArray == "inProgressArray") {
        setInProgressArray([...inProgressArray, cardDragged.card]);
        setToDoArray(
          toDoArray?.filter((item) => item?.title !== cardDragged.card?.title)
        ); // remove card from prev array

        //add card to new array
      } else if (endArray == "reviewArray") {
        setReviewArray([...reviewArray, cardDragged.card]);
        setToDoArray(
          toDoArray?.filter((item) => item?.title !== cardDragged.card?.title)
        ); // remove card from prev array
      } else if (endArray == "doneArray") {
        setDoneArray([...doneArray, cardDragged.card]);
        setToDoArray(
          toDoArray?.filter((item) => item?.title !== cardDragged.card?.title)
        ); // remove card from prev array
      }
    } else if (cardDragged?.sourceArray == "inProgressArray") {
      if (endArray == "toDoArray") {
        setToDoArray([...toDoArray, cardDragged.card]);
        setInProgressArray(
          inProgressArray?.filter(
            (item) => item?.title !== cardDragged.card?.title
          )
        );
      } else if (endArray == "reviewArray") {
        setReviewArray([...reviewArray, cardDragged.card]);
        setInProgressArray(
          inProgressArray?.filter(
            (item) => item?.title !== cardDragged.card?.title
          )
        );
      } else if (endArray == "doneArray") {
        setDoneArray([...doneArray, cardDragged.card]);
        setInProgressArray(
          inProgressArray?.filter(
            (item) => item?.title !== cardDragged.card?.title
          )
        );
      }
    } else if (cardDragged?.sourceArray == "reviewArray") {
      if (endArray == "toDoArray") {
        setToDoArray([...toDoArray, cardDragged.card]);
        setReviewArray(
          reviewArray?.filter((item) => item?.title !== cardDragged.card?.title)
        );
      } else if (endArray == "inProgressArray") {
        setInProgressArray([...inProgressArray, cardDragged.card]);
        setReviewArray(
          reviewArray?.filter((item) => item?.title !== cardDragged.card?.title)
        );
      } else if (endArray == "doneArray") {
        setDoneArray([...doneArray, cardDragged.card]);
        setReviewArray(
          reviewArray?.filter((item) => item?.title !== cardDragged.card?.title)
        );
      }
    } else if (cardDragged?.sourceArray == "doneArray") {
      if (endArray == "toDoArray") {
        setToDoArray([...toDoArray, cardDragged.card]);
        setDoneArray(
          doneArray?.filter((item) => item?.title !== cardDragged.card?.title)
        );
      } else if (endArray == "inProgressArray") {
        setInProgressArray([...inProgressArray, cardDragged.card]);
        setDoneArray(
          doneArray?.filter((item) => item?.title !== cardDragged.card?.title)
        );
      } else if (endArray == "reviewArray") {
        setReviewArray([...reviewArray, cardDragged.card]);
        setDoneArray(
          doneArray?.filter((item) => item?.title !== cardDragged.card?.title)
        );
      }
    }
  };

  return (
    <div className={classes.container}>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "toDoArray")}
        className={classes.listContainerWithButton}
      >
        <ul className={classes.listContainer}>
          {toDoArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "toDoArray")}
              className={classes.card}
              key={card?.title}
            >
              <span className={classes.title}>{card?.title}</span>
              <CommentsModal commentArray={card?.comments ?? []} />{" "}
              <ModalWithDeck cards={toDoArray} />
            </li>
          ))}
        </ul>


      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "inProgressArray")}
        className={classes.listContainerWithButton}
      >
        <ul className={classes.listContainer}>
          {inProgressArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "inProgressArray")}
              className={classes.card}
              key={card?.title}
            >
              <span className={classes.title}>{card?.title}</span>{" "}
              <CommentsModal commentArray={card?.comments ?? []} />{" "}
              <ModalWithDeck cards={inProgressArray} />
            </li>
          ))}
        </ul>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "reviewArray")}
        className={classes.listContainerWithButton}
      >
        <ul className={classes.listContainer}>
          {reviewArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "reviewArray")}
              className={classes.card}
              key={card?.title}
            >
              {" "}
              <span className={classes.title}>{card?.title}</span>{" "}
              <CommentsModal commentArray={card?.comments ?? []} />{" "}
              <ModalWithDeck cards={reviewArray} />
            </li>
          ))}
        </ul>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "doneArray")}
        className={classes.listContainerWithButton}
      >
        <ul className={classes.listContainer}>
          {doneArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "doneArray")}
              className={classes.card}
              key={card?.title}
            >
              {" "}
              <span className={classes.title}>{card?.title}</span>{" "}
              <CommentsModal commentArray={card?.comments ?? []} />{" "}
              <ModalWithDeck cards={doneArray} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
