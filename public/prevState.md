useState with spread operator

```js
(key) =>
  setState((prevState) => {
    prevState[key] = newValue;
    return prevState;
  });
```
