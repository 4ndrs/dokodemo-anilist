import { useImage } from "../hooks/images";
import { useEffect, useState } from "react";
import { CharacterResponseSchema } from "../schemas/response";

import type { Character } from "../schemas/character";
import type { FetchMessageSchema } from "../schemas/message";

const CharacterFinder = ({ text }: { text: string }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [thereIsMore, setThereIsMore] = useState(false);

  useEffect(() => {
    if (!text) {
      setCharacters([]);

      return;
    }

    const query = `
      {
        Page (page:1, perPage: 8) {
          pageInfo {
            hasNextPage
          }
          characters (search: "${text}") {
            id
            name {
              full
            }
            image {
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

      const result = CharacterResponseSchema.safeParse(data);

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

      setCharacters(result.data.data.Page.characters);
      setThereIsMore(result.data.data.Page.pageInfo.hasNextPage);
    };

    cheerioooooooooo();
  }, [text]);

  if (characters.length < 1) {
    return;
  }

  return (
    <div className="dokodemo-relative">
      <h1 className="dokodemo-absolute -dokodemo-top-[28px] dokodemo-left-0 dokodemo-text-[14px] dokodemo-font-semibold dokodemo-text-slate-200">
        Characters
      </h1>

      <ul className="dokodemo-min-h-full dokodemo-overflow-hidden dokodemo-rounded-md dokodemo-bg-white">
        {characters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}

        {thereIsMore && (
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://anilist.co/search/characters?search=${text}&sort=SEARCH_MATCH`}
              className="dokodemo-block dokodemo-w-full dokodemo-py-[10px] dokodemo-text-center dokodemo-text-[13px] dokodemo-font-semibold dokodemo-leading-[14px] dokodemo-text-slate-500 dokodemo-transition-colors hover:dokodemo-bg-sky-400 hover:dokodemo-text-white"
            >
              View all character results
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

const CharacterCard = ({ character }: { character: Character }) => {
  const { imageUrl, isLoading } = useImage(character.image.medium);

  return (
    <a
      href={`https://anilist.co/character/${character.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="dokodemo-group dokodemo-flex dokodemo-items-center dokodemo-justify-start dokodemo-gap-[12px] dokodemo-px-[20px] dokodemo-pb-[12px] dokodemo-pt-[15px] dokodemo-transition-colors hover:dokodemo-bg-sky-400"
    >
      {isLoading ? (
        <div className="dokodemo-h-[40px] dokodemo-w-[40px] dokodemo-animate-pulse dokodemo-rounded-[3px] dokodemo-bg-gray-400" />
      ) : (
        <img
          alt={character.name.full}
          src={imageUrl}
          className="dokodemo-h-[40px] dokodemo-w-[40px] dokodemo-shrink-0 dokodemo-rounded-[3px] dokodemo-object-cover"
        />
      )}

      <div className="dokodemo-flex dokodemo-max-w-[calc(100%-40px-4px)] dokodemo-flex-col dokodemo-justify-center dokodemo-gap-[4px]">
        <h2 className="dokodemo-inline-block dokodemo-truncate dokodemo-text-[15px] dokodemo-font-semibold dokodemo-text-slate-500 group-hover:dokodemo-text-white">
          {character.name.full}
        </h2>
      </div>
    </a>
  );
};

export default CharacterFinder;
