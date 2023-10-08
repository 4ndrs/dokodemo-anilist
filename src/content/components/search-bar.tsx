import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = (props: React.ComponentProps<"input">) => (
  <div className="mb-3 flex h-14 w-[43rem] max-w-full items-center place-self-center overflow-hidden rounded-md bg-white lg:col-span-2 2xl:col-span-3">
    <MagnifyingGlassIcon className="h-full w-14 px-5 text-slate-700" />
    <input
      {...props}
      className="h-full flex-1 border-none text-[0.94rem] font-semibold text-slate-500 "
    />
    <Cross2Icon className="h-full w-14 px-5 text-slate-700" />
  </div>
);

export default SearchBar;
