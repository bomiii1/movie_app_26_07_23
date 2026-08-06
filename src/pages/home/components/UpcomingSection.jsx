import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Img500URL } from "../../../constants/imgBaseUrl";

import "swiper/css";

export default function UpcomingSection({ movies }) {
  return (
    <section
      className="
        mt-[50px] mb-[50px] px-[20px]
        md:mt-[70px] md:mb-[70px] md:px-[25px]
        lg:mt-[100px] lg:mb-[100px] lg:px-[80px]
        xl:px-[150px]
      "
    >
      <h2 className="mb-[30px] text-2xl font-bold md:mb-[50px] md:text-3xl">
        개봉 예정작
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
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={Img500URL + movie.poster_path}
                    alt={movie.title}
                    className="w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <p className="mt-[10px] text-[15px] md:text-[18px]">
                  {movie.title}
                </p>

                <p className="mt-1 text-[13px] text-gray-500 md:text-[14px]">
                  {movie.release_date}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}