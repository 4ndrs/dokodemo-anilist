import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

const App = () => {
  const [num, setNum] = useState(1);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>Open</button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 fixed inset-0" />
          <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-md max-h-[85vh] p-6">
            <Dialog.Title>Some title</Dialog.Title>
            <Dialog.Description>Some Description</Dialog.Description>
            Other content...
            <div>
              {num} <button onClick={() => setNum(num + 1)}>Up</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default App;
