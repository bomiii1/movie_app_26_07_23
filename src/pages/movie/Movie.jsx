import { useEffect, useState } from "react";
import {
  getCredits,
  getDetail,
  getMoviesByGenre,
  getVideos,
  getWatchProviders,
} from "../../api/MovieApi";
import { Link, useParams } from "react-router-dom";
import { Img500URL, OriginalURL } from "../../constants/imgBaseUrl";
import Loading from "../../components/Loading";
import { CalendarDays, Clock3, Play, Star, TvMinimalPlay } from "lucide-react";
import Similar from "./components/Similar";

export default function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const movieData = await getDetail(id);
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
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (loading || !movie || !credits || !videos || !watchProviders) {
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

  return (
    <div>
      <section className="relative pt-[80px] h-auto pt-[30px] pb-[50px] overflow-hidden">
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

        <div
          className="relative z-10 flex h-[100vh] items-start
          xl:px-[150px]
          lg:px-[80px]
          md:px-[20px]
          px-[20px]

          gap-[30px]
          xl:gap-15
          lg:gap-12
          md:gap-10
          "
        >
          <div className="w-[40%]">
            {movie.poster_path ? (
              <img
                src={Img500URL + movie.poster_path}
                alt={movie.title}
                className="w-full rounded-[5px] object-cover shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-[5px] bg-white/10 text-white/50">
                포스터 없음
              </div>
            )}

            {trailer ? (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-red-500 font-bold  text-white transition-all hover:bg-red-800 active:scale-95
                xl:mt-5 
                lg:mt-4
                md:mt-3
                mt-3
                
                xl:text-[16px]
                lg:text-[14px]
                md:text-[12px] 
                text-[10px]
                
                xl:py-4 
                lg:py-3
                md:py-2
                py-2"
              >
                <Play className="w-[20px] fill-white" />
                예고편 보러 가기
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full items-center justify-center gap-[2px] rounded-xl bg-white/10 font-bold text-white/40
                xl:mt-5 
                lg:mt-4
                md:mt-3
                mt-3
                
                xl:text-[16px]
                lg:text-[14px]
                md:text-[12px] 
                text-[8px]
                
                xl:py-4 
                lg:py-3
                md:py-2
                py-2
                
                "
              >
                <Play className="w-[20px]" />
                등록된 예고편 없음
              </button>
            )}

            <section className="xl:mt-5 mt-2 pt-8">
              <h2 className="flex items-center gap-2 xl:text-[20px] text-[10px] xl:font-bold font-semibold text-white">
                <TvMinimalPlay className="text-white/70 xl:w-[30px] w-[15px]" />
                시청 가능한 플랫폼
              </h2>

              {krProviders ? (
                <div className="xl:mt-6 mt-1 space-y-7">
                  {streamingProviders.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {streamingProviders.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className="flex flex-col items-center justify-center xl:gap-3 gap-1.5 xl:px-3 xl:py-3 px-1 py-1"
                        >
                          <img
                            src={Img500URL + provider.logo_path}
                            alt={provider.provider_name}
                            className="xl:h-[42px] xl:w-[42px] h-[25px] w-[25px] rounded-full object-cover"
                          />

                          <span className="xl:text-[14px] text-[10px] font-semibold text-white">
                            {provider.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-[14px] text-white/50">
                      스트리밍 정보가 없습니다.
                    </p>
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
            <div className="flex flex-wrap items-end">
              <h1
                className="font-bold
              xl:text-5xl 
              lg:text-3xl
              text-[24px]
              mr-3"
              >
                {movie.title}
              </h1>

              <p
                className="
              
              text-white/60
              
               xl:text-[18px]
              lg:text-[14px]
              md:text-[12px] 
              text-[10px]"
              >
                {movie.original_title}
              </p>
            </div>

            <p
              className="w-full p-2 tracking-tight text-white/80

              xl:mt-5
              mt-[5px]

              xl:text-[16px]
              lg:text-[15px]
              md:text-[14px] 
              text-[12px]
            
              xl:leading-[27px]
              lg:leading-[25px]
              md:leading-[22px]
              leading-[18px]"
            >
              {movie.overview}
            </p>

            <div
              className=" flex flex-wrap gap-2
            xl:mt-6
            lg:mt-5
            md:mt-3
            mt-2"
            >
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/85 backdrop-blur-sm
                  xl:text-[13px]
                  lg:text-[13px]
                  md:text-[12px]
                  text-[10px]
                  "
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="xl:mt-8 mt-4 grid w-full grid-cols-3 xl:gap-5 gap-2">
              <div className="rounded-[5px] border border-white/10 bg-black/30 xl:px-5 px-3 xl:py-5 py-2 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-[2px] text-white/50">
                  평점
                </span>

                <span className="mt-3 flex items-center gap-2 xl:text-[22px] text-[14px] font-bold">
                  <Star className="w-[20px] fill-yellow-400 text-yellow-400" />

                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "정보 없음"}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 xl:px-5 px-3 xl:py-5 py-2 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-[2px] text-white/50">
                  러닝타임
                </span>

                <span className="mt-3 flex items-center gap-2 xl:text-[22px] text-[14px] font-bold">
                  <Clock3 className="w-[20px] text-white/70" />

                  {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 xl:px-5 px-3 xl:py-5 py-2 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-[2px] text-white/50">
                  개봉
                </span>

                <span className="mt-3 flex items-center gap-2 xl:text-[22px] text-[14px] font-bold">
                  <CalendarDays className="w-[20px] text-white/70" />

                  {movie.release_date || "정보 없음"}
                </span>
              </div>
            </div>

            {movie.tagline && (
              <div className="xl:mt-8 mt-3 flex justify-center">
                <p className="mt-2 xl:text-[28px] text-[15px] font-light italic text-white/85">
                  “{movie.tagline}”
                </p>
              </div>
            )}

            <div className="xl:mt-10 mt-5 w-full border-t border-white/15 xl:pt-8 pt-4">
              <div className="flex w-full flex-col xl:gap-8 gap-5 xl:flex-row xl:items-start xl:justify-end xl:gap-20">
                {/* 감독 */}
                <div>
                  <h2 className="xl:mb-4 mb-3 text-[13px] font-semibold tracking-[3px] text-white/50">
                    DIRECTOR
                  </h2>

                  {director ? (
                    <Link to={`/profile/${director.id}`}>
                      <div className="group flex xl:items-center items-end xl:gap-4 gap-3 overflow-hidden xl:flex-col xl:items-start">
                        {director.profile_path ? (
                          <img
                            src={Img500URL + director.profile_path}
                            alt={director.name}
                            className="h-[100px] w-[65px] rounded-[5px] object-cover transition duration-200 group-hover:scale-105 xl:h-[150px] xl:w-[110px]"
                          />
                        ) : (
                          <div className="flex h-[100px] w-[65px] items-center justify-center rounded-xl bg-white/10 px-2 text-center text-[11px] text-white/40 xl:h-[150px] xl:w-[110px]">
                            이미지 없음
                          </div>
                        )}

                        <div>
                          <p className="text-[13px] font-bold">
                            {director.name}
                          </p>

                          <p className="mt-2 text-[11px] text-white/45">
                            Director
                          </p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <p className="text-[13px] text-white/45">감독 정보 없음</p>
                  )}
                </div>

                {/* 출연 */}
                <div className="min-w-0 flex-1">
                  <h2 className="mb-4 text-[13px] font-semibold tracking-[3px] text-white/50">
                    CAST
                  </h2>

                  <div className="flex w-full gap-4  pb-4">
                    {cast.map((person) => (
                      <Link
                        key={person.cast_id || person.id}
                        to={`/profile/${person.id}`}
                      >
                        <div className="group w-[65px] xl:w-[110px]">
                          {person.profile_path ? (
                            <img
                              src={Img500URL + person.profile_path}
                              alt={person.name}
                              className="h-[100px] w-[65px] rounded-xl object-cover transition duration-200 group-hover:scale-105 xl:h-[150px] xl:w-[110px]"
                            />
                          ) : (
                            <div className="flex h-[100px] w-[65px] items-center justify-center rounded-xl bg-white/10 px-2 text-center text-[11px] text-white/40 xl:h-[150px] xl:w-[110px]">
                              이미지 없음
                            </div>
                          )}

                          <p className="mt-2 truncate text-[12px] font-bold xl:text-[13px]">
                            {person.name}
                          </p>

                          <p className="mt-1 truncate text-[10px] text-white/45 xl:text-[11px]">
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

      <Similar movies={genreMovies} genreName={movie.genres?.[0]?.name} />
    </div>
  );
}
