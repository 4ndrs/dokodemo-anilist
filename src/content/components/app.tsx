import Modal from "./modal";
import SearchBar from "./search-bar";
import AnimeList from "./anime-list";
import MangaList from "./manga-list";
import StaffList from "./staff-list";
import StudioList from "./studio-list";
import CharacterList from "./character-list";
import SettingsModal from "./settings-modal";

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
  const [searchBarText, setSearchBarText] = useState(initialValue);
  const [dokodemoModalisOpen, setDokodemoModalIsOpen] = useState(true);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

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
        setDokodemoModalIsOpen(false);
        return;
      }

      setDokodemoModalIsOpen(true);

      // set to the selected text if any
      setSearchBarText(result.data.text ?? "");

      // reply so the background script knows content is loaded on this tab
      sendResponse("b-b-b-buffa" satisfies ActionResponse);
    });
  }, []);

  return (
    <>
      <Modal
        open={dokodemoModalisOpen}
        onOpenChange={setDokodemoModalIsOpen}
        onCloseAnimationEnd={() => setSearchBarText("")}
      >
        <SearchBar
          placeholder="Search AniList"
          value={searchBarText}
          isLoading={isLoading}
          onClose={() => setDokodemoModalIsOpen(false)}
          onOpenSettings={() => setSettingsModalIsOpen(true)}
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

      <SettingsModal
        open={settingsModalIsOpen}
        onOpenChange={setSettingsModalIsOpen}
      />
    </>
  );
};

export default App;
