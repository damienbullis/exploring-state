import React from "react";
import styles from "./Carousel.module.sass";

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = React.useState(0);
  // incoming should be the index of the next child to be displayed
  // when the user clicks the next button, get the next child node
  // and start the animation for active to transition out and next to transition in
  // when the animation is complete, set the active index to the next child index
  // and set the next child index to null

  const [incoming, setIncoming] = React.useState<number | null>(null);
  const childrenArray = React.Children.toArray(children);
  const activeChild = childrenArray[active];
  const length = childrenArray.length;

  const getIndex = (direction: "left" | "right") => {
    if (length === 1) return 0;
    if (length === 2) return active === 0 ? 1 : 0;
    if (direction === "left") {
      return active === 0 ? length - 1 : active - 1;
    }
    return active === length - 1 ? 0 : active + 1;
  };

  const next = (direction: "left" | "right") => {
    const next = getIndex(direction);
    // setIncoming(next);
    setActive(next);
    // This needs to also trigger the exit animation for the active child
  };

  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={() => next("left")}>
        {"<"}
      </button>
      <button className={styles.btn} onClick={() => next("right")}>
        {">"}
      </button>
      <div className={styles.carousel}>
        <div className={styles.active}>{activeChild}</div>
        {/* <div
          className={styles.incoming}
          // This will be a react-spring animation
          // when the animation is complete,
          // set the active index to the incoming index
          // set the incoming index to null
        >
          {incoming !== null && childrenArray[incoming]}
        </div> */}
      </div>
    </div>
  );
};

export default Carousel;
