import {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
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
    // TODO: could refactor this into the getter to simplify
    this.subs.add(sub);
    return () => {
      this.subs.delete(sub);
    };
  }
}

function SubInput<T extends string | number | boolean>({
  sub,
}: {
  sub: Obs<T>;
}) {
  const initState = useMemo(() => sub.value, []);
  const [state, setState] = useState<T>(initState);
  useEffect(() => {
    console.log("SUB INPUT");
    const unSub = sub.subscribe((data: T) => {
      console.log("SUB UPDATE", data);
      setState(data);
    });
    return unSub();
  }, []);
  const t = typeof state;
  if (t === "string") {
    return (
      <input
        value={state as string}
        onChange={(e) => {
          sub.value = e.target.value as T;
        }}
      />
    );
  }
  if (t === "boolean") {
    return (
      <input
        type="checkbox"
        checked={state as boolean}
        onChange={(e) => {
          sub.value = e.target.checked as T;
        }}
      />
    );
  }
  if (t === "number") {
    return (
      <input
        type="number"
        value={state as number}
        onChange={(e) => {
          sub.value = e.target.value as T;
        }}
      />
    );
  }
  return <></>;
}

const createStore = <typeData extends {}>(data: {
  [key in keyof typeData]: typeData[key];
}) => {
  console.log("STORE");
  // TODO: add in recursive step to make this work for nested objects & arrays
  const mapped = Object.entries(data).map(([k, v]) => {
    return [k, new Obs(v)];
  });
  return Object.fromEntries(mapped) as {
    [key in keyof typeData]: Obs<typeData[key]>;
  };
};

const subs = createStore(initial);

const AppPubSub = ({ md }: { md: string }) => {
  return (
    <div className={styles.card}>
      <ReactMarkdown className={styles.markdown} children={md} />
      <div className={styles._inner}>
        <WithLabel label={"Name"}>
          <SubInput sub={subs.name} />
        </WithLabel>
        <WithLabel label={"Age"}>
          <SubInput sub={subs.age} />
        </WithLabel>
        <WithLabel label={"Is Married?"}>
          <SubInput sub={subs.isMarried} />
        </WithLabel>
      </div>
    </div>
  );
};

export default AppPubSub;
