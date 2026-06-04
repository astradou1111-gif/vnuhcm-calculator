import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { RouteErrorBoundary } from '../common/ErrorBoundary';

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell font-sans">
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Bỏ qua đến nội dung chính
      </a>
      <Navbar />
      <main
        id="main-content"
        className="app-container flex w-full flex-1 py-6 sm:py-8"
      >
        <RouteErrorBoundary>
          <Outlet />
        </RouteErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
