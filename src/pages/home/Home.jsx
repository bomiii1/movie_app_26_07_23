import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import HeroSection from "./components/HeroSection";
import NowPlayingSection from "./components/NowPlayingSection";
import Top10Section from "./components/Top10Section";
import UpcomingSection from "./components/UpcomingSection";
import { getNowPlaying, getPopular, getUpcoming } from "../../api/MovieApi";

export default function Home() {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const [nowPlaying, popular, upcoming, genres] = await Promise.all([
          getNowPlaying(),
          getPopular(),
          getUpcoming(),
          getGenres(),
        ]);

        setMovieData({
          nowPlaying,
          popular,
          upcoming,
          genres,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-[80px]">
      <HeroSection movies={movieData?.popular?.results} />
      <NowPlayingSection />
      <Top10Section />
      <UpcomingSection />
    </div>
  );
}
