/// <reference lib="dom" />

import ReactDOM from "react-dom/client";
import App from "./components/app";

if (!document.getElementById("dokodemo-anilist")) {
  const dokodemoElement = document.createElement("div");

  dokodemoElement.id = "dokodemo-anilist";

  document.body.appendChild(dokodemoElement);

  ReactDOM.createRoot(
    document.getElementById("dokodemo-anilist") as HTMLElement,
  ).render(<App />);
}
