export default function Footer() {
  return (
    <footer
      className="
        mt-[80px] w-full
        border-t border-white/10
        px-[20px] py-[35px]
        text-[11px] text-white/50
        md:mt-[100px] md:px-[25px] md:py-[40px] md:text-xs
        lg:px-[80px]
        xl:mt-[150px] xl:px-[150px]
      "
    >
      <div
        className="
          flex flex-col gap-5
          md:flex-row md:items-end md:justify-between
        "
      >
        <div>
          <p className="text-lg font-black text-red-500">
            BOM-MOVIE
          </p>
        </div>

        <div className="leading-5 md:text-right">
          <p>
            Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 transition hover:text-red-500"
            >
              TMDB
            </a>
          </p>

          <p>© 2026 BOM-MOVIE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}