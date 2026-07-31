import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const onSubmit = () => {};
  console.log(keyword);
  return (
    <div className="mt-[180px] px-[150px]">
      <div>
        <form className="w-[22%] h-auto flex  items-center justify-between py-4 px-4 border-b-1 border-white/30">
          <input
            type="text"
            placeholder="영화를 검색해보세요."
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none placeholder:text-white/80"
          ></input>
          <SearchIcon />
        </form>
      </div>
    </div>
  );
}
