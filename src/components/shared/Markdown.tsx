import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Markdown.module.sass";

const Markdown = ({ md }: { md: string }) => {
  const copy = async (e: MouseEvent) => {
    // get the text from pre > code
    if (e.target instanceof HTMLButtonElement) {
      const code = e.target.parentElement?.querySelector("code");
      if (code) {
        const text = code.innerText;
        console.log("copy", text);
        const th = await navigator.clipboard.writeText(text);
        // change the button text to "copied"
        e.target.innerText = "copied";
        // create a refence to the target and set a timeout to change the text back
        const ref = e.target;

        const timer = setTimeout(() => {
          ref.innerText = "copy";
        }, 1000);
        // when the button is clicked again, clear the timeout
        e.target.addEventListener("click", () => {
          clearTimeout(timer);
        });
      }
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("trigger");
    const el = ref.current;
    if (!el) return;
    const codeBlocks = el.querySelectorAll("pre");
    codeBlocks.forEach((block) => {
      // add a wrapper div around the code block
      const wrapper = document.createElement("div");
      wrapper.classList.add(styles.wrap);
      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(block);
      // add a copy button
      const button = document.createElement("button");
      button.classList.add(styles.copy);
      button.textContent = "copy";
      button.addEventListener("click", copy);
      wrapper.appendChild(button);
    });
    return () => {
      codeBlocks.forEach((block) => {
        // remove the event listener on each button
        const button = block.querySelector("button");
        if (button) {
          button.removeEventListener("click", copy);
          button.remove();
        }
      });
    };
  }, [md]);
  return (
    <div ref={ref}>
      <ReactMarkdown className={styles.markdown} children={md} />
    </div>
  );
};

export default Markdown;
