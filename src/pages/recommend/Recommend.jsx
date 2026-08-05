import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dices, Info, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { getTopRatedPage } from "../../api/MovieApi";
import { Img500URL } from "../../constants/imgBaseUrl";
import { GENRES } from "../../constants/genres";
import Loading from "../../components/Loading";

export default function Recommend() {
  const [topMovies, setTopMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getTop50Movies = async () => {
      try {
        const movieData = await Promise.all([
          getTopRatedPage(1),
          getTopRatedPage(2),
          getTopRatedPage(3),
        ]);

        const movies = [
          ...movieData[0].results,
          ...movieData[1].results,
          ...movieData[2].results,
        ].slice(0, 50);

        setTopMovies(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getTop50Movies();
  }, []);

  const getRandomMovie = () => {
    setRolling(true);
    setRandomMovie(null);

    swiper.allowTouchMove = false;

    const totalSteps = Math.floor(Math.random() * 50) + 25;

    const movePoster = (step) => {
      if (step === totalSteps) {
        const selectedMovie = topMovies[swiper.realIndex];

        setRandomMovie(selectedMovie);
        setRolling(false);

        swiper.allowTouchMove = true;

        return;
      }

      const remainingSteps = totalSteps - step;

      let speed = 40;

      if (remainingSteps <= 8) {
        speed = 80 + (8 - remainingSteps) * 35;
      }

      swiper.slideNext(speed);

      setTimeout(() => {
        movePoster(step + 1);
      }, speed + 10);
    };

    movePoster(0);
  };

  if (loading) {
    return <Loading />;
  }

  if (topMovies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        영화를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <main
      className="
        min-h-screen overflow-hidden
        px-[15px] pb-[60px] pt-[90px]
        sm:px-[20px] sm:pt-[100px]
        md:px-[30px] md:pt-[120px]
        lg:px-[80px]
        xl:px-[150px]
      "
    >
      <div className="text-center">
        <p className="text-xs font-bold text-red-500 sm:text-sm">BOM-PICK!</p>

        <h1 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">
          오늘의 추천영화
        </h1>

        <p className="mt-2 text-xs text-white/50 sm:text-sm">
          인기영화 중 하나를 랜덤으로 선택합니다.
        </p>
      </div>

      <div className="relative mx-auto mt-[30px] max-w-[1200px] sm:mt-[40px]">
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides={true}
          loop={true}
          speed={40}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
        >
          {topMovies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              style={{
                width: "75vw",
                maxWidth: "260px",
              }}
            >
              {({ isActive }) => (
                <div
                  className={
                    isActive
                      ? "scale-100 opacity-100 transition"
                      : "scale-90 opacity-40 transition"
                  }
                >
                  {movie.poster_path ? (
                    <img
                      src={Img500URL + movie.poster_path}
                      alt={movie.title}
                      className={
                        isActive
                          ? "aspect-[2/3] w-full rounded-lg border-2 border-red-500 object-cover"
                          : "aspect-[2/3] w-full rounded-lg border-2 border-transparent object-cover"
                      }
                    />
                  ) : (
                    <div
                      className={
                        isActive
                          ? "flex aspect-[2/3] w-full items-center justify-center rounded-lg border-2 border-red-500 bg-white/10 text-sm text-white/50"
                          : "flex aspect-[2/3] w-full items-center justify-center rounded-lg border-2 border-transparent bg-white/10 text-sm text-white/50"
                      }
                    >
                      이미지 없음
                    </div>
                  )}

                  <p className="mt-3 truncate text-center text-sm font-bold sm:16px">
                    {movie.title}
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-[30px] flex justify-center sm:mt-[35px]">
        <button
          type="button"
          onClick={getRandomMovie}
          disabled={rolling}
          className="
            flex items-center justify-center gap-2
            rounded-lg bg-red-500 px-5 py-3
            text-sm font-bold text-white transition
            hover:bg-red-800
            disabled:cursor-not-allowed disabled:bg-gray-600
            sm:px-7 sm:16px
          "
        >
          <Dices className="h-5 w-5" />

          {rolling ? "영화 고르는 중..." : "랜덤 영화 뽑기"}
        </button>
      </div>

      {randomMovie && (
        <section
          className="
            mx-auto mt-[50px] flex w-full max-w-[850px]
            flex-col gap-7 border-t border-white/15 pt-[40px]
            md:mt-[60px] md:flex-row md:items-start
            md:gap-10 md:pt-[50px]
          "
        >
          <div className="mx-auto w-[90%] max-w-[320px] md:w-[35%] md:max-w-[220px]">
            {randomMovie.poster_path ? (
              <img
                src={Img500URL + randomMovie.poster_path}
                alt={randomMovie.title}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center rounded-lg bg-white/10 text-sm text-white/50">
                이미지 없음
              </div>
            )}
          </div>

          <div className="mx-auto w-[90%] max-w-[320px] text-center md:mx-0 md:w-[65%] md:max-w-none md:text-left">
            <p className="text-xs font-bold text-red-500 sm:text-sm">
              오늘의 추천 영화
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
              {randomMovie.title}
            </h2>

            <p className="mt-2 text-xs text-white/50 sm:text-sm">
              {randomMovie.original_title}
            </p>

            <div className="mt-5 flex items-center justify-center gap-4 md:justify-start">
              <p className="flex items-center gap-1 text-sm font-bold sm:16px">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                {randomMovie.vote_average
                  ? randomMovie.vote_average.toFixed(1)
                  : "정보 없음"}
              </p>

              <div className="h-[16px] w-[1px] bg-white/30" />

              <p className="text-sm sm:16px">
                {randomMovie.release_date
                  ? randomMovie.release_date.slice(0, 4)
                  : "정보 없음"}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {randomMovie.genre_ids
                ?.filter((id) => GENRES[id])
                .map((id) => (
                  <span
                    key={id}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {GENRES[id]}
                  </span>
                ))}
            </div>

            <p className="mt-5 w-full break-words text-sm leading-6 text-white/70 sm:16px">
              {randomMovie.overview
                ? randomMovie.overview.length > 100
                  ? randomMovie.overview.slice(0, 100) + "..."
                  : randomMovie.overview
                : "등록된 줄거리가 없습니다."}
            </p>

            <Link
              to={`/movie/${randomMovie.id}`}
              className="
                mt-7 flex w-full items-center justify-center gap-2
                rounded-lg border border-white/30
                px-6 py-3 text-sm font-bold transition
                hover:bg-white/10
                sm:inline-flex sm:w-auto sm:16px
              "
            >
              <Info className="h-5 w-5" />
              상세정보
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
