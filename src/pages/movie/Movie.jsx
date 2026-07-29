import { useEffect, useState } from "react";
import { getDetail } from "../../api/MovieApi";
import { useParams } from "react-router-dom";
import { OriginalURL } from "../../constants/imgBaseUrl";
import Loading from "../../components/Loading";

export default function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  if (!movie) {
    return <Loading />;
  }

  useEffect(() => {
    const getMovie = async () => {
      const data = await getDetail(id);
      setMovie(data);
    };

    getMovie();
  }, [id]);

  console.log(movie);

  return (
    <div>
      <div
        className="  mt-[80px] h-[100vh] px-[150px] flex gap-5 justify-between items-center"
        style={{
          backgroundImage: `url(${OriginalURL + movie?.backdrop_path})`,
        }}
      >
        <div className="bg-gray-500 w-full h-[70%]">
          {/* <img src={OriginalURL + {movie.poster_path}} alt="" /> */}
          {movie.overview}
        </div>
        <div className="bg-gray-500 w-full h-[70%]"></div>
      </div>
    </div>
  );
}
