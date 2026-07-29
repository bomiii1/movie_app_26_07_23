import { Swiper, SwiperSlide } from "swiper/react";
import { Img500URL } from "../../../constants/imgBaseUrl";
import { Link } from "react-router-dom";
import { Scrollbar } from "swiper/modules";

import "swiper/swiper.css";

export default function NowPlayingSection({ movies }) {
  console.log(movies[0]);
  return (
    <div className="px-[150px] mt-[100px]">
      <h2 className="text-3xl font-bold mb-[50px]">현재 상영중</h2>
      <Swiper slidesPerView={4.7} spaceBetween={20}>
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div>
                <div className="w-full h-[430px] object-cover object-cneter overflow-hidden">
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

      {/* <div>
        poster_img_wrap
        <div className="w-[300px] ">
          <img src={Img500URL + movies[0].poster_path} alt={movies[0].title} />
        </div>
        description
        <div>
          <div className="text-[18px] mt-[5px]">{movies[0].title}</div>
        </div>
      </div> */}
    </div>
  );
}
