import { OriginalURL } from "../../../constants/imgBaseUrl";

export default function HeroSection({ movies }) {
  console.log(movies);

  return (
    <section>
      <div className="relative">
        <img src={OriginalURL + movies[0].backdrop_path} alt="" />
        <div className="absolute top-[400px] left-[150px]">
          <h2 className=" text-5xl font-bold">{movies[0].title}</h2>

          <p>{movies[0].jenre}</p>
        </div>
      </div>
    </section>
  );
}
