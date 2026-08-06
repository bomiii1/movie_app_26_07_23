import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Clock3, Play, Star, TvMinimalPlay } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  getCredits,
  getDetail,
  getMoviesByGenre,
  getVideos,
  getWatchProviders,
} from "../../api/MovieApi";

import { Img500URL, OriginalURL } from "../../constants/imgBaseUrl";
import Loading from "../../components/Loading";
import ErrorPage from "../ErrorPage";
import PageTitle from "../../components/PageTitle";
import Similar from "./components/Similar";

import "swiper/css";

export default function Movie() {
  const { id } = useParams();

  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        if (!/^\d+$/.test(id)) {
          setError(true);
          return;
        }

        const movieData = await getDetail(id);

        if (movieData.success === false || movieData.status_code === 34) {
          setError(true);
          return;
        }

        const firstGenreId = movieData.genres?.[0]?.id;

        const [creditsData, videoData, providerData, genreData] =
          await Promise.all([
            getCredits(id),
            getVideos(id),
            getWatchProviders(id),
            firstGenreId
              ? getMoviesByGenre(firstGenreId)
              : Promise.resolve({ results: [] }),
          ]);

        const filteredGenreMovies = genreData.results
          .filter((item) => item.id !== movieData.id)
          .filter((item) => item.poster_path)
          .slice(0, 8);

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videoData);
        setWatchProviders(providerData);
        setGenreMovies(filteredGenreMovies);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (error) {
    return <ErrorPage />;
  }

  if (loading || !movie || !credits || !videos || !watchProviders) {
    return <Loading />;
  }

  const directors = credits.crew.filter(
    (person) => person.job === "Director",
  );

  const director = directors[0];

  const cast = credits.cast.slice(0, 6);

  const officialTrailers = videos.results.filter(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official,
  );

  const trailers = videos.results.filter(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer",
  );

  const youtubeVideos = videos.results.filter(
    (video) => video.site === "YouTube",
  );

  const trailer =
    officialTrailers[0] ||
    trailers[0] ||
    youtubeVideos[0];

  const krProviders = watchProviders.results?.KR;

  const streamingProviders = krProviders?.flatrate || [];

  return (
    <>
      <PageTitle title={movie.title} />

      <div>
        <section
          className="
            relative overflow-hidden
            pt-[64px]
            md:pt-[72px]
            lg:pt-[80px]
          "
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: movie.backdrop_path
                ? `url(${OriginalURL + movie.backdrop_path})`
                : "none",
            }}
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black/75" />

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/30 to-black/40" />

          <div
            className="
              relative z-10 flex flex-col items-center gap-8
              px-[20px] py-[40px]
              md:flex-row md:items-start md:justify-between
              md:gap-10 md:px-[25px] md:py-[50px]
              lg:gap-12 lg:px-[80px] lg:py-[70px]
              xl:px-[150px]
            "
          >
            <div className="w-[230px] md:w-[30%] lg:w-[28%]">
              {movie.poster_path ? (
                <img
                  src={Img500URL + movie.poster_path}
                  alt={movie.title}
                  className="w-full rounded-[5px] object-cover"
                />
              ) : (
                <div className="flex h-[345px] w-full items-center justify-center rounded-[5px] bg-white/10 text-sm text-white/50 md:h-[400px] lg:h-[480px]">
                  포스터 없음
                </div>
              )}

              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-3 flex w-full items-center justify-center gap-2
                    rounded-[5px] bg-red-500 py-3
                    text-sm font-bold text-white transition
                    hover:bg-red-800
                    md:mt-4
                    lg:mt-5 lg:py-4 lg:text-[16px]
                  "
                >
                  <Play className="h-5 w-5 fill-white" />
                  예고편 보러 가기
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="
                    mt-3 flex w-full items-center justify-center gap-2
                    rounded-[5px] bg-white/10 py-3
                    text-xs font-bold text-white/40
                    md:mt-4
                    lg:mt-5 lg:py-4 lg:text-sm
                  "
                >
                  <Play className="h-5 w-5" />
                  등록된 예고편 없음
                </button>
              )}

              <div className="mt-7">
                <h2 className="flex items-center gap-2 text-sm font-bold text-white lg:text-lg">
                  <TvMinimalPlay className="h-5 w-5 text-white/70 lg:h-6 lg:w-6" />
                  시청 가능한 플랫폼
                </h2>

                {krProviders ? (
                  <div className="mt-4">
                    {streamingProviders.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {streamingProviders.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="flex flex-col items-center gap-2"
                          >
                            <img
                              src={Img500URL + provider.logo_path}
                              alt={provider.provider_name}
                              className="h-[35px] w-[35px] rounded-full object-cover lg:h-[42px] lg:w-[42px]"
                            />

                            <span className="w-[70px] text-center text-[10px] font-semibold text-white lg:text-xs">
                              {provider.provider_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-white/50">
                        스트리밍 정보가 없습니다.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-white/50">
                    정보가 없습니다.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full text-white md:w-[62%] lg:w-[65%]">
              <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:gap-3">
                <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                  {movie.title}
                </h1>

                <p className="text-xs text-white/60 md:text-sm lg:text-[16px]">
                  {movie.original_title}
                </p>
              </div>

              <p className="mt-5 text-sm text-white/80 md:text-[15px] lg:text-[16px]">
                {movie.overview || "등록된 줄거리가 없습니다."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      rounded-full border border-white/20
                      bg-white/10 px-3 py-1.5
                      text-xs text-white/85
                      lg:px-4 lg:py-2 lg:text-[13px]
                    "
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-8 lg:gap-5">
                <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-4 lg:px-5 lg:py-5">
                  <span className="text-[10px] text-white/50 lg:text-xs">
                    평점
                  </span>

                  <span className="mt-2 flex items-center gap-2 text-[16px] font-bold lg:mt-3 lg:text-xl">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                    {movie.vote_average
                      ? movie.vote_average.toFixed(1)
                      : "정보 없음"}
                  </span>
                </div>

                <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-4 lg:px-5 lg:py-5">
                  <span className="text-[10px] text-white/50 lg:text-xs">
                    러닝타임
                  </span>

                  <span className="mt-2 flex items-center gap-2 text-[16px] font-bold lg:mt-3 lg:text-xl">
                    <Clock3 className="h-5 w-5 text-white/70" />

                    {movie.runtime
                      ? `${movie.runtime}분`
                      : "정보 없음"}
                  </span>
                </div>

                <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-4 lg:px-5 lg:py-5">
                  <span className="text-[10px] text-white/50 lg:text-xs">
                    개봉
                  </span>

                  <span className="mt-2 flex items-center gap-2 text-[16px] font-bold lg:mt-3 lg:text-xl">
                    <CalendarDays className="h-5 w-5 text-white/70" />

                    {movie.release_date || "정보 없음"}
                  </span>
                </div>
              </div>

              {movie.tagline && (
                <div className="mt-6 flex justify-center lg:mt-8">
                  <p className="text-center text-lg font-light italic text-white/85 md:text-xl lg:text-2xl">
                    “{movie.tagline}”
                  </p>
                </div>
              )}

              <div className="mt-8 border-t border-white/15 pt-6 lg:mt-10 lg:pt-8">
                <div className="flex flex-col gap-8">
                  <div>
                    <h2 className="mb-4 text-xs font-semibold text-white/50">
                      DIRECTOR
                    </h2>

                    {director ? (
                      <Link to={`/profile/${director.id}`}>
                        <div className="flex items-center gap-4">
                          {director.profile_path ? (
                            <img
                              src={Img500URL + director.profile_path}
                              alt={director.name}
                              className="h-[100px] w-[70px] rounded-[5px] object-cover transition hover:scale-105 lg:h-[130px] lg:w-[90px]"
                            />
                          ) : (
                            <div className="flex h-[100px] w-[70px] items-center justify-center rounded-[5px] bg-white/10 px-2 text-center text-[10px] text-white/40 lg:h-[130px] lg:w-[90px]">
                              이미지 없음
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-bold">
                              {director.name}
                            </p>

                            <p className="mt-2 text-xs text-white/45">
                              Director
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <p className="text-sm text-white/45">
                        감독 정보 없음
                      </p>
                    )}
                  </div>

                  <div>
                    <h2 className="mb-4 text-xs font-semibold text-white/50">
                      CAST
                    </h2>

                    <Swiper
                      slidesPerView={3.2}
                      spaceBetween={12}
                      breakpoints={{
                        768: {
                          slidesPerView: 4.2,
                          spaceBetween: 15,
                        },
                        1024: {
                          slidesPerView: 5.2,
                          spaceBetween: 15,
                        },
                      }}
                    >
                      {cast.map((person) => (
                        <SwiperSlide key={person.cast_id || person.id}>
                          <Link to={`/profile/${person.id}`}>
                            <div className="pb-4">
                              {person.profile_path ? (
                                <img
                                  src={Img500URL + person.profile_path}
                                  alt={person.name}
                                  className="w-full rounded-[5px] object-cover transition hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-[120px] w-full items-center justify-center rounded-[5px] bg-white/10 px-2 text-center text-[10px] text-white/40 md:h-[140px] lg:h-[160px]">
                                  이미지 없음
                                </div>
                              )}

                              <p className="mt-2 text-xs font-bold lg:text-[13px]">
                                {person.name}
                              </p>

                              <p className="mt-1 text-[10px] text-white/45 lg:text-[11px]">
                                {person.character
                                  ? `${person.character} 역`
                                  : "배역 정보 없음"}
                              </p>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Similar
          movies={genreMovies}
          genreName={movie.genres?.[0]?.name}
        />
      </div>
    </>
  );
}