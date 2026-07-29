import { Dices, House, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="z-100 flex py-2 h-[80px] justify-between items-center px-[150px] fixed top-0 left-0 w-full">
      <div className="text-red-500 font-black text-2xl">
        <Link to={"/"}>BOM-MOVIE</Link>
      </div>

      <nav className="flex gap-10 text-[18px]">
        <h4 className="hover:text-red-500 cursor-pointer">
          <Link to={"/"}>
            <House />
          </Link>
        </h4>
        <h4 className="hover:text-red-500 cursor-pointer">
          <Link to={"/recommend"}>
            <Dices />
          </Link>
        </h4>
        <h4 className="hover:text-red-500 cursor-pointer">
          <Link to={"/search"}>
            <Search />
          </Link>
        </h4>
      </nav>
    </header>
  );
}
