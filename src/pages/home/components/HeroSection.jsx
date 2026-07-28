import { Link } from "react-router-dom";
import { OriginalURL } from "../../../constants/imgBaseUrl";
import { GENRES } from "../../../constants/genres";

export default function HeroSection({ movies }) {
  console.log(movies);

  const movie = movies[15];
  return (
    <section>
      <div className="relative w-full h-[600px] overflow-hidden">
        <img src={OriginalURL + movie.backdrop_path} alt="bg" />
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-t from-black to-transparent"></div>

        <div className="absolute top-[310px] left-[150px]">
          <h2 className="mb-1.5 text-5xl font-bold">{movie.title}</h2>
          <p className="text-white/60">{movie.original_title}</p>
          <div className="mt-6 flex items-center gap-5">
            <p> {movie.genre_ids.map((id) => GENRES[id]).join(" · ")}</p>
            <div className="w-[1.5px] h-[20px] bg-white/50"></div>
            <p>{movie.release_date.slice(0, 4)}</p>
          </div>
          <Link to={"/movie/:id"}>
            <button className="mt-8 border-1 px-8 py-2.5 rounded-xl hover:bg-red-500/50 transition cursor-pointer">
              상세정보
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
