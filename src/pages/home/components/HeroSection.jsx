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
  const top5Movie = movies.slice(0, 5);

  return (
    <section className="hero-section">
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
        {top5Movie.map((movie) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <div className="relative w-full h-[900px] overflow-hidden">
                <img
                  src={OriginalURL + movie.backdrop_path}
                  alt={movie.title}
                  className={`hero-bg w-full h-full object-cover ${
                    isActive ? "hero-bg-active" : ""
                  }`}
                />

                <div className="absolute z-10 inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute z-10 inset-0 bg-gradient-to-b from-black via-black/20 to-transparent" />

                <div className="absolute z-20 top-[400px] left-[150px]">
                  <h2 className="mb-1.5 text-5xl font-bold">{movie.title}</h2>

                  <p className="text-white/60">{movie.original_title}</p>

                  <div className="mt-6 flex items-center gap-5">
                    <p>
                      {movie.genre_ids
                        ?.map((id) => GENRES[id])
                        .filter(Boolean)
                        .join(" · ")}
                    </p>

                    <div className="w-[1.5px] h-[20px] bg-white/50" />

                    <p>{movie.release_date?.slice(0, 4)}</p>
                  </div>

                  <Link to={`/movie/${movie.id}`}>
                    <button className="mt-8 border px-8 py-2.5 rounded-xl hover:text-red-500 transition cursor-pointer">
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
