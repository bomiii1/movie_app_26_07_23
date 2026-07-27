import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex py-2 h-[80px] justify-between items-center px-[150px] bg-gray-800 fixed top-0 left-0 w-full">
      <div className="text-red-500 font-black text-2xl">
        <Link to={"/"}>BOM-MOVIE</Link>
      </div>

      <nav className="flex gap-10 text-[18px]">
        <h4 className="hover:text-red-500 cursor-pointer">영화</h4>
        <h4 className="hover:text-red-500 cursor-pointer">추천</h4>
        <h4 className="hover:text-red-500 cursor-pointer">검색</h4>
      </nav>
    </header>
  );
}
