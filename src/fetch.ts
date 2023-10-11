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

export const fetchImage = async (src: string) => {
  const options = { headers: { Accept: "image/*" } };
  const response = await fetch(src, options);

  return await response.blob();
};
