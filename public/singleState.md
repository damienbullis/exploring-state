mutating prevState returns prevState

```js
const initial = {
  string: "string",
  number: 2,
  boolean: true,
};
// each key value pair is controlled by a separate input & useState hook
const [string, setString] = useState(initial.string);
const [number, setNumber] = useState(initial.number);
const [boolean, setBoolean] = useState(initial.boolean);

return (
  <input value={string} type="text" onChange={setString} />
  <input value={number} type="number" onChange={setNumber} />
  <input value={number} type="checkbox" onChange={setBoolean} />
)
```
