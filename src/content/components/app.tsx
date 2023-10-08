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
      <SearchBar placeholder="Search AniList" />
      <div className="h-[36rem] rounded-md bg-white" />
    </Modal>
  );
};

const SearchBar = (props: React.ComponentProps<"input">) => (
  <div className="flex h-14 w-[43rem] items-center overflow-hidden rounded-md bg-white font-semibold text-slate-500">
    <MagnifyingGlassIcon className="h-5 w-5 p-5" />
    <input
      {...props}
      className="h-full flex-1 border-none font-semibold text-slate-500 focus-visible:outline-none"
    />
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
      <Dialog.Overlay className="fixed inset-0 z-[999] flex overflow-y-auto bg-black/60">
        <Dialog.Content
          onClick={({ target, currentTarget }) => {
            // close the modal if we click outside of any of the children
            if (target === currentTarget) {
              onOpenChange(false);
            }
          }}
          className="absolute left-1/2 flex -translate-x-1/2 flex-col gap-9 py-20"
        >
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default App;
