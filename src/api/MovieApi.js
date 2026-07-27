const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

export const getPopular = () => {
  return fetch("https://api.themoviedb.org/3/movie/popular", options);
};

export const getNowPlaying = () => {
  return fetch("https://api.themoviedb.org/3/movie/now_playing", options);
};

console.log(getPopular);
