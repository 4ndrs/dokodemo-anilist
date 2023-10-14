import { useImage } from "../hooks/images";
import { useEffect, useState } from "react";
import { StaffResponseSchema } from "../schemas/response";

import type { Staff } from "../schemas/staff";
import type { FetchMessageSchema } from "../schemas/message";

const StaffFinder = ({ text }: { text: string }) => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [thereIsMore, setThereIsMore] = useState(false);

  useEffect(() => {
    if (!text) {
      setStaff([]);

      return;
    }

    const query = `
      {
        Page (page:1, perPage: 8) {
          pageInfo {
            hasNextPage
          }
          staff (search: "${text}") {
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

      const result = StaffResponseSchema.safeParse(data);

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

      setStaff(result.data.data.Page.staff);
      setThereIsMore(result.data.data.Page.pageInfo.hasNextPage);
    };

    cheerioooooooooo();
  }, [text]);

  if (staff.length < 1) {
    return;
  }

  return (
    <div className="dokodemo-relative">
      <h1 className="dokodemo-absolute -dokodemo-top-[28px] dokodemo-left-0 dokodemo-text-[14px] dokodemo-font-semibold dokodemo-text-slate-200">
        Staff
      </h1>

      <ul className="dokodemo-overflow-hidden dokodemo-rounded-md dokodemo-bg-white">
        {staff.map((staff) => (
          <li key={staff.id}>
            <StaffCard staff={staff} />
          </li>
        ))}

        {thereIsMore && (
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://anilist.co/search/staff?search=${text}&sort=SEARCH_MATCH`}
              className="dokodemo-block dokodemo-w-full dokodemo-py-[10px] dokodemo-text-center dokodemo-text-[13px] dokodemo-font-semibold dokodemo-leading-[14px] dokodemo-text-slate-500 dokodemo-transition-colors hover:dokodemo-bg-sky-400 hover:dokodemo-text-white"
            >
              View all staff results
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

const StaffCard = ({ staff }: { staff: Staff }) => {
  const { imageUrl, isLoading } = useImage(staff.image.medium);

  return (
    <a
      href={`https://anilist.co/staff/${staff.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="dokodemo-group dokodemo-flex dokodemo-items-center dokodemo-justify-start dokodemo-gap-[12px] dokodemo-px-[20px] dokodemo-pb-[12px] dokodemo-pt-[15px] dokodemo-transition-colors hover:dokodemo-bg-sky-400"
    >
      {isLoading ? (
        <div className="dokodemo-h-[40px] dokodemo-w-[40px] dokodemo-animate-pulse dokodemo-rounded-[3px] dokodemo-bg-gray-400" />
      ) : (
        <img
          alt={staff.name.full}
          src={imageUrl}
          className="dokodemo-h-[40px] dokodemo-w-[40px] dokodemo-shrink-0 dokodemo-rounded-[3px] dokodemo-object-cover"
        />
      )}

      <div className="dokodemo-flex dokodemo-max-w-[calc(100%-40px-4px)] dokodemo-flex-col dokodemo-justify-center dokodemo-gap-[4px]">
        <h2 className="dokodemo-inline-block dokodemo-truncate dokodemo-text-[15px] dokodemo-font-semibold dokodemo-text-slate-500 group-hover:dokodemo-text-white">
          {staff.name.full}
        </h2>
      </div>
    </a>
  );
};

export default StaffFinder;
