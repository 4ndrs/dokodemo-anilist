import { useImage } from "../hooks/images";
import { useEffect, useState } from "react";
import { AnimeResponseSchema } from "../schema/response";

import type { Anime } from "../schema/anime";
import type { FetchMessageSchema } from "../schema/message";

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
      const data = await browser.runtime.sendMessage({
        type: "query",
        query,
      } satisfies FetchMessageSchema);

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
      <h1 className="absolute -top-[28px] left-0 text-[14px] font-semibold text-slate-200">
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

const AnimeCard = ({ anime }: { anime: Anime }) => {
  const { imageUrl, isLoading } = useImage(anime.coverImage.medium);

  return (
    <a
      href={`https://anilist.co/anime/${anime.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-start gap-[12px] px-[20px] pb-[12px] pt-[15px] hover:bg-sky-400"
    >
      {isLoading ? (
        <div className="h-[40px] w-[40px] animate-pulse rounded-[3px] bg-gray-400" />
      ) : (
        <img
          alt={anime.title.romaji}
          src={imageUrl}
          className="h-[40px] w-[40px] flex-shrink-0 rounded-[3px] object-cover"
        />
      )}

      <div className="flex flex-col justify-center gap-1">
        <h2 className="text-ellipsis whitespace-nowrap text-[15px] font-semibold text-slate-500 group-hover:text-white">
          {anime.title.romaji}
        </h2>
        <div className="text-ellipsis whitespace-nowrap text-[12px] font-medium text-slate-400 group-hover:text-slate-200">
          {anime.startDate.year} {anime.format}
        </div>
      </div>
    </a>
  );
};

export default AnimeFinder;
