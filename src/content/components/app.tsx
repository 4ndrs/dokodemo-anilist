import * as Dialog from "@radix-ui/react-dialog";

const App = () => (
  <Modal>
    <div className="h-14 w-[43rem] rounded-md bg-white" />
  </Modal>
);

const Modal = ({ children }: { children: React.ReactNode }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button>Open</button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-0 -translate-x-1/2">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default App;
