import {
  GearIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

interface Props extends React.ComponentProps<"input"> {
  isLoading: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

const SearchBar = (props: Props) => (
  <div className="dokodemo-mb-[12px] dokodemo-flex dokodemo-h-[56px] dokodemo-w-full dokodemo-max-w-[688px] dokodemo-items-center dokodemo-place-self-center  dokodemo-overflow-hidden dokodemo-rounded-[6px] dokodemo-bg-white dokodemo-px-4 lg:dokodemo-col-span-2 2xl:dokodemo-col-span-3">
    <MagnifyingGlassIcon className="dokodemo-mx-1 dokodemo-h-[20px] dokodemo-w-[20px] dokodemo-text-slate-700" />
    <input
      {...props}
      className="dokodemo-mx-2 dokodemo-h-full dokodemo-flex-1 dokodemo-border-none dokodemo-bg-white dokodemo-text-[15px] dokodemo-font-semibold dokodemo-capitalize dokodemo-text-slate-500 dokodemo-placeholder-slate-400"
    />
    <div
      className={`${
        props.isLoading ? "dokodemo-block" : "dokodemo-hidden"
      } dokodemo-mx-1 dokodemo-h-[20px] dokodemo-w-[20px] dokodemo-animate-spin dokodemo-rounded-full dokodemo-border-[3px] dokodemo-border-solid dokodemo-border-blue-300 dokodemo-border-t-transparent`}
    />
    <button
      aria-label="Settings"
      onClick={props.onOpenSettings}
      className="dokodemo-group dokodemo-mx-1 dokodemo-flex dokodemo-cursor-pointer dokodemo-rounded-full dokodemo-border-none dokodemo-bg-transparent"
    >
      <GearIcon className="dokodemo-h-[20px] dokodemo-w-[20px] dokodemo-text-slate-700 dokodemo-transition-colors dokodemo-duration-300 group-hover:dokodemo-text-sky-600 group-focus-visible:dokodemo-text-sky-600" />
    </button>
    <button
      aria-label="Close"
      onClick={props.onClose}
      className="dokodemo-group dokodemo-mx-1 dokodemo-flex dokodemo-cursor-pointer dokodemo-rounded-full dokodemo-border-none dokodemo-bg-transparent"
    >
      <Cross2Icon className="dokodemo-h-[20px] dokodemo-w-[20px] dokodemo-text-slate-700 dokodemo-transition-colors dokodemo-duration-300 group-hover:dokodemo-text-sky-600 group-focus-visible:dokodemo-text-sky-600" />
    </button>
  </div>
);

export default SearchBar;
