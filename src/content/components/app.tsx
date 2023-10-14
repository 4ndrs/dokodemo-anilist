import Modal from "./modal";
import SearchBar from "./search-bar";
import StaffFinder from "./staff-finder";
import AnimeFinder from "./anime-finder";
import MangaFinder from "./manga-finder";
import CharacterFinder from "./character-finder";

import { useEffect, useState } from "react";
import { ActionMessageSchema, type ActionResponse } from "../schemas/message";

let runningTabId: number | undefined;

(async () => {
  const id = await browser.runtime.sendMessage("gimme-tab-id");

  console.log("received id:", id);

  runningTabId = typeof id === "number" ? id : undefined;
})();

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [textToSearch, setTextToSearch] = useState("");
  const [searchBarText, setSearchBarText] = useState("");

  useEffect(() => {
    // debounce search text
    const id = setTimeout(
      () =>
        setTextToSearch((previous) =>
          previous.trim() === searchBarText.trim() ? previous : searchBarText,
        ),
      500,
    );

    return () => clearTimeout(id);
  }, [searchBarText]);

  useEffect(() => {
    // set up communication with the background script
    browser.runtime.onMessage.addListener((message, _, sendResponse) => {
      const result = ActionMessageSchema.safeParse(message);

      if (
        !result.success ||
        typeof runningTabId !== "number" ||
        runningTabId !== result.data.tabId
      ) {
        console.log("received unknown (?) message:", message);
        return;
      }

      setIsOpen(result.data.action === "open");

      // reset search
      setTextToSearch("");
      setSearchBarText("");

      // reply so the background script knows content is loaded on this tab
      sendResponse("b-b-b-buffa" satisfies ActionResponse);
    });
  }, []);

  return (
    <Modal open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SearchBar
        placeholder="Search AniList"
        value={searchBarText}
        onChange={({ target: { value } }) => setSearchBarText(value)}
      />

      <AnimeFinder text={textToSearch} />
      <MangaFinder text={textToSearch} />
      <CharacterFinder text={textToSearch} />
      <StaffFinder text={textToSearch} />
    </Modal>
  );
};

export default App;
