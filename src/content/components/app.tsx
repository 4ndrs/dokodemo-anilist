import Modal from "./modal";
import SearchBar from "./search-bar";
import StaffFinder from "./staff-finder";
import AnimeFinder from "./anime-finder";
import MangaFinder from "./manga-finder";
import StudioFinder from "./studio-finder";
import CharacterFinder from "./character-finder";

import { useCallback, useEffect, useState } from "react";
import { ActionMessageSchema, type ActionResponse } from "../schemas/message";

let runningTabId: number | undefined;

(async () => {
  const id = await browser.runtime.sendMessage("gimme-tab-id");

  console.log("received id:", id);

  runningTabId = typeof id === "number" ? id : undefined;
})();

const initialValue = document.getSelection()?.toString() ?? "";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [textToSearch, setTextToSearch] = useState(initialValue);
  const [searchBarText, setSearchBarText] = useState(initialValue);

  const [isLoading, setIsLoading] = useState({
    anime: false,
    manga: false,
    characters: false,
    staff: false,
    studios: false,
  });

  useEffect(() => {
    // debounce search text
    const id = setTimeout(
      () =>
        setTextToSearch((previous) =>
          previous.trim() === searchBarText.trim() ? previous : searchBarText,
        ),
      800,
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

      if (result.data.action === "close") {
        setIsOpen(false);
        return;
      }

      setIsOpen(true);

      // reset search or set to the selected text if any
      const text = result.data.text ?? "";

      setTextToSearch(text);
      setSearchBarText(text);

      // reply so the background script knows content is loaded on this tab
      sendResponse("b-b-b-buffa" satisfies ActionResponse);
    });
  }, []);

  const handleAnimeLoadingChange = useCallback(
    (loading: boolean) =>
      setIsLoading((previous) => ({ ...previous, anime: loading })),
    [],
  );

  const handleMangaLoadingChange = useCallback(
    (loading: boolean) =>
      setIsLoading((previous) => ({ ...previous, manga: loading })),
    [],
  );

  const handleCharactersLoadingChange = useCallback(
    (loading: boolean) =>
      setIsLoading((previous) => ({ ...previous, characters: loading })),
    [],
  );

  const handleStaffLoadingChange = useCallback(
    (loading: boolean) =>
      setIsLoading((previous) => ({ ...previous, staff: loading })),
    [],
  );

  const handleStudiosLoadingChange = useCallback(
    (loading: boolean) =>
      setIsLoading((previous) => ({ ...previous, studios: loading })),
    [],
  );

  return (
    <Modal open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SearchBar
        placeholder="Search AniList"
        value={searchBarText}
        onChange={({ target: { value } }) => setSearchBarText(value)}
        isLoading={Object.values(isLoading).some((loading) => loading)}
      />

      <AnimeFinder
        text={textToSearch}
        onLoadingChange={handleAnimeLoadingChange}
      />

      <MangaFinder
        text={textToSearch}
        onLoadingChange={handleMangaLoadingChange}
      />

      <CharacterFinder
        text={textToSearch}
        onLoadingChange={handleCharactersLoadingChange}
      />

      <StaffFinder
        text={textToSearch}
        onLoadingChange={handleStaffLoadingChange}
      />

      <StudioFinder
        text={textToSearch}
        onLoadingChange={handleStudiosLoadingChange}
      />
    </Modal>
  );
};

export default App;
