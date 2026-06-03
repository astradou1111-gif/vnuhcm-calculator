import { Link } from 'react-router-dom';

export const Navbar = () => {
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.svg`;

  const scrollHomeToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Dieu huong chinh"
      className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl"
    >
      <div className="app-container">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-4">
          <div className="flex min-w-0">
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="group flex min-w-0 items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-sm shadow-blue-900/20">
                <img src={faviconUrl} alt="Web Tính Điểm ĐHQG-HCM" className="h-6 w-6 rounded-md" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  VNUHCM
                </div>
                <div className="truncate text-base font-black text-slate-950 sm:text-lg">
                  Web Tính Điểm 2026
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
