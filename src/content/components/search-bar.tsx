import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = (props: React.ComponentProps<"input">) => (
  <div className="dokodemo-mb-[12px] dokodemo-flex dokodemo-h-[56px] dokodemo-w-[688px] dokodemo-max-w-full dokodemo-items-center dokodemo-place-self-center dokodemo-overflow-hidden dokodemo-rounded-[6px] dokodemo-bg-white lg:dokodemo-col-span-2 2xl:dokodemo-col-span-3">
    <MagnifyingGlassIcon className="dokodemo-h-full dokodemo-w-[56px] dokodemo-px-[20px] dokodemo-text-slate-700" />
    <input
      {...props}
      className="dokodemo-h-full dokodemo-flex-1 dokodemo-border-none dokodemo-bg-white dokodemo-text-[15px] dokodemo-font-semibold dokodemo-text-slate-500 dokodemo-placeholder-slate-400"
    />
    <Cross2Icon className="dokodemo-h-full dokodemo-w-[56px] dokodemo-px-[20px] dokodemo-text-slate-700" />
  </div>
);

export default SearchBar;
