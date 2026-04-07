import axios from "axios";

const BASE_URL = "https://api.imdbapi.dev/titles?limit=20";

export const fetchMovies = async () => {
  try {
    const res = await axios.get(BASE_URL);

    console.log("API DATA:", res.data);
    return res.data.titles || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};