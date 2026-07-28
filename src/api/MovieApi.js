const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

const baseURL = "https://api.themoviedb.org/3/";

const fetchMovie = async (endpoint) => {
  const url = new URL(baseURL + endpoint);

  url.searchParams.set("language", "ko-KR");

  const response = await fetch(url, options);
  return response.json();
};

export const getPopular = () => fetchMovie("movie/popular");
export const getNowPlaying = () => fetchMovie("movie/now_playing");
export const getTopRated = () => fetchMovie("movie/top_rated");
export const getUpcoming = () => fetchMovie("movie/upcoming");
