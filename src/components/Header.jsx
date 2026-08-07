import { Dices, House, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="
        fixed left-0 top-0 z-[100]
        flex h-[64px] w-full items-center justify-between
        border-b border-white/10 bg-black/60 px-[15px]
        backdrop-blur-md
        md:h-[72px] md:px-[30px]
        lg:h-[80px] lg:px-[80px]
        xl:px-[150px]
      "
    >
      <Link
        to="/"
        className="
          text-lg font-black text-red-500
          md:text-xl
          lg:text-2xl
        "
      >
        BOM-MOVIE
      </Link>

      <nav className="flex items-center gap-0 text-white md:gap-2 lg:gap-3">
        <Link
          to="/"
          className="
            group relative flex h-[38px] w-[42px]
            items-center justify-center rounded-lg
            transition hover:bg-white/10 hover:text-red-500
            md:h-[42px] md:w-[55px]
            lg:w-[65px]
          "
        >
          <House className="h-5 w-5 transition group-hover:scale-0 md:h-6 md:w-6" />

          <span className="absolute scale-0 text-xs font-bold transition group-hover:scale-100 md:text-sm">
            홈
          </span>
        </Link>

        <Link
          to="/recommend"
          className="
            group relative flex h-[38px] w-[42px]
            items-center justify-center rounded-lg
            transition hover:bg-white/10 hover:text-red-500
            md:h-[42px] md:w-[55px]
            lg:w-[65px]
          "
        >
          <Dices className="h-5 w-5 transition group-hover:scale-0 md:h-6 md:w-6" />

          <span className="absolute scale-0 text-xs font-bold transition group-hover:scale-100 md:text-sm">
            랜덤
          </span>
        </Link>

        <Link
          to="/search"
          className="
            group relative flex h-[38px] w-[42px]
            items-center justify-center rounded-lg
            transition hover:bg-white/10 hover:text-red-500
            md:h-[42px] md:w-[55px]
            lg:w-[65px]
          "
        >
          <Search className="h-5 w-5 transition group-hover:scale-0 md:h-6 md:w-6" />

          <span className="absolute scale-0 text-xs font-bold transition group-hover:scale-100 md:text-sm">
            검색
          </span>
        </Link>
      </nav>
    </header>
  );
}
