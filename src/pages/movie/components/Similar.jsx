import { Img500URL } from "../../../constants/imgBaseUrl";
import { Link } from "react-router-dom";

export default function Similar({ movies }) {
  return (
    <section
      className="
        px-[25px] pt-[70px] pb-[70px]
        lg:px-[80px]
        xl:px-[150px] xl:pt-[100px] xl:pb-[100px]
      "
    >
      <h2 className="mb-[30px] text-xl font-bold xl:mb-[50px] xl:text-3xl">
        비슷한 영화 추천
      </h2>

      <div className="grid grid-cols-2 gap-[28px] md:grid-cols-4">
        {movies?.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div>
              <div className="w-full overflow-hidden rounded-[5px] bg-white/10">
                <img
                  src={Img500URL + movie.poster_path}
                  alt={movie.title}
                  className="aspect-[2/3] w-full rounded-lg object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <p className="mt-[12px] text-[12px] font-semibold xl:text-[18px]">
                {movie.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
