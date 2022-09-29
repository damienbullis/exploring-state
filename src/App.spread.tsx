import { FC, InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./App.module.sass";
import initial from "./initial.data";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} />;
};

const WithLabel = ({ label, children }: { label: string; children: any }) => (
  <div className={styles.input} key={label}>
    <label htmlFor={label}>{label}</label>
    {children}
  </div>
);

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
  return (
    <div className={styles.card}>
      <ReactMarkdown className={styles.markdown} children={md} />
      <div className={styles._inner}>
        {inputs.map((input) => (
          <WithLabel key={input} label={input}>
            <Input
              id={input}
              type="text"
              className="_input"
              value={`${state[input]}`}
              // set state with spread operator and no prevState
              onChange={(e) => {
                console.log("onChange", input, e.target.value);
                setState({
                  ...state,
                  [input]: e.target.value,
                });
              }}
            />
          </WithLabel>
        ))}
      </div>
    </div>
  );
};

export default AppSpread;
