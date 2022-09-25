import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./assets/JetBrainsMono-ExtraLight.ttf";
import "./assets/JetBrainsMono-Regular.ttf";
import "./assets/JetBrainsMono-ExtraBold.ttf";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
