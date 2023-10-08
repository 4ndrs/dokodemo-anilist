import * as Dialog from "@radix-ui/react-dialog";

import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const App = () => (
  <Modal>
    <SearchBar />
  </Modal>
);

const SearchBar = () => (
  <div className="flex h-14 w-[43rem] items-center overflow-hidden rounded-md bg-white font-semibold text-slate-500">
    <MagnifyingGlassIcon className="h-5 w-5 p-5" />
    <input className="h-full flex-1 border-none font-semibold text-slate-500 focus-visible:outline-none" />
    <Cross2Icon className="h-5 w-5 p-5" />
  </div>
);

const Modal = ({ children }: { children: React.ReactNode }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button>Open</button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-20 -translate-x-1/2">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default App;
