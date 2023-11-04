import Modal from "./modal";
import SearchBar from "./search-bar";
import AnimeList from "./anime-list";
import MangaList from "./manga-list";
import StaffList from "./staff-list";
import StudioList from "./studio-list";
import CharacterList from "./character-list";

import { useSearch } from "../hooks/search";
import { useEffect, useState } from "react";
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
  const [searchBarText, setSearchBarText] = useState(initialValue);

  const { data, isLoading } = useSearch(searchBarText);

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

      // set to the selected text if any
      setSearchBarText(result.data.text ?? "");

      // reply so the background script knows content is loaded on this tab
      sendResponse("b-b-b-buffa" satisfies ActionResponse);
    });
  }, []);

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      onCloseAnimationEnd={() => setSearchBarText("")}
    >
      <SearchBar
        placeholder="Search AniList"
        value={searchBarText}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onChange={({ target: { value } }) => setSearchBarText(value)}
      />

      <AnimeList
        anime={data.anime.results}
        searchText={searchBarText}
        thereIsMore={data.anime.pageInfo.hasNextPage}
      />

      <MangaList
        manga={data.manga.results}
        searchText={searchBarText}
        thereIsMore={data.manga.pageInfo.hasNextPage}
      />

      <CharacterList
        characters={data.characters.results}
        searchText={searchBarText}
        thereIsMore={data.characters.pageInfo.hasNextPage}
      />

      <StaffList
        staff={data.staff.results}
        searchText={searchBarText}
        thereIsMore={data.staff.pageInfo.hasNextPage}
      />

      <StudioList
        studios={data.studios.results}
        searchText={searchBarText}
        thereIsMore={data.studios.pageInfo.hasNextPage}
      />
    </Modal>
  );
};

export default App;
