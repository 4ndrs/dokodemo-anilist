import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";

import { useSettingsStore } from "../store";

const SettingsModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { isAdult, toggleIsAdult } = useSettingsStore();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dokodemo-modal dokodemo-fixed dokodemo-inset-0 dokodemo-z-[2147483647] dokodemo-flex dokodemo-overflow-y-auto dokodemo-bg-black/20 dokodemo-font-sans">
          <Dialog.Content className="settings-content dokodemo-absolute dokodemo-left-1/2 dokodemo-top-1/2 dokodemo-mx-[24px] dokodemo-flex dokodemo-h-full dokodemo-max-h-[300px] dokodemo-w-full dokodemo-max-w-[555px] -dokodemo-translate-x-1/2 -dokodemo-translate-y-1/2 dokodemo-flex-col dokodemo-rounded-[6px] dokodemo-bg-white dokodemo-p-[20px] dokodemo-leading-[20px]">
            <h1 className="dokodemo-mb-[20px] dokodemo-text-[24px] dokodemo-font-bold">
              Settings
            </h1>

            <div className="dokodemo-flex dokodemo-justify-between">
              <label
                htmlFor="18-content"
                className="dokodemo-text-[15px] dokodemo-font-normal"
              >
                Allow 18+ content in search results
              </label>
              <Switch.Root
                id="18-content"
                checked={isAdult}
                onCheckedChange={toggleIsAdult}
                className="dokodemo-flex dokodemo-h-[25px] dokodemo-w-[42px] dokodemo-cursor-default dokodemo-items-center dokodemo-rounded-full dokodemo-outline-none focus-visible:dokodemo-outline focus-visible:dokodemo-outline-sky-400 data-[state=checked]:dokodemo-bg-sky-500"
              >
                <Switch.Thumb className="dokodemo-block dokodemo-h-[21px] dokodemo-w-[21px] dokodemo-translate-x-0.5 dokodemo-rounded-full dokodemo-bg-white dokodemo-shadow-[0_2px_2px] dokodemo-shadow-black dokodemo-transition-transform dokodemo-duration-100 dokodemo-will-change-transform data-[state=checked]:dokodemo-translate-x-[19px]" />
              </Switch.Root>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="dokodemo-mb-0 dokodemo-mt-auto dokodemo-cursor-pointer dokodemo-self-end dokodemo-rounded-[4px] dokodemo-bg-sky-500 dokodemo-px-[15px] dokodemo-py-[10px] dokodemo-text-[15px] dokodemo-font-medium dokodemo-text-white dokodemo-transition-shadow dokodemo-duration-200 hover:dokodemo-shadow-[0_1px_10px_0_rgba(49,54,68,.15)]"
            >
              Close
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SettingsModal;
