import { useEffect, useState } from "react";
import { AnimeResponseSchema } from "../schema/response";

import type { Anime } from "../schema/anime";

const URL = "https://graphql.anilist.co";

const OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

const AnimeFinder = ({ text }: { text: string }) => {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (!text) {
      setAnimes([]);

      return;
    }

    const query = `
      {
        Page (page:1, perPage: 8) {
          pageInfo {
            hasNextPage
          }
          media (type: ANIME, search: "${text}") {
            id
            title {
              romaji
            }
            format
            startDate {
              year
            }
            coverImage {
              medium
            }
          }
        }
      }
    `;

    const cheerioooooooooo = async () => {
      const response = await fetch(URL, {
        ...OPTIONS,
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      const result = AnimeResponseSchema.safeParse(data);

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

      setAnimes(result.data.data.Page.media);
    };

    cheerioooooooooo();
  }, [text]);

  if (animes.length < 1) {
    return;
  }

  return (
    <ul className="rounded-md bg-white">
      {animes.map((anime) => (
        <li>
          <AnimeCard anime={anime} />
        </li>
      ))}
    </ul>
  );
};

const AnimeCard = ({ anime }: { anime: Anime }) => (
  <div className="py-3">
    Image: {anime.coverImage.medium}
    title: {anime.title.romaji}
    yeart and format: {anime.startDate.year} {anime.format}
  </div>
);

export default AnimeFinder;
