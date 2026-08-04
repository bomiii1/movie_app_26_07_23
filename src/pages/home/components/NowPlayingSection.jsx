import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Img500URL } from "../../../constants/imgBaseUrl";

import "swiper/css";

export default function NowPlayingSection({ movies }) {
  return (
    <section
      className="
        px-[20px] pt-[60px]
        md:px-[25px] md:pt-[70px]
        lg:px-[80px] lg:pt-[80px]
        xl:px-[150px] xl:pt-[100px]
      "
    >
      <h2 className="mb-[30px] text-2xl font-bold md:mb-[50px] md:text-3xl">
        현재 상영중
      </h2>

      <Swiper
  slidesPerView={2.2}
  spaceBetween={12}
  breakpoints={{
    640: {
      slidesPerView: 3.2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 4.2,
      spaceBetween: 18,
    },
    1024: {
      slidesPerView: 4.7,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 5.7,
      spaceBetween: 20,
    },
  }}
>
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div>
                <div className="w-full overflow-hidden">
                  <img
                    src={Img500URL + movie.poster_path}
                    alt={movie.title}
                    className="w-full object-cover"
                  />
                </div>

                <p className="mt-[10px] text-[14px] md:text-[18px]">
                  {movie.title}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}