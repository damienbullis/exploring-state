import { FC, InputHTMLAttributes, useMemo } from "react";
import styles from "./Input.module.sass";

const Input: FC<InputHTMLAttributes<HTMLInputElement> & { _value: any }> = (
  props
) => {
  const { _value: value, id, ...rest } = props;
  // get the type of the value
  const type = useMemo(() => typeof value, [value]);
  console.log("Input Render", { id, value, type });
  // if the value is a string, use a text input
  // if the value is a boolean, use a checkbox
  // if number, use a number input
  // else use a text input (for now)
  if (type === "string") return <input value={value} type="text" {...rest} />;
  if (type === "boolean")
    return <input checked={value} type="checkbox" {...rest} />;
  if (type === "number") return <input value={value} type="number" {...rest} />;
  return <input value={`${value}`} type="text" {...rest} readOnly />;
};

export default Input;
