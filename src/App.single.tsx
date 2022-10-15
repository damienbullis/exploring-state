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

const AppSingle = ({ md }: { md: string }) => {
  // const [name, setName] = useState(initial.name);
  // const [age, setAge] = useState(initial.age);
  // const [isMarried, setIsMarried] = useState(initial.isMarried);
  const [state, setState] = useState(initial);
  const handlers = useMemo(
    () => ({
      setName: (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, name: e.target.value }));
      },
      setAge: (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, age: +e.target.value }));
      },
      setIsMarried: (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, isMarried: e.target.checked }));
      },
    }),
    []
  );
  const { name, age, isMarried } = state;
  const { setName, setAge, setIsMarried } = handlers;
  console.log("AppSingle Render");

  const NameInput = useMemo(() => {
    return (
      <WithLabel label={`Name`}>
        <Input _value={name} onChange={setName} />
      </WithLabel>
    );
  }, [name]);
  const AgeInput = useMemo(() => {
    return (
      <WithLabel label={`Age`}>
        <Input _value={age} onChange={setAge} />
      </WithLabel>
    );
  }, [age]);
  const IsMarriedInput = useMemo(() => {
    return (
      <WithLabel label={`Is Married?`}>
        <Input _value={isMarried} onChange={setIsMarried} />
      </WithLabel>
    );
  }, [isMarried]);

  return (
    <div className={styles.card}>
      <ReactMarkdown className={styles.markdown} children={md} />
      <div className={styles._inner}>
        {NameInput}
        {AgeInput}
        {IsMarriedInput}
      </div>
    </div>
  );
};

export default AppSingle;
