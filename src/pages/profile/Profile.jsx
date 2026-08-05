import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, MapPin, UserRound } from "lucide-react";

import { getProfile, getProfileMovies } from "../../api/MovieApi";

import { Img500URL } from "../../constants/imgBaseUrl";
import Loading from "../../components/Loading";

export default function Profile() {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getProfileData = async () => {
      try {
        setLoading(true);

        const [profileData, movieData] = await Promise.all([
          getProfile(id),
          getProfileMovies(id),
        ]);

        setProfile(profileData);

        const profileMovies =
          profileData.known_for_department === "Acting"
            ? movieData.cast
            : movieData.crew;

        const filteredMovies = profileMovies
          .filter((movie) => movie.poster_path)
          .slice(0, 12);

        setMovies(filteredMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        인물 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const department =
    profile.known_for_department === "Acting"
      ? "배우"
      : profile.known_for_department === "Directing"
        ? "감독"
        : profile.known_for_department || "정보 없음";

  return (
    <main
      className="
        min-h-screen px-[20px] pb-[60px] pt-[100px]
        md:px-[25px] md:pt-[120px]
        lg:px-[80px]
        xl:px-[150px]
      "
    >
      <section
        className="
          mx-auto max-w-[900px]
          rounded-2xl border border-white/10
          bg-white/5 p-5
          md:p-7
          lg:p-8
        "
      >
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:gap-10">
          <div className="mx-auto w-[65%] max-w-[210px] shrink-0 md:mx-0 md:w-[30%]">
            {profile.profile_path ? (
              <img
                src={Img500URL + profile.profile_path}
                alt={profile.name}
                className="aspect-[2/3] w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-white/10 text-sm text-white/50">
                이미지 없음
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 text-center md:text-left">
            <span className="inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500 md:text-sm">
              {department}
            </span>

            <h1 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
              {profile.name}
            </h1>

            {profile.also_known_as?.length > 0 && (
              <p className="mt-2 text-xs text-white/50 md:text-sm">
                {profile.also_known_as[0]}
              </p>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-black/20 p-3 text-left">
                <CalendarDays className="h-5 w-5 shrink-0 text-white/50" />

                <div>
                  <p className="text-[10px] text-white/40">생년월일</p>

                  <p className="mt-1 text-xs md:text-sm">
                    {profile.birthday || "정보 없음"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-black/20 p-3 text-left">
                <UserRound className="h-5 w-5 shrink-0 text-white/50" />

                <div>
                  <p className="text-[10px] text-white/40">주요 활동</p>

                  <p className="mt-1 text-xs md:text-sm">{department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-black/20 p-3 text-left sm:col-span-2">
                <MapPin className="h-5 w-5 shrink-0 text-white/50" />

                <div className="min-w-0">
                  <p className="text-[10px] text-white/40">출생지</p>

                  <p className="mt-1 text-xs md:text-sm">
                    {profile.place_of_birth || "정보 없음"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[70px] lg:mt-[100px]">
        <h2 className="mb-[30px] text-2xl font-bold md:mb-[50px] md:text-3xl">
          참여 영화
        </h2>

        {movies.length > 0 ? (
          <div
            className="
              grid grid-cols-2 gap-4
              sm:grid-cols-3 sm:gap-5
              lg:grid-cols-4
              xl:grid-cols-5 xl:gap-6
            "
          >
            {movies.map((movie) => (
              <Link
                key={`${movie.id}-${movie.credit_id}`}
                to={`/movie/${movie.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={Img500URL + movie.poster_path}
                    alt={movie.title}
                    className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <p className="mt-2 truncate text-sm font-bold transition group-hover:text-red-500 md:16px">
                  {movie.title}
                </p>

                <p className="mt-1 text-xs text-white/50 md:text-sm">
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "개봉일 정보 없음"}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-[250px] items-center justify-center text-sm text-white/50">
            참여 영화 정보가 없습니다.
          </div>
        )}
      </section>
    </main>
  );
}
