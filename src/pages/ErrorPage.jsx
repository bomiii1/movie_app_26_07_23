import { Home, SearchAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="mt-[80px]">
      <div className="w-full h-[800px] flex flex-col justify-center items-center pb-15">
        <p className=" text-red-500 text-[20px] font-black">ERROR</p>
        <p className="mt-[-50px] font-black text-[150px] text-red-500">404</p>
        <p className="text-red-500 text-[30px] mt-[-30px] mb-[10px] font-bold flex items-center gap-[5px]">
          <SearchAlert />
          페이지를 찾을수 없습니다
        </p>
        <p className="text-gray-500 text-[14px]">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link to={"/"}>
          <button className="text-gray-500 cursor-pointer mt-[80px] border-1 py-3 px-8 flex justify-between gap-5 rounded-xl hover:text-white hover:bg-red-500/50">
            <Home />
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}
