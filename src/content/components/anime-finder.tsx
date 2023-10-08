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
    <div className="relative">
      <h1 className="absolute -top-7 left-0 text-sm font-semibold text-slate-200">
        Anime
      </h1>

      <ul className="overflow-hidden rounded-md bg-white">
        {animes.map((anime) => (
          <li key={anime.id}>
            <AnimeCard anime={anime} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnimeCard = ({ anime }: { anime: Anime }) => (
  <a
    href={`https://anilist.co/anime/${anime.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-start gap-3 px-5 pb-3 pt-[0.94rem] hover:bg-sky-400"
  >
    <img
      alt={anime.title.romaji}
      src={anime.coverImage.medium}
      className="h-10 w-10 flex-shrink-0 rounded-[0.19rem] object-cover"
    />

    <div className="flex flex-col justify-center gap-1">
      <h2 className="text-ellipsis whitespace-nowrap text-[0.94rem] font-semibold text-slate-500 group-hover:text-white">
        {anime.title.romaji}
      </h2>
      <div className="text-ellipsis whitespace-nowrap text-xs font-medium text-slate-400 group-hover:text-slate-200">
        {anime.startDate.year} {anime.format}
      </div>
    </div>
  </a>
);

export default AnimeFinder;
