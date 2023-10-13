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
      <Dialog.Overlay className="dokodemo-modal fixed inset-0 z-[2147483647] flex overflow-y-auto bg-black/60 font-sans">
        <Dialog.Content
          onClick={({ target, currentTarget }) => {
            // close the modal if we click outside of any of the children
            if (target === currentTarget) {
              onOpenChange(false);
            }
          }}
          className="absolute left-1/2 grid w-full max-w-[calc(min(1696px,100vw)-(40px*2))] -translate-x-1/2 gap-[40px] px-[56px] py-[80px] lg:grid-cols-2 2xl:grid-cols-3"
        >
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
