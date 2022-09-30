import React from "react";
import styles from "./Carousel.module.sass";

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = React.useState(0);
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

  const leftChild = childrenArray[getIndex("left")];
  const rightChild = childrenArray[getIndex("right")];

  return (
    <div className={styles.wrap}>
      <button className={styles.btn}>{"<"}</button>
      <button className={styles.btn}>{">"}</button>
      <div className={styles.carousel}>
        {leftChild}
        {activeChild}
        {rightChild}
      </div>
    </div>
  );
};

export default Carousel;
