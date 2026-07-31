import { Img500URL } from "../../../constants/imgBaseUrl";
import { Link } from "react-router-dom";

import "swiper/css";

export default function Similar({ movies, genreName }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section
      className="
        px-[25px] py-[70px]
        lg:px-[80px]
        xl:px-[150px] xl:py-[100px]
      "
    >
      <h2 className="xl:mb-[50px] mb-[30px] xl:text-3xl text-xl font-bold">
        비슷한 영화 추천
      </h2>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-[28px]">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="group">
              <div className="aspect-[2/3] w-full overflow-hidden rounded-[5px] bg-white/10">
                <img
                  src={Img500URL + movie.poster_path}
                  alt={movie.title}
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                />
              </div>

              <p className="mt-[12px] xl:text-[18px] text-[12px] font-semibold">
                {movie.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
