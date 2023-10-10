const URL = "https://graphql.anilist.co";

const OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

export const fetchQuery = async (query: string) => {
  const response = await fetch(URL, {
    ...OPTIONS,
    body: JSON.stringify({ query }),
  });

  return response.json();
};
