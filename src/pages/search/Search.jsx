import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getSearch } from "../../api/MovieApi";
import { Img500URL } from "../../constants/imgBaseUrl";
import PageTitle from "../../components/PageTitle";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    const searchData = await getSearch(keyword);
    setData(searchData.results);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageTitle title={"검색"} />
      <div
        className="
        min-h-screen px-[20px] pb-[50px] pt-[100px]
        md:px-[30px] md:pt-[120px]
        lg:px-[80px]
        xl:px-[150px]
      "
      >
        <h1 className="text-2xl font-bold md:text-3xl">영화 검색</h1>

        <form onSubmit={onSubmit} className="relative mt-5 flex w-full">
          <input
            type="text"
            placeholder="영화를 검색해보세요."
            onChange={(e) => setKeyword(e.target.value)}
            className="
            w-full rounded-lg bg-white/10
            px-5 py-3 pr-[50px]
            outline-none transition
            focus:border focus:border-red-500
          "
          />

          <button
            type="submit"
            className="
            absolute right-[10px] top-[10px]
            cursor-pointer text-white/50
            hover:text-white/100
          "
          >
            <SearchIcon />
          </button>
        </form>

        {data.length > 0 ? (
          <div
            className="
            mt-[50px] grid grid-cols-2 gap-4
            sm:grid-cols-3 sm:gap-5
            lg:grid-cols-4
            xl:grid-cols-5 xl:gap-6
          "
          >
            {data.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                {movie.poster_path ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={Img500URL + movie.poster_path}
                      alt={movie.title}
                      className="aspect-[2/3] w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-white/10 text-sm text-white/50">
                    이미지 없음
                  </div>
                )}

                <h3 className="mt-2 truncate text-sm font-semibold md:16px">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center text-sm text-white/50 md:16px">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
