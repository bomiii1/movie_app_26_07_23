import { Swiper, SwiperSlide } from "swiper/react";
import { Img500URL } from "../../../constants/imgBaseUrl";
import { Link } from "react-router-dom";

import "swiper/swiper.css";

export default function NowPlayingSection({ movies }) {
  console.log(movies[0]);
  return (
    <div
      className="xl:px-[150px] xl:mt-[100px]
    lg:px-[80px]
    lg:mt-[60px]
    md:px-[25px]
    md:mt-[30px]"
    >
      <h2 className="text-3xl font-bold mb-[50px]">현재 상영중</h2>
      <Swiper slidesPerView={4.7} spaceBetween={20}>
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className="">
                <div className="w-full object-cover object-cneter overflow-hidden">
                  <img
                    src={Img500URL + movie.poster_path}
                    alt={movie.title}
                    className="w-full object-cover"
                  />
                </div>

                <p className="text-[18px] mt-[10px]">{movie.title}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
