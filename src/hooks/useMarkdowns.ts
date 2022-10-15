import { useState, useEffect } from "react";

const ALL_MD = [
  "singleState.md",
  "stateSpread.md",
  "prevState.md",
  "reducer.md",
  "pubSub.md",
  "context.md",
];

const getMarkdown = async (src: string) => {
  const response = await fetch(`/${src}`);
  return await response.text();
};
const useMarkdowns = () => {
  const [markdowns, setMarkdows] = useState<string[]>([]);
  useEffect(() => {
    let mounted = true;
    const getMarkdowns = async () => {
      try {
        const markdowns = await Promise.all(
          ALL_MD.map((src) => getMarkdown(src))
        );
        if (markdowns && mounted) {
          setMarkdows(markdowns);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMarkdowns();
    return () => {
      mounted = false;
    };
  }, []);
  return markdowns;
};

export default useMarkdowns;
