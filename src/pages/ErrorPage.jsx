import { Home, SearchAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageTitle from "../components/PageTitle";

export default function ErrorPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PageTitle title={"ERROR"} />

      <div className="flex min-h-screen items-center justify-center px-5 text-white">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 sm:mb-6 sm:h-16 sm:w-16">
            <SearchAlert className="h-7 w-7 text-red-500 sm:h-8 sm:w-8" />
          </div>

          <p className="mb-2 text-xs font-bold tracking-[4px] text-red-500 sm:text-sm sm:tracking-[6px]">
            PAGE NOT FOUND
          </p>

          <p className="text-[100px] font-black leading-none text-white sm:text-[140px] md:text-[180px]">
            404
          </p>

          <p className="mt-3 text-xl font-bold sm:text-2xl md:text-3xl">
            페이지를 찾을 수 없습니다
          </p>

          <p className="mt-4 text-sm leading-6 text-gray-400 sm:16px">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br className="hidden sm:block" />
            주소를 다시 확인하거나 홈으로 이동해 주세요.
          </p>

          <Link
            to="/"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-red-800 sm:mt-8 sm:w-auto sm:px-10 sm:py-4 sm:16px"
          >
            <Home className="h-5 w-5" />
            홈으로 돌아가기
          </Link>

          <p className="mt-8 text-[11px] text-gray-600 sm:mt-10 sm:text-xs">
            ERROR CODE · 404
          </p>
        </div>
      </div>
    </>
  );
}
