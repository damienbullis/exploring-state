import { ChangeEvent, useCallback, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./App.module.sass";
import Input from "./components/shared/Input";
import WithLabel from "./components/shared/WithLabel";
import initial from "./initial.data";

// TODO:
// add in some sort of hook to log to an array
// that we can use to replace the console.logs
// with UI indications to show when component is updating
// something with react-spring?

const AppSpread = ({ md }: { md: string }) => {
  const [state, setState] = useState(initial);
  console.log("AppSpread Render");
  const inputs = useMemo(() => {
    return Object.keys(state) as (keyof typeof state)[];
  }, []);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>, input: keyof typeof state) => {
      console.log("onChange", input, e.target.value);
      if (e.target.type === "checkbox") {
        setState({ ...state, [input]: e.target.checked });
      } else if (e.target.type === "number") {
        setState({ ...state, [input]: +e.target.value });
      } else {
        setState({ ...state, [input]: e.target.value });
      }
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

export default AppSpread;
