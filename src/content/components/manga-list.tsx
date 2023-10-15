import { useImage } from "../hooks/images";

import type { Manga } from "../schemas";

type Props = {
  manga: Manga[];
  thereIsMore: boolean;
  searchText: string;
};

const MangaList = ({ manga, thereIsMore, searchText: text }: Props) => {
  if (manga.length < 1) {
    return;
  }

  return (
    <div className="dokodemo-relative">
      <h1 className="dokodemo-absolute -dokodemo-top-[28px] dokodemo-left-0 dokodemo-text-[14px] dokodemo-font-semibold dokodemo-text-slate-200">
        Manga
      </h1>

      <ul className="dokodemo-flex dokodemo-min-h-full dokodemo-flex-col dokodemo-overflow-hidden dokodemo-rounded-md dokodemo-bg-white">
        {manga.map((manga) => (
          <li key={manga.id}>
            <MangaCard manga={manga} />
          </li>
        ))}

        {thereIsMore && (
          <li className="dokodemo-mb-0 dokodemo-mt-auto">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://anilist.co/search/manga?search=${text}&sort=SEARCH_MATCH`}
              className="dokodemo-block dokodemo-w-full dokodemo-py-[10px] dokodemo-text-center dokodemo-text-[13px] dokodemo-font-semibold dokodemo-leading-[14px] dokodemo-text-slate-500 dokodemo-transition-colors hover:dokodemo-bg-sky-400 hover:dokodemo-text-white"
            >
              View all manga results
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

const MangaCard = ({ manga }: { manga: Manga }) => {
  const { imageUrl, isLoading } = useImage(manga.coverImage.medium);

  return (
    <a
      href={`https://anilist.co/manga/${manga.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="dokodemo-group dokodemo-flex dokodemo-items-center dokodemo-justify-start dokodemo-gap-[12px] dokodemo-px-[20px] dokodemo-pb-[12px] dokodemo-pt-[15px] dokodemo-transition-colors hover:dokodemo-bg-sky-400"
    >
      {isLoading ? (
        <div className="dokodemo-h-[40px] dokodemo-w-[40px] dokodemo-animate-pulse dokodemo-rounded-[3px] dokodemo-bg-gray-400" />
      ) : (
        <img
          alt={manga.title.romaji}
          src={imageUrl}
          className="dokodemo-h-[40px] dokodemo-w-[40px] dokodemo-shrink-0 dokodemo-rounded-[3px] dokodemo-object-cover"
        />
      )}

      <div className="dokodemo-flex dokodemo-max-w-[calc(100%-40px-4px)] dokodemo-flex-col dokodemo-justify-center dokodemo-gap-[4px]">
        <h2 className="dokodemo-inline-block dokodemo-truncate dokodemo-text-[15px] dokodemo-font-semibold dokodemo-text-slate-500 group-hover:dokodemo-text-white">
          {manga.title.romaji}
        </h2>
        <div className="dokodemo-text-[12px] dokodemo-font-medium dokodemo-text-slate-400 group-hover:dokodemo-text-slate-200">
          {manga.startDate.year} {manga.format}
        </div>
      </div>
    </a>
  );
};

export default MangaList;
