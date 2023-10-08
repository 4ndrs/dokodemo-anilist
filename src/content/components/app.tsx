import Modal from "./modal";
import SearchBar from "./search-bar";

import { useState } from "react";

const App = ({ unmount }: { unmount: () => void }) => {
  const [isOpen, setIsOpen] = useState(true);

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
      <SearchBar placeholder="Search AniList" />
    </Modal>
  );
};

export default App;
