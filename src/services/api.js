import axios from "axios";
const clientId = "6INEhh2KvuOePKRcJXHr6UyJuAaPU1_-BJ04qeaHgBY"
export const LIMIT = 10;

export const requestPhotos = async (searchQuery, page) => {
  const params = new URLSearchParams({
    client_id: clientId,
    query: searchQuery,
    page,
    per_page: LIMIT,
  });

  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?${params.toString()}`
  );
  return data;
};

