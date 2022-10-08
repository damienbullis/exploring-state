import {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";

import styles from "./App.module.sass";

import Input from "./components/shared/Input";
import WithLabel from "./components/shared/WithLabel";
import initial from "./initial.data";

const observable = (data: { [key: string]: unknown }) => {
  const subs = new Set<() => void>();
  const proxy = new Proxy(data, {
    set: (target, key: string, value) => {
      target[key] = value;
      subs.forEach((sub) => sub());
      return true;
    },
  });
  return {
    subscribe: (sub: () => void) => {
      subs.add(sub);
      return () => subs.delete(sub);
    },
    proxy,
  };
};
function Observable<T extends unknown>(data: T) {
  const subs = new Set<(data: T) => void>();
  const [state, setState] = useState(data);
  const subscribe = useCallback((sub: () => void) => {
    subs.add(sub);
    return () => subs.delete(sub);
  }, []);
  const publish = useCallback((data: T) => {
    setState(data);
    subs.forEach((sub) => sub(data));
  }, []);
  return {
    value: state,
    subscribe,
    publish,
  };
}
class Obs<T = unknown> {
  private subs = new Set<(data: T) => void>();
  private state: T;
  constructor(data: T) {
    this.state = data;
  }
  get value() {
    console.log("get value", this.state);
    return this.state;
  }
  set value(data: T) {
    this.state = data;
    console.log("set value", data);
    this.subs.forEach((sub) => sub(data));
  }
  subscribe(sub: (data: T) => void) {
    this.subs.add(sub);
    return () => this.subs.delete(sub);
  }
}

const createStore = <typeData extends {}>(data: {
  [key in keyof typeData]: typeData[key];
}) =>
  useMemo(() => {
    console.log("STORE");
    const mapped = Object.entries(data).map(([k, v]) => {
      return [k, new Obs(v)];
    });
    return Object.fromEntries(mapped) as {
      [key in keyof typeData]: Obs<typeData[key]>;
    };
  }, []);

const AppPubSub = ({ md }: { md: string }) => {
  const subs = createStore(initial);

  const inputs = useMemo(() => {
    return Object.keys(initial) as (keyof typeof initial)[];
  }, []);
  return (
    <div className={styles.card}>
      <ReactMarkdown className={styles.markdown} children={md} />
      <div className={styles._inner}>
        {inputs.map((input) => (
          <WithLabel key={input} label={input}>
            <Input
              id={input}
              _value={subs[input].value}
              onChange={(e) => (subs[input].value = e.target.value)}
            />
          </WithLabel>
        ))}
      </div>
    </div>
  );
};

export default AppPubSub;
