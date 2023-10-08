import * as Dialog from "@radix-ui/react-dialog";

import { useState } from "react";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
      <div className="h-[36rem] rounded-md bg-white" />
      <div className="h-[36rem] rounded-md bg-white" />
      <div className="h-[36rem] rounded-md bg-white" />
      <div className="h-[36rem] rounded-md bg-white" />
    </Modal>
  );
};

const SearchBar = (props: React.ComponentProps<"input">) => (
  <div className="mb-3 flex h-14 w-[43rem] max-w-full items-center place-self-center overflow-hidden rounded-md bg-white lg:col-span-2 2xl:col-span-3">
    <MagnifyingGlassIcon className="h-full w-14 px-5 text-slate-700" />
    <input
      {...props}
      className="h-full flex-1 border-none text-[0.94rem] font-semibold text-slate-500 "
    />
    <Cross2Icon className="h-full w-14 px-5 text-slate-700" />
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
      <Dialog.Overlay className="dokodemo-modal fixed inset-0 z-[999] flex overflow-y-auto bg-black/60">
        <Dialog.Content
          onClick={({ target, currentTarget }) => {
            // close the modal if we click outside of any of the children
            if (target === currentTarget) {
              onOpenChange(false);
            }
          }}
          className="absolute left-1/2 grid w-full max-w-[calc(min(106rem,100vw)-(2.25rem*2))] -translate-x-1/2 gap-10 px-14 py-20 lg:grid-cols-2 2xl:grid-cols-3"
        >
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default App;
