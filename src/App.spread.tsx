import { FC, InputHTMLAttributes, useCallback, useMemo, useState } from "react";

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

function AppSpread() {
  const [state, setState] = useState(initial);

  const inputs = useMemo(() => {
    console.log("inside useMemo");
    return Object.keys(state) as (keyof typeof state)[];
  }, []);
  const handler = useCallback((v: string, input: string) => {
    console.log("onChange", input, v);
    setState({
      ...state,
      [input]: v,
    });
  }, []);
  console.log({ state });
  return (
    <div className={styles.card}>
      <h2 className="_title">State using {`{ ... }`}</h2>
      <div className={styles._inner}>
        {inputs.map((input) => (
          <WithLabel key={input} label={input}>
            <Input
              id={input}
              type="text"
              className="_input"
              value={`${state[input]}`}
              // set state with spread operator and no prevState
              onChange={(e) => handler(e.target.value, input)}
            />
          </WithLabel>
        ))}
      </div>
    </div>
  );
}

export default AppSpread;
