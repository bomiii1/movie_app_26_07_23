import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Movie from "./pages/movie/Movie";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";
import ErrorPage from "./pages/ErrorPage";

export default function Router() {
  return (
    <HashRouter>
      <Header />ㅞ
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<Movie />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}
