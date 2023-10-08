import Modal from "./modal";
import SearchBar from "./search-bar";
import AnimeFinder from "./anime-finder";

import { useEffect, useState } from "react";

const App = ({ unmount }: { unmount: () => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [textToSearch, setTextToSearch] = useState("");
  const [searchBarText, setSearchBarText] = useState("");

  useEffect(() => {
    // debounce
    const id = setTimeout(
      () =>
        setTextToSearch((previous) =>
          previous.trim() === searchBarText.trim() ? previous : searchBarText,
        ),
      500,
    );

    return () => clearTimeout(id);
  }, [searchBarText]);

  const handleOnOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      // send a message to the background script to unload injected css
      browser.runtime.sendMessage("SHUT IT DOWN!!");

      // TODO: this might influence animations later, keep an eye on it
      // unmount & remove dokodemo div
      unmount();
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOnOpenChange}>
      <SearchBar
        placeholder="Search AniList"
        value={searchBarText}
        onChange={({ target: { value } }) => setSearchBarText(value)}
      />

      <AnimeFinder text={textToSearch} />
    </Modal>
  );
};

export default App;
