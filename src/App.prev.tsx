import { ChangeEvent, useCallback, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./App.module.sass";
import Input from "./components/shared/Input";
import WithLabel from "./components/shared/WithLabel";
import initial from "./initial.data";

const AppPrev = ({ md }: { md: string }) => {
  const [state, setState] = useState(initial);
  console.log("AppPrev Render");
  const inputs = useMemo(() => {
    return Object.keys(state) as (keyof typeof state)[];
  }, []);
  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: keyof typeof state) => {
      console.log("onChange", key);
      setState((prev) => {
        let next;
        if (e.target.type === "checkbox") {
          next = e.target.checked;
        } else if (e.target.type === "number") {
          next = +e.target.value;
        } else {
          next = e.target.value;
        }
        // if you just return prev mutated, it will not trigger a re-render
        return { ...prev, [key]: next };
      });
    },
    []
  );
  return (
    <div className={styles.card}>
      <ReactMarkdown className={styles.markdown} children={md} />
      <div className={styles._inner}>
        {inputs.map((input) => (
          <WithLabel key={input} label={input}>
            <Input
              id={input}
              _value={state[input]}
              onChange={(e) => handler(e, input)}
            />
          </WithLabel>
        ))}
      </div>
    </div>
  );
};

export default AppPrev;
