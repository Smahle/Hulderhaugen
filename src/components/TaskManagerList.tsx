import { useEffect, useState } from "react";
import classes from "./TaskManagerList.module.css";

type TCard = {
  title: string;
  description: string;
  deadline: Date;
  comments: string;
  //TODO: implement comment type
} | null;
type DraggedCard = {
  card: TCard | null;
  sourceArray?: string | null;
};

export default function TaskManagerList() {
  const [toDoArray, setToDoArray] = useState<TCard[]>([]);
  const [inProgressArray, setInProgressArray] = useState<TCard[]>([]);
  const [reviewArray, setReviewArray] = useState<TCard[]>([]);
  const [doneArray, setDoneArray] = useState<TCard[]>([]);

  const [cardDragged, setCardDragged] = useState<DraggedCard>({
    card: null,
    sourceArray: null,
  });

  useEffect(() => {
    console.log("faktisk todo " + toDoArray);
  }, [toDoArray]);

  useEffect(() => {
    setToDoArray([
      {
        title: "a",
        description: "asease",
        deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
        comments: "asdasd",
      },
      {
        title: "b",
        description: "asease",
        deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
        comments: "asdasd",
      },
    ]);
    setInProgressArray([
      {
        title: "c",
        description: "asease",
        deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
        comments: "asdasd",
      },
    ]);
    setReviewArray([
      {
        title: "d",
        description: "asease",
        deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
        comments: "asdasd",
      },
    ]);
    setDoneArray([
      {
        title: "e",
        description: "asease",
        deadline: new Date(2018, 5, 5, 17, 23, 42, 11),
        comments: "asdasd",
      },
    ]);
  }, []);
  function handleDragStart(
    e: React.DragEvent,
    card: TCard,
    sourceArray: string
  ) {
    // Set data on the drag event (you can use different formats like 'text' or 'text/plain')
    setCardDragged({ card: card, sourceArray: sourceArray });
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // This is necessary to allow dropping and also handledrop.
  };
  const handleDrop = (e: React.DragEvent, endArray: string) => {
    e.preventDefault();
    if (!cardDragged?.card) return;
    if (cardDragged?.sourceArray == "toDoArray") {
      setToDoArray(
        toDoArray?.filter((item) => item?.title !== cardDragged.card?.title)
      ); // remove card from prev array

      if (endArray == "inProgressArray") {
        setInProgressArray([...inProgressArray, cardDragged.card]);
        //add card to new array
      } else if (endArray == "reviewArray") {
        setReviewArray([...reviewArray, cardDragged.card]);
      } else if (endArray == "doneArray") {
        setDoneArray([...doneArray, cardDragged.card]);
      }
    } else if (cardDragged?.sourceArray == "inProgressArray") {
      setInProgressArray(
        inProgressArray?.filter(
          (item) => item?.title !== cardDragged.card?.title
        )
      );
      console.log("proogressarrauy" + inProgressArray);
      if (endArray == "toDoArray") {
        setToDoArray([...toDoArray, cardDragged.card]);
      } else if (endArray == "reviewArray") {
        setReviewArray([...reviewArray, cardDragged.card]);
      } else if (endArray == "doneArray") {
        setDoneArray([...doneArray, cardDragged.card]);
      }
    } else if (cardDragged?.sourceArray == "reviewArray") {
      setReviewArray(
        reviewArray?.filter((item) => item?.title !== cardDragged.card?.title)
      );
      console.log("rewewarray" + reviewArray);
      if (endArray == "toDoArray") {
        setToDoArray([...toDoArray, cardDragged.card]);
      } else if (endArray == "inProgressArray") {
        setInProgressArray([...inProgressArray, cardDragged.card]);
      } else if (endArray == "doneArray") {
        setDoneArray([...doneArray, cardDragged.card]);
      }
    } else if (cardDragged?.sourceArray == "doneArray") {
      setDoneArray(
        doneArray?.filter((item) => item?.title !== cardDragged.card?.title)
      );
      console.log("doonearray" + doneArray);
      if (endArray == "toDoArray") {
        setToDoArray([...toDoArray, cardDragged.card]);
      } else if (endArray == "inProgressArray") {
        setInProgressArray([...inProgressArray, cardDragged.card]);
      } else if (endArray == "reviewArray") {
        setReviewArray([...reviewArray, cardDragged.card]);
      }
    }
  };
  return (
    <div className={classes.container}>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "toDoArray")}
        style={{ height: "200px", background: "lightblue" }}
        className={classes.listContainer}
      >
        <ul>
          {toDoArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "toDoArray")}
              className={classes.card}
              key={card?.title}
            >
              <button>{card?.title}</button>
            </li>
          ))}
        </ul>
        <button>+ add card</button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "inProgressArray")}
        style={{ height: "200px", background: "lightblue" }}
        className={classes.listContainer}
      >
        <ul className={classes.card}>
          {inProgressArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "inProgressArray")}
              className={classes.card}
              key={card?.title}
            >
              <button>{card?.title}</button>
            </li>
          ))}
        </ul>
        <button>+ add card</button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "reviewArray")}
        style={{ height: "200px", background: "lightblue" }}
        className={classes.listContainer}
      >
        <ul className={classes.card}>
          {reviewArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "reviewArray")}
              className={classes.card}
              key={card?.title}
            >
              <button>{card?.title}</button>
            </li>
          ))}
        </ul>
        <button>+ add card</button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "doneArray")}
        style={{ height: "200px", background: "lightblue" }}
        className={classes.listContainer}
      >
        <ul className={classes.card}>
          {doneArray?.map((card) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, "doneArray")}
              className={classes.card}
              key={card?.title}
            >
              <button>{card?.title}</button>
            </li>
          ))}
        </ul>
        <button>+ add card</button>
      </div>
    </div>
  );
}
