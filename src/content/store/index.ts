import { create } from "zustand";
import { LocalStorageSchema, type SettingsSchema } from "../schemas";

interface SettingsStore extends SettingsSchema {
  toggleIsAdult: () => void;
}

export const useSettingsStore = create<SettingsStore>()((set, get) => ({
  isAdult: false,
  toggleIsAdult: async () => {
    const isAdult = !get().isAdult;

    await browser.storage.local.set({
      settings: { isAdult },
    } satisfies LocalStorageSchema);

    set({ isAdult });
  },
}));

// set the initial state saved in the store if it exists
(async () => {
  const localStorage = await browser.storage.local.get();

  const result = LocalStorageSchema.safeParse(localStorage);

  if (!result.success) {
    console.log(
      "no settings found in the storage, assuming first time running",
    );

    await browser.storage.local.set({
      settings: { isAdult: false },
    } satisfies LocalStorageSchema);

    return;
  }

  const {
    settings: { isAdult },
  } = result.data;

  useSettingsStore.setState({ isAdult });
})();

// listen for changes made by other tabs
// currently not working, TODO: fix this
browser.storage.local.onChanged.addListener((changes) =>
  console.log("changes", changes),
);
