import { useEffect, useState } from "react";
import { StudioResponseSchema } from "../schemas/response";

import type { FetchMessageSchema } from "../schemas/message";
import type { Studio } from "../schemas/studio";

type Props = { text: string; onLoadingChange: (loading: boolean) => void };

const StudioFinder = ({ text, onLoadingChange }: Props) => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [thereIsMore, setThereIsMore] = useState(false);

  useEffect(() => {
    if (!text) {
      setStudios([]);

      return;
    }

    const query = `
      {
        Page (page:1, perPage: 8) {
          pageInfo {
            hasNextPage
          }
          studios (search: "${text}") {
            id
            name 
          }
        }
      }
    `;

    const cheerioooooooooo = async () => {
      onLoadingChange(true);

      const data = await browser.runtime.sendMessage({
        type: "query",
        query,
      } satisfies FetchMessageSchema);

      onLoadingChange(false);

      const result = StudioResponseSchema.safeParse(data);

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

      setStudios(result.data.data.Page.studios);
      setThereIsMore(result.data.data.Page.pageInfo.hasNextPage);
    };

    cheerioooooooooo();
  }, [text, onLoadingChange]);

  if (studios.length < 1) {
    return;
  }

  return (
    <div className="dokodemo-relative">
      <h1 className="dokodemo-absolute -dokodemo-top-[28px] dokodemo-left-0 dokodemo-text-[14px] dokodemo-font-semibold dokodemo-text-slate-200">
        Studios
      </h1>

      <ul className="dokodemo-flex dokodemo-min-h-full dokodemo-flex-col dokodemo-overflow-hidden dokodemo-rounded-md dokodemo-bg-white">
        {studios.map((studio) => (
          <li key={studio.id}>
            <StudioCard studio={studio} />
          </li>
        ))}

        {thereIsMore && (
          <li className="dokodemo-mb-0 dokodemo-mt-auto">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://anilist.co/search/studios?search=${text}&sort=SEARCH_MATCH`}
              className="dokodemo-block dokodemo-w-full dokodemo-py-[10px] dokodemo-text-center dokodemo-text-[13px] dokodemo-font-semibold dokodemo-leading-[14px] dokodemo-text-slate-500 dokodemo-transition-colors hover:dokodemo-bg-sky-400 hover:dokodemo-text-white"
            >
              View all studio results
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

const StudioCard = ({ studio }: { studio: Studio }) => (
  <a
    href={`https://anilist.co/studio/${studio.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="dokodemo-group dokodemo-flex dokodemo-items-center dokodemo-justify-start dokodemo-gap-[12px] dokodemo-px-[20px] dokodemo-pb-[12px] dokodemo-pt-[15px] dokodemo-transition-colors hover:dokodemo-bg-sky-400"
  >
    <div className="dokodemo-flex dokodemo-max-w-[calc(100%-40px-4px)] dokodemo-flex-col dokodemo-justify-center dokodemo-gap-[4px]">
      <h2 className="dokodemo-inline-block dokodemo-truncate dokodemo-text-[15px] dokodemo-font-semibold dokodemo-text-slate-500 group-hover:dokodemo-text-white">
        {studio.name}
      </h2>
    </div>
  </a>
);

export default StudioFinder;
