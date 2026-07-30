import { useEffect, useState } from "react";
import {
  getCredits,
  getDetail,
  getSimilar,
  getVideos,
  getWatchProviders,
} from "../../api/MovieApi";
import { Link, useParams } from "react-router-dom";
import { Img500URL, OriginalURL } from "../../constants/imgBaseUrl";
import Loading from "../../components/Loading";
import { CalendarDays, Clock3, Play, Star, TvMinimalPlay } from "lucide-react";

export default function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const [movieData, creditsData, videoData, similarData, providerData] =
        await Promise.all([
          getDetail(id),
          getCredits(id),
          getVideos(id),
          getSimilar(id),
          getWatchProviders(id),
        ]);

      setMovie(movieData);
      setCredits(creditsData);
      setVideos(videoData);
      setSimilarMovies(similarData.results.slice(0, 8));
      setWatchProviders(providerData);
    };

    getMovie();
  }, [id]);

  if (!movie || !credits || !videos || !similarMovies || !watchProviders) {
    return <Loading />;
  }

  const director = credits.crew.find((person) => person.job === "Director");

  const cast = credits.cast.slice(0, 6);

  const trailer =
    videos.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ||
    videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ||
    videos.results.find((video) => video.site === "YouTube");

  const krProviders = watchProviders.results?.KR;

  const streamingProviders = krProviders?.flatrate || [];
  const rentProviders = krProviders?.rent || [];
  const buyProviders = krProviders?.buy || [];

  return (
    <div>
      <section className="relative mt-[80px] min-h-[calc(100vh-80px)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${OriginalURL + movie.backdrop_path})`
              : "none",
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

        <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-start gap-12 px-[150px] py-20">
          <div className="w-[320px] shrink-0">
            {movie.poster_path ? (
              <img
                src={Img500URL + movie.poster_path}
                alt={movie.title}
                className="w-full rounded-2xl object-cover shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-2xl bg-white/10 text-white/50">
                포스터 없음
              </div>
            )}

            {trailer ? (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-4 text-[16px] font-bold text-white transition hover:bg-red-800 active:scale-95 transition-all"
              >
                <Play className="w-[20px] fill-white" />
                예고편 보러 가기
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-4 text-[16px] font-bold text-white/40"
              >
                <Play className="w-[20px]" />
                등록된 예고편 없음
              </button>
            )}

            <section className="mt-10 pt-8">
              <h2 className="text-[20px] flex items-center gap-2 font-bold text-white">
                <TvMinimalPlay className="text-white/70" />
                시청 가능한 플랫폼
              </h2>

              {krProviders ? (
                <div className="mt-6 space-y-7">
                  {streamingProviders.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {streamingProviders.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="flex flex-col justify-centeritems-center gap-3 px-3 py-3"
                          >
                            <img
                              src={Img500URL + provider.logo_path}
                              alt={provider.provider_name}
                              className="h-[42px] w-[42px] rounded-full object-cover "
                            />

                            <span className="text-[14px] font-semibold text-white">
                              {provider.provider_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-[14px] text-white/50">
                  정보가 없습니다.
                </p>
              )}
            </section>
          </div>

          <div className="w-full min-w-0 text-white">
            <div className="flex flex-wrap items-end gap-3">
              <h1 className="text-5xl font-bold">{movie.title}</h1>

              <p className="pb-1 text-[18px] text-white/60">
                {movie.original_title}
              </p>
            </div>

            <p className="mt-5 max-w-[900px] text-[16px] leading-[27px] tracking-tight text-white/85">
              {movie.overview || "등록된 줄거리 정보가 없습니다."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] text-white/85 backdrop-blur-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mt-8 grid w-full grid-cols-3 gap-5">
              <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-5 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-[2px] text-white/50">
                  평점
                </span>

                <span className="mt-3 flex items-center gap-2 text-[22px] font-bold">
                  <Star className="w-[20px] fill-yellow-400 text-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-5 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-[2px] text-white/50">
                  러닝타임
                </span>

                <span className="mt-3 flex items-center gap-2 text-[22px] font-bold">
                  <Clock3 className="w-[20px] text-white/70" />
                  {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-5 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-[2px] text-white/50">
                  개봉
                </span>

                <span className="mt-3 flex items-center gap-2 text-[22px] font-bold">
                  <CalendarDays className="w-[20px] text-white/70" />
                  {movie.release_date || "정보 없음"}
                </span>
              </div>
            </div>

            {movie.tagline && (
              <div className="mt-8 flex justify-center">
                <p className="mt-2 text-[28px] font-light italic text-white/85">
                  “{movie.tagline}”
                </p>
              </div>
            )}

            <div className="mt-10 border-t w-full flex justify-center border-white/15 pt-8">
              <div className="flex items-start gap-20">
                <div>
                  <h2 className="mb-4 text-[13px] font-semibold tracking-[3px] text-white/50">
                    DIRECTOR
                  </h2>

                  <Link to={`/profile/${director.id}`}>
                    <div className="flex flex-col gap-4">
                      {director?.profile_path ? (
                        <img
                          src={Img500URL + director.profile_path}
                          alt={director.name}
                          className="h-[150px] w-[110px] rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-[150px] w-[110px] items-center justify-center rounded-xl bg-white/10 px-2 text-center text-[11px] text-white/40">
                          이미지 없음
                        </div>
                      )}

                      <div>
                        <p className="text-[13px] font-bold">{director.name}</p>

                        <p className="mt-2 text-[11px] text-white/45">
                          Director
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="mb-4 text-[13px] font-semibold tracking-[3px] text-white/50">
                    CAST
                  </h2>

                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {cast.map((person) => (
                      <Link to={`/profile/${person.id}`}>
                        <div
                          key={person.cast_id || person.id}
                          className="w-[110px] shrink-0"
                        >
                          {person.profile_path ? (
                            <img
                              src={Img500URL + person.profile_path}
                              alt={person.name}
                              className="h-[150px] w-[110px] rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-[150px] w-[110px] items-center justify-center rounded-xl bg-white/10 px-2 text-center text-[11px] text-white/40">
                              이미지 없음
                            </div>
                          )}

                          <p className="mt-2 truncate text-[13px] font-bold">
                            {person.name}
                          </p>

                          <p className="mt-1 truncate text-[11px] text-white/45">
                            {person.character
                              ? `${person.character} 역`
                              : "배역 정보 없음"}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <h2 className="mt-[100px] px-[150px] font-bold text-3xl">
          '{movie.title}'와 비슷한 영화
        </h2>

        <div></div>
      </div>
    </div>
  );
}
