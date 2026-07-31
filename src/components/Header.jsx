import { Dices, House, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="z-100 flex py-2 h-[80px] justify-between items-center fixed top-0 left-0 w-full
    
      xl:px-[150px]
          lg:px-[80px]
          md:px-[20px] px-[20px]"
    >
      <div className="text-red-500 font-black text-2xl">
        <Link to={"/"}>BOM-MOVIE</Link>
      </div>

      <nav
        className="flex
      xl:gap-10 gap-5"
      >
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
