import { useSettingsStore } from "../store";
import { useEffect, useState } from "react";

import { FetchMessageSchema } from "../schemas/message";
import { SearchResponseSchema } from "../schemas";

type Data = NonNullable<SearchResponseSchema["data"]>;

const initialValue: Data = {
  anime: { pageInfo: { hasNextPage: false }, results: [] },
  manga: { pageInfo: { hasNextPage: false }, results: [] },
  staff: { pageInfo: { hasNextPage: false }, results: [] },
  studios: { pageInfo: { hasNextPage: false }, results: [] },
  characters: { pageInfo: { hasNextPage: false }, results: [] },
};

export const useSearch = (text: string) => {
  const [data, setData] = useState<Data>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [textToSearch, setTextToSearch] = useState("");

  const { isAdult } = useSettingsStore();

  useEffect(() => {
    if (!text) {
      setTextToSearch("");
      return;
    }

    // debounce search text
    const id = setTimeout(
      () =>
        setTextToSearch((previous) =>
          previous.trim() === text.trim() ? previous : text,
        ),
      800,
    );

    return () => clearTimeout(id);
  }, [text]);

  useEffect(() => {
    if (!textToSearch) {
      setData(initialValue);

      return;
    }

    const query = `
      {
        anime: Page(perPage: 8) {
          pageInfo {
            hasNextPage
          }
          results: media(type: ANIME, search: "${textToSearch}", isAdult: ${isAdult}) {
            id
            title {
              romaji
            }
            coverImage {
              medium
            }
            format
            startDate {
              year
            }
          }
        }
        manga: Page(perPage: 8) {
          pageInfo {
            hasNextPage
          }
          results: media(type: MANGA, search: "${textToSearch}", isAdult: ${isAdult}) {
            id
            title {
              romaji
            }
            coverImage {
              medium
            }
            format
            startDate {
              year
            }
          }
        }
        characters: Page(perPage: 8) {
          pageInfo {
            hasNextPage
          }
          results: characters(search: "${textToSearch}") {
            id
            name {
              full
            }
            image {
              medium
            }
          }
        }
        staff: Page(perPage: 8) {
          pageInfo {
            hasNextPage
          }
          results: staff(search: "${textToSearch}") {
            id
            primaryOccupations
            name {
              full
            }
            image {
              medium
            }
          }
        }
        studios: Page(perPage: 13) {
          pageInfo {
            hasNextPage
          }
          results: studios(search: "${textToSearch}") {
            id
            name
          }
        }
      }
    `;

    const cheerioooooooooo = async () => {
      setIsLoading(true);

      const data = await browser.runtime.sendMessage({
        type: "query",
        query,
      } satisfies FetchMessageSchema);

      setIsLoading(false);

      const result = SearchResponseSchema.safeParse(data);

      if (!result.success) {
        console.error(
          "something happened, data seems different from the schema:",
          data,
        );
        return;
      }

      if (!result.data.data) {
        console.error(result.data.errors);
        return;
      }

      setData(result.data.data);
    };

    cheerioooooooooo();
  }, [textToSearch, isAdult]);

  return { data, isLoading };
};
