import { Link } from "react-router-dom";
import { OriginalURL } from "../../../constants/imgBaseUrl";
import { GENRES } from "../../../constants/genres";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./HeroSection.css";

export default function HeroSection({ movies }) {
  const top5Movie = movies?.slice(0, 5);

  return (
    <section
      className="
        hero-section
        pt-[64px]
        md:pt-[72px]
        lg:pt-[80px]
      "
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={1500}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        className="hero-swiper"
      >
        {top5Movie?.map((movie) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={OriginalURL + movie.backdrop_path}
                  alt={movie.title}
                  className={`hero-bg h-full w-full object-cover ${
                    isActive ? "hero-bg-active" : ""
                  }`}
                />

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                <div
                  className="
                    absolute bottom-[70px] left-[20px] z-20
                    right-[20px]
                    md:bottom-[80px] md:left-[25px] md:right-[25px]
                    lg:bottom-[100px] lg:left-[80px] lg:right-auto
                    xl:left-[150px]
                  "
                >
                  <h2
                    className="
                      mb-1.5 text-3xl font-bold
                      md:text-4xl
                      lg:text-5xl
                      xl:text-6xl
                    "
                  >
                    {movie.title}
                  </h2>

                  <p className="text-sm text-white/60 md:16px">
                    {movie.original_title}
                  </p>

                  <div
                    className="
                      mt-4 flex flex-wrap items-center gap-3
                      text-sm
                      md:mt-6 md:gap-5 md:16px
                    "
                  >
                    <p>
                      {movie.genre_ids
                        ?.map((id) => GENRES[id])
                        .filter(Boolean)
                        .join(" · ")}
                    </p>

                    <div className="h-[16px] w-[1px] bg-white/50 md:h-[20px]" />

                    <p>{movie.release_date?.slice(0, 4)}</p>
                  </div>

                  <Link to={`/movie/${movie.id}`}>
                    <button
                      className="
                        mt-5 cursor-pointer rounded-xl border
                        bg-white/20 px-6 py-2 text-sm
                        backdrop-blur-sm transition
                        hover:bg-white/40
                        md:mt-8 md:px-8 md:py-2.5 md:16px
                      "
                    >
                      상세정보
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
