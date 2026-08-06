import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Img500URL } from "../../../constants/imgBaseUrl";

import "swiper/css";

export default function Top10Section({ movies }) {
  const top10Movies = movies?.slice(0, 10);

  return (
    <section
      className="
        mt-[50px] px-[20px]
        md:mt-[70px] md:px-[25px]
        lg:mt-[100px] lg:px-[80px]
        xl:px-[150px]
      "
    >
      <div className="mb-[30px] md:mb-[50px]">
        <h2 className="text-2xl font-bold md:text-3xl">
          오늘의 TOP 10
        </h2>
      </div>

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
        {top10Movies?.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={Img500URL + movie.poster_path}
                    alt={movie.title}
                    className="w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute left-0 bottom-0 w-full h-[45%] bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <p className="absolute bottom-1 left-3 text-[55px] font-black leading-none text-white transition duration-300 group-hover:text-red-600 md:text-[70px]">
                    {index + 1}
                  </p>
                </div>

                <p className="mt-[10px] text-[15px] md:text-[18px]">
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