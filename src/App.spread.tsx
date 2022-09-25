import { useEffect, useMemo, useState } from "react";

import styles from "./App.module.sass";

const initial = {
  name: "John",
  age: 30,
  isMarried: false,
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
  acounts: [
    {
      id: 1,
      type: "checking",
      balance: 100,
    },
    {
      id: 2,
      type: "savings",
      balance: 200,
    },
  ],
};

function App() {
  const [state, setState] = useState(initial);

  const inputs = useMemo(
    () => Object.keys(state) as (keyof typeof state)[],
    [state]
  );

  return (
    <div className={styles.App}>
      <h1 className="_title">React State</h1>
      <div className="wrap">
        {inputs.map((input) => (
          <div className="input" key={input}>
            <label className="_label" htmlFor={input}>
              {input}
            </label>
            <input
              id={input}
              type="text"
              className="_input"
              value={`${state[input]}`}
              // set state with spread operator and no prevState
              onChange={(e) => {
                setState({
                  ...state,
                  [input]: e.target.value,
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
