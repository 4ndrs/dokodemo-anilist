/// <reference lib="dom" />

import ReactDOM from "react-dom/client";
import App from "./components/app";

if (!document.getElementById("dokodemo-anilist")) {
  const dokodemoElement = document.createElement("div");

  dokodemoElement.id = "dokodemo-anilist";

  document.body.appendChild(dokodemoElement);

  const root = ReactDOM.createRoot(dokodemoElement);

  root.render(<App />);
} else {
  console.error("dokodemo element already exist");
}
