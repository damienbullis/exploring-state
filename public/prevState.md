mutating prevState returns prevState

```js
(key) =>
  setState((prevState) => {
    prevState[key] = newValue;
    return prevState;
  });
```
