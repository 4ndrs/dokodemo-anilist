import * as Dialog from "@radix-ui/react-dialog";

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
      <Dialog.Overlay className="dokodemo-modal fixed inset-0 z-[2147483647] flex overflow-y-auto bg-black/60">
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

export default Modal;
