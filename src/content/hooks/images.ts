import { useEffect, useState } from "react";

import type { FetchMessageSchema } from "../schema/message";

export const useImage = (src: string) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);

      const dataUrl = await browser.runtime.sendMessage({
        type: "image",
        src,
      } satisfies FetchMessageSchema);

      setIsLoading(false);

      setImageUrl(dataUrl);
    };

    fetchImage();
  }, [src]);

  return { imageUrl, isLoading };
};
