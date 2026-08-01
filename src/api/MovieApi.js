const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

const baseURL = "https://api.themoviedb.org/3/";

const fetchMovie = async (endpoint, params = {}) => {
  const url = new URL(baseURL + endpoint);

  url.searchParams.set("language", "ko-KR");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("영화 데이터를 불러오지 못했습니다.");
  }

  return response.json();
};

export const getPopular = () => fetchMovie("movie/popular");

export const getNowPlaying = () => fetchMovie("movie/now_playing");

export const getTopRated = () => fetchMovie("movie/top_rated");

export const getUpcoming = () => fetchMovie("movie/upcoming");

export const getDetail = (id) => fetchMovie(`movie/${id}`);

export const getCredits = (id) => fetchMovie(`movie/${id}/credits`);

export const getVideos = (id) => fetchMovie(`movie/${id}/videos`);

export const getWatchProviders = (id) =>
  fetchMovie(`movie/${id}/watch/providers`);

export const getMoviesByGenre = (genreId) =>
  fetchMovie("discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    include_adult: false,
  });
export const getSearch = (keyword) =>
  fetchMovie("search/movie", {
    query: keyword,
    include_adult: false,
  });