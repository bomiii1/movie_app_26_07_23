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
        const [nowPlaying, popular, upcoming] = await Promise.all([
          getNowPlaying(),
          getPopular(),
          getUpcoming(),
        ]);

        setMovieData({
          nowPlaying,
          popular,
          upcoming,
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
    <div>
      <HeroSection movies={movieData?.popular?.results} />
      <NowPlayingSection movies={movieData?.nowPlaying?.results} />
      <Top10Section movies={movieData?.popular?.results} />
      <UpcomingSection movies={movieData?.popular?.results} />
    </div>
  );
}
