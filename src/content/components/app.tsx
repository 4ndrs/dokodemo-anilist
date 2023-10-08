import * as Dialog from "@radix-ui/react-dialog";

import { useState } from "react";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOnOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      // send a message to the background script to unload injected css
      browser.runtime.sendMessage("SHUT IT DOWN!!");

      // TODO: this might influence animations later, keep an eye on it
      // remove dokodemo div
      document.getElementById("dokodemo-anilist")?.remove();
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOnOpenChange}>
      <SearchBar />
    </Modal>
  );
};

const SearchBar = () => (
  <div className="flex h-14 w-[43rem] items-center overflow-hidden rounded-md bg-white font-semibold text-slate-500">
    <MagnifyingGlassIcon className="h-5 w-5 p-5" />
    <input className="h-full flex-1 border-none font-semibold text-slate-500 focus-visible:outline-none" />
    <Cross2Icon className="h-5 w-5 p-5" />
  </div>
);

const Modal = ({
  open,
  children,
  onOpenChange,
}: {
  open: boolean;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-20 -translate-x-1/2">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default App;
