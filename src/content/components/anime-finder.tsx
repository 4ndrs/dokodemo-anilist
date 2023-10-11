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

const AnimeCard = ({ anime }: { anime: Anime }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);

      const blob = await browser.runtime.sendMessage({
        type: "image",
        src: anime.coverImage.medium,
      } as FetchMessageSchema);

      setIsLoading(false);

      setImageUrl(URL.createObjectURL(blob));
    };

    fetchImage();
  }, [anime.coverImage.medium]);

  return (
    <a
      href={`https://anilist.co/anime/${anime.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-start gap-3 px-5 pb-3 pt-[0.94rem] hover:bg-sky-400"
    >
      {isLoading ? (
        <div className="h-10 w-10 animate-pulse rounded-[0.19rem] bg-gray-400" />
      ) : (
        <img
          alt={anime.title.romaji}
          src={imageUrl}
          className="h-10 w-10 flex-shrink-0 rounded-[0.19rem] object-cover"
        />
      )}

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
};

export default AnimeFinder;
