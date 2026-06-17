import { Link } from 'react-router-dom';

export const Navbar = () => {
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.svg`;

  const scrollHomeToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Dieu huong chinh"
      className="sticky top-0 z-50 border-b border-[#0d3b66]/10 bg-[#0d3b66]/95 text-white backdrop-blur-xl"
    >
      <div className="app-container">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-4">
          <div className="flex min-w-0">
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="group flex min-w-0 items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7b500] to-[#ffd666] shadow-sm shadow-slate-950/20">
                <img src={faviconUrl} alt="Web Tính Điểm ĐHQG-HCM" className="h-6 w-6 rounded-md" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">
                  HCMUT Style
                </div>
                <div className="truncate text-base font-black text-white sm:text-lg">
                  Web Tính Điểm ĐHQG-HCM
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 sm:block">
              Giao diện HCMUT
            </div>
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="rounded-full border border-amber-300/70 bg-amber-300 px-4 py-2 text-sm font-semibold text-[#0d3b66] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
