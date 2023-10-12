export const fetchQuery = async (query: string) => {
  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const response = await fetch(url, options);

  return response.json();
};

export const fetchImage = async (src: string): Promise<string> => {
  const reader = new FileReader();

  let blob;

  const options = { headers: { Accept: "image/*" } };
  const response = await fetch(src, options);

  if (response.ok) {
    blob = await response.blob();
  } else {
    const placeholder = browser.runtime.getURL(
      "content/assets/1535428962747.png",
    );

    blob = await (await fetch(placeholder)).blob();
  }

  const promise = new Promise<string>((resolve) => {
    reader.onload = () =>
      resolve(typeof reader.result === "string" ? reader.result : "");
  });

  reader.readAsDataURL(blob);

  return promise;
};
