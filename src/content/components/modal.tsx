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
      <Dialog.Overlay className="dokodemo-modal dokodemo-fixed dokodemo-inset-0 dokodemo-z-[2147483647] dokodemo-flex dokodemo-overflow-y-auto dokodemo-bg-black/60 dokodemo-font-sans">
        <Dialog.Content
          onClick={({ target, currentTarget }) => {
            // close the modal if we click outside of any of the children
            if (target === currentTarget) {
              onOpenChange(false);
            }
          }}
          className="dokodemo-content dokodemo-absolute dokodemo-left-1/2 dokodemo-grid dokodemo-w-full dokodemo-max-w-[calc(min(1696px,100vw)-(40px*2))] -dokodemo-translate-x-1/2 dokodemo-gap-[43px] dokodemo-px-[56px] dokodemo-py-[80px] dokodemo-leading-[20px] lg:dokodemo-grid-cols-2 2xl:dokodemo-grid-cols-3"
        >
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
