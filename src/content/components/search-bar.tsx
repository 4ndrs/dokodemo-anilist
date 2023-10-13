import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = (props: React.ComponentProps<"input">) => (
  <div className="mb-[12px] flex h-[56px] w-[688px] max-w-full items-center place-self-center overflow-hidden rounded-[6px] bg-white lg:col-span-2 2xl:col-span-3">
    <MagnifyingGlassIcon className="h-full w-[56px] px-[20px] text-slate-700" />
    <input
      {...props}
      className="h-full flex-1 border-none bg-white text-[15px] font-semibold text-slate-500 placeholder-slate-400"
    />
    <Cross2Icon className="h-full w-[56px] px-[20px] text-slate-700" />
  </div>
);

export default SearchBar;
